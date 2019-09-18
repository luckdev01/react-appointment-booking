import React from "react";
import axios from "../app/axios";

export default class EditInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editButton: true,
            krankenkasseName: props.krankenkasseName,
            krankenkasseType: props.krankenkasseType,
            patientSurgery: props.patientSurgery,
            patientHospital: props.patientHospital,
            patientMedication: props.patientMedication,
            patientDisease: props.patientDisease,
            patientImportant: props.patientImportant,
            patientHistory: props.patientHistory,
            patientRecommendations: props.patientRecommendations
        };
        this.userInput = this.userInput.bind(this);
        this.saveProfile = this.saveProfile.bind(this);
        this.editProfile = this.editProfile.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    userInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    async saveProfile(event) {
        this.props.updateKrankenkasseName(this.state.krankenkasseName);
        this.props.updateKrankenkasseType(this.state.krankenkasseType);
        this.props.updatePatientSurgery(this.state.patientSurgery);
        this.props.updatePatientHospital(this.state.patientHospital);
        this.props.updatePatientMedication(this.state.patientMedication);
        this.props.updatePatientDisease(this.state.patientDisease);
        this.props.updatePatientImportant(this.state.patientImportant);
        event.preventDefault();
        this.setState({ saveButton: false });
        this.setState({ editButton: true });
        try {
            await axios.post("/api/user-profile-edit", {
                krankenkasseName: this.state.krankenkasseName,
                krankenkasseType: this.state.krankenkasseType,
                patientSurgery: this.state.patientSurgery,
                patientHospital: this.state.patientHospital,
                patientMedication: this.state.patientMedication,
                patientDisease: this.state.patientDisease,
                patientImportant: this.state.patientImportant,
                patientHistory: this.state.patientHistory,
                patientRecommendations: this.state.patientRecommendations
            });
        } catch (error) {
            console.log(
                "error on user-profile-edit inside saveProfile in axios post /api/user-profile-edit: ",
                error
            );
        }
    }
    async editProfile(event) {
        event.preventDefault();
        this.setState({ saveButton: true });
        this.setState({ editButton: false });
    }

    handleChange(e) {
        this.setState({ krankenkasseType: e.target.value });
    }
    render() {
        return (
            <div>
                {this.state.editButton && (
                    <div>
                        <h2>Krankenkasse:</h2>
                        <p>{this.state.krankenkasseName}</p>
                        <h2>Coverage:</h2>
                        <p>{this.state.krankenkasseType}</p>
                        <h2>Did you ever have surgery?</h2>
                        <p>{this.state.patientSurgery}</p>
                        <h2>
                            Have you ever been admitted to a hospital for an
                            extended period of time?
                        </h2>
                        <p>{this.state.patientHospital}</p>
                        <h2>Are you taking any medication?</h2>
                        <p>{this.state.patientMedication}</p>
                        <h2>
                            Are you diabetic or suffering from heart, lung or
                            kidney disease?
                        </h2>
                        <p>{this.state.patientDisease}</p>
                        <h2>
                            Is there anything else that is important for us to
                            know?
                        </h2>
                        <p>{this.state.patientImportant}</p>
                        <button onClick={this.editProfile}>Edit profile</button>
                    </div>
                )}
                {this.state.saveButton && (
                    <div>
                        <h2>Krankenkasse:</h2>
                        <textarea
                            name="krankenkasseName"
                            onChange={this.userInput}
                            value={this.state.krankenkasseName}
                        />
                        <h2>Coverage:</h2>
                        <select
                            name="krankenkasseType"
                            onChange={this.handleChange}
                        >
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </select>
                        <h2>Did you ever have surgery?</h2>
                        <textarea
                            name="patientSurgery"
                            onChange={this.userInput}
                            value={this.state.patientSurgery}
                        />
                        <h2>
                            Have you ever been admitted to a hospital for an
                            extended period of time?
                        </h2>
                        <textarea
                            name="patientHospital"
                            onChange={this.userInput}
                            value={this.state.patientHospital}
                        />
                        <h2>Are you taking any medication?</h2>
                        <textarea
                            name="patientMedication"
                            onChange={this.userInput}
                            value={this.state.patientMedication}
                        />
                        <h2>
                            Are you diabetic or suffering from heart, lung or
                            kidney disease?
                        </h2>
                        <textarea
                            name="patientDisease"
                            onChange={this.userInput}
                            value={this.state.patientDisease}
                        />
                        <h2>
                            Is there anything else that is important for us to
                            know?
                        </h2>
                        <textarea
                            name="patientImportant"
                            onChange={this.userInput}
                            value={this.state.patientImportant}
                        />
                        <button onClick={this.saveProfile}>Save profile</button>
                    </div>
                )}
                <div>
                    {(this.state.patientHistory ||
                        this.state.patientRecommendations) && (
                        <h2>Doctors notes</h2>
                    )}
                    {this.state.patientHistory && (
                        <div>
                            <h2>Medical history:</h2>
                            <p>{this.state.patientHistory}</p>
                        </div>
                    )}
                    {this.state.patientRecommendations && (
                        <div>
                            <h2>Recommendations:</h2>
                            <p>{this.state.patientRecommendations}</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
