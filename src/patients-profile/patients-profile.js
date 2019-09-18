import React from "react";
import axios from "../app/axios";

export default class PatientsProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editButton: true
        };
        this.userInput = this.userInput.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.editProfile = this.editProfile.bind(this);
    }
    userInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    async componentDidMount() {
        const { id } = this.props.match.params;
        try {
            const { data } = await axios.get("/api/patients-profile/" + id);
            this.setState(data.patientData);
        } catch (error) {
            console.log(
                "error on patients-profile inside componentDidMount in axios get /api/patients-profile/id: ",
                error
            );
        }
    }
    async saveProfile(event) {
        const { id } = this.props.match.params;
        event.preventDefault();
        this.props.updatePatientHistory(this.state.history);
        this.props.updatePatientRecommendations(this.state.recommendations);
        this.setState({ saveButton: false });
        this.setState({ editButton: true });
        try {
            const { data } = await axios.post(
                "/api/patients-profile/edit/" + id,
                {
                    history: this.state.history,
                    recommendations: this.state.recommendations
                }
            );
            this.setState(data.otherData);
        } catch (error) {
            console.log(
                "error on patients-profile inside saveProfile in axios get /api/patients-profile/edit/id: ",
                error
            );
        }
    }
    async editProfile(event) {
        event.preventDefault();
        this.setState({ saveButton: true });
        this.setState({ editButton: false });
    }
    render() {
        return (
            <div>
                <div>
                    <h1>
                        Patient profile of {this.state.forename}{" "}
                        {this.state.surname}
                    </h1>
                </div>
                <div>
                    <img
                        className="profile-image"
                        src={this.state.image || "/patient-icon.jpg"}
                    />
                </div>
                <h2>Medical history:</h2>
                {this.state.saveButton && (
                    <textarea
                        name="history"
                        onChange={this.userInput}
                        value={this.state.history}
                    />
                )}
                {this.state.editButton && <p>{this.state.history}</p>}

                <h2>Medical recommendations:</h2>
                {this.state.saveButton && (
                    <textarea
                        name="recommendations"
                        onChange={this.userInput}
                        value={this.state.recommendations}
                    />
                )}
                {this.state.editButton && <p>{this.state.recommendations}</p>}

                {this.state.saveButton && (
                    <button onClick={this.saveProfile}>Save</button>
                )}
                {this.state.editButton && (
                    <button onClick={this.editProfile}>Edit</button>
                )}
                <div>
                    <h2>Krankenkasse:</h2>
                    <p>{this.state.krankenkasse_name}</p>
                </div>
                <div>
                    <h2>Coverage:</h2>
                    <p>{this.state.krankenkasse_coverage}</p>
                </div>
                <div>
                    <h2>Surgery:</h2>
                    <p>{this.state.surgery}</p>
                </div>
                <div>
                    <h2>Hospital:</h2>
                    <p>{this.state.hospital}</p>
                </div>
                <div>
                    <h2>Medication:</h2>
                    <p>{this.state.medication}</p>
                </div>
                <div>
                    <h2>Diseases:</h2>
                    <p>{this.state.diseases}</p>
                </div>
                <div>
                    <h2>Important:</h2>
                    <p>{this.state.important}</p>
                </div>
            </div>
        );
    }
}
