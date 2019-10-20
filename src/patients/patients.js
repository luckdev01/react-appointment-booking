import React, { useState, useEffect } from "react";
import axios from "../app/axios";
import { Link } from "react-router-dom";

export default function FindPatients() {
    const [userList, setUserList] = useState([]);
    const [searchQuery, setSearchQuery] = useState();

    useEffect(() => {
        let ignore = false;
        (async () => {
            const { data } = await axios.get(`/api/patients/` + searchQuery);
            if (!ignore) {
                setUserList(data.data);
            }
        })();
        return () => {
            ignore = true;
        };
    }, [searchQuery]);

    if (!userList) {
        return <p>Page loading...</p>;
    }

    return (
        <div>
            <h1>Patient finder</h1>
            <p>
                It's important to be able to find your patients on the platform.
                On their profile it's possible to see the medical information
                they provided. You can also add their medical history and your
                medical recommendations.
            </p>
            <h2>Find a patient:</h2>

            <input
                name="userInput"
                onChange={event => setSearchQuery(event.target.value)}
                defaultValue={searchQuery}
            />
            {!searchQuery && userList && (
                <div>
                    <h2>Take a look at the 9 latests patients:</h2>
                    <div className="patients-all-container">
                        {userList.map(user => (
                            <div
                                key={user.id}
                                className="patients-one-container"
                            >
                                <Link to={`/patients/${user.id}`}>
                                    <img
                                        src={user.image || "/patient-icon.jpg"}
                                        className="profile-image"
                                        onError={e => {
                                            e.target.onerror = null;
                                            e.target.src = "/patient-icon.jpg";
                                        }}
                                    />
                                    <p className="patients-copy">
                                        {user.forename} {user.surname}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {searchQuery && userList && userList.length > 0 && (
                <div>
                    <h2>
                        Take a look at patients that are found based on the
                        search query:
                    </h2>
                    <div className="patients-all-container">
                        {userList.map(user => (
                            <div
                                key={user.id}
                                className="patients-one-container"
                            >
                                <Link to={`/patients/${user.id}`}>
                                    <img
                                        src={user.image || "/patient-icon.jpg"}
                                        className="profile-image"
                                        onError={e => {
                                            e.target.onerror = null;
                                            e.target.src = "/patient-icon.jpg";
                                        }}
                                    />
                                    <p className="patients-copy">
                                        {user.forename} {user.surname}
                                    </p>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            )}
            {(!userList || userList.length == 0) && (
                <div>
                    <h2>
                        There are no patients found based on the search query.
                        Please try again.
                    </h2>
                </div>
            )}
        </div>
    );
}
