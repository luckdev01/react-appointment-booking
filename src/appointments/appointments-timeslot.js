import React from "react";
import { useDispatch } from "react-redux";
import { bookAppointment } from "./appointments-actions";

export default function AppointmentsTimeslot({ timeslots, userId }) {
    const dispatch = useDispatch();
    let timeNotation = `${timeslots.appointment_start}:00 - ${timeslots.appointment_end}:00`;
    return (
        <div>
            <button
                className="appointment-button"
                onClick={e => dispatch(bookAppointment(timeslots.id, userId))}
            >
                {timeNotation}
            </button>
            <div></div>
        </div>
    );
}
