import React from "react";
import axios from "../app/axios";
import { Link } from "react-router-dom";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.userInput = this.userInput.bind(this);
        this.userLogin = this.userLogin.bind(this);
    }

    userInput(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    userLogin(event) {
        event.preventDefault();
        axios
            .post("/api/login", {
                email: this.state.email,
                password: this.state.password
            })
            .then(({ data }) => {
                if (data.passwordValid) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.error && (
                        <div className="error">
                            Something went wrong. Please try again.
                        </div>
                    )}
                </div>
                <p className="welcome-copy">
                    Welcome to our Medical Appointment Platform. Please log in
                    to the medical appointment platform to start booking an
                    appointment:
                </p>
                <label className="welcome-label">
                    Email:
                    <div>
                        <input
                            name="email"
                            onChange={this.userInput}
                            className="welcome-input"
                        />
                    </div>
                </label>
                <label className="welcome-label">
                    Password:
                    <div>
                        <input
                            name="password"
                            type="password"
                            onChange={this.userInput}
                            className="welcome-input"
                        />
                    </div>
                </label>
                <button onClick={this.userLogin} className="welcome-button">
                    Log in
                </button>
                <p>
                    Not an account yet? Please{" "}
                    <Link to="/" className="welcome-link">
                        register
                    </Link>
                    .
                </p>
            </div>
        );
    }
}
