import React from "react";
import axios from "./axios";
import { Route, BrowserRouter, NavLink } from "react-router-dom";
import Appointments from "../appointments/appointments";
import UserProfile from "../user-profile/user-profile";
import ProfilePicture from "../user-profile/user-profile-display-image";
import UploadImage from "../user-profile/user-profile-upload-image";
import FindPatients from "../patients/patients";
import PatientsProfile from "../patients-profile/patients-profile";
import Schedule from "../schedule/schedule";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false
        };
    }
    async componentDidMount() {
        const { data } = await axios.get("/api/app");
        this.setState(data.userData);
    }
    render() {
        if (!this.state.id) {
            return <div>Page is loading...</div>;
        }
        return (
            <BrowserRouter>
                <div>
                    <header className="header-container">
                        <img src="/doctor-logo.jpg" className="header-logo" />
                        <p className="header-title">
                            Medical appointments platform
                        </p>
                        <nav>
                            <NavLink
                                exact
                                to="/"
                                className="header-link"
                                activeClassName="active"
                            >
                                Appointments
                            </NavLink>
                            <NavLink
                                to="/user-profile"
                                className="header-link"
                                activeClassName="active"
                            >
                                Profile
                            </NavLink>
                            <NavLink
                                to="/patients"
                                className="header-link"
                                activeClassName="active"
                            >
                                Patients
                            </NavLink>
                            <NavLink
                                to="/schedule"
                                className="header-link"
                                activeClassName="active"
                            >
                                Schedule
                            </NavLink>
                        </nav>
                        <ProfilePicture
                            displaySize={"50px"}
                            forename={this.state.forename}
                            surname={this.state.surname}
                            image={this.state.image || "/patient-icon.jpg"}
                            showUploadOption={() =>
                                this.setState({ uploaderVisible: true })
                            }
                        />
                    </header>
                    <section>
                        <Route
                            exact
                            path="/"
                            render={() => <Appointments id={this.state.id} />}
                        />
                        <Route
                            exact
                            path="/user-profile"
                            render={() => (
                                <UserProfile
                                    displaySize={"200px"}
                                    forename={this.state.forename}
                                    surname={this.state.surname}
                                    image={
                                        this.state.image || "/patient-icon.jpg"
                                    }
                                    showUploadOption={() =>
                                        this.setState({ uploaderVisible: true })
                                    }
                                    krankenkasseName={
                                        this.state.krankenkasse_name
                                    }
                                    krankenkasseType={
                                        this.state.krankenkasse_coverage
                                    }
                                    patientHistory={this.state.history}
                                    patientRecommendations={
                                        this.state.recommendations
                                    }
                                    patientSurgery={this.state.surgery}
                                    patientHospital={this.state.hospital}
                                    patientMedication={this.state.medication}
                                    patientDisease={this.state.diseases}
                                    patientImportant={this.state.important}
                                    updateKrankenkasseName={krankenkasseName =>
                                        this.setState({ krankenkasseName })
                                    }
                                    updateKrankenkasseType={krankenkasseType =>
                                        this.setState({ krankenkasseType })
                                    }
                                    updatePatientSurgery={patientSurgery =>
                                        this.setState({ patientSurgery })
                                    }
                                    updatePatientHospital={patientHospital =>
                                        this.setState({ patientHospital })
                                    }
                                    updatePatientMedication={patientMedication =>
                                        this.setState({ patientMedication })
                                    }
                                    updatePatientDisease={patientDisease =>
                                        this.setState({ patientDisease })
                                    }
                                    updatePatientImportant={patientImportant =>
                                        this.setState({ patientImportant })
                                    }
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/patients"
                            component={FindPatients}
                        />
                        <Route
                            path="/patients/:id"
                            render={props => (
                                <PatientsProfile
                                    key={props.match.url}
                                    match={props.match}
                                    historia={props.historia}
                                    recommendations={this.state.recommendations}
                                    history={this.state.history}
                                    updatePatientRecommendations={recommendations =>
                                        this.setState({
                                            recommendations
                                        })
                                    }
                                    updatePatientHistory={history =>
                                        this.setState({ history })
                                    }
                                />
                            )}
                        />

                        <Route
                            exact
                            path="/schedule"
                            render={() => <Schedule id={this.state.id} />}
                        />
                    </section>
                    {this.state.uploaderVisible && (
                        <UploadImage
                            updateImage={image => this.setState({ image })}
                            hideUploadOption={() =>
                                this.setState({ uploaderVisible: false })
                            }
                        />
                    )}
                </div>
            </BrowserRouter>
        );
    }
}
