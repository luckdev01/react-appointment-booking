import React from "react";
import { useDispatch } from "react-redux";
import { cancelPatientAppointment } from "./schedule-actions";
import { Link } from "react-router-dom";

export default function ScheduleTimeslot({ timeslots }) {
    const dispatch = useDispatch();
    return (
        <div>
            <div key={timeslots.id} className="schedule-container">
                <Link to={`/patients/${timeslots.patient_id}`}>
                    <img
                        src={timeslots.image || "/patient-icon.jpg"}
                        className="schedule-image"
                        onError={e => {
                            e.target.onerror = null;
                            e.target.src = "/patient-icon.jpg";
                        }}
                    />
                </Link>
                <div className="schedule-name">
                    {`${timeslots.forename} ${timeslots.surname}`}
                </div>
            </div>
            <p className="schedule-timeslot">{`${timeslots.appointment_start}:00 - ${timeslots.appointment_end}:00`}</p>
            <p className="schedule-timeslot">
                {timeslots.appointment_type || "regular"} visit
            </p>
            <button
                onClick={e => dispatch(cancelPatientAppointment(timeslots.id))}
            >
                Cancel
            </button>
            <div></div>
        </div>
    );
}
