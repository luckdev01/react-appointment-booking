import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPatientAppointments } from "./schedule-actions";
import ScheduleTimeslot from "./schedule-timeslot";

export default function Schedule({ id: userId }) {
    const dispatch = useDispatch();

    const appointments = useSelector(
        state =>
            state.patientAppointments &&
            state.patientAppointments
                .filter(appointment => appointment.patient_id !== null)
                .sort((a, b) => a.id - b.id)
    );

    useEffect(() => {
        dispatch(getPatientAppointments());
    }, []);

    if (!appointments) {
        return <p>Page loading...</p>;
    }

    const monthNames = {
        1: "January",
        2: "February",
        3: "March",
        4: "April",
        5: "May",
        6: "June",
        7: "July",
        8: "August",
        9: "September",
        10: "October",
        11: "November",
        12: "December"
    };

    let appointmentsPerDay = {};
    if (appointments) {
        for (const item of appointments) {
            const dayTitle = `${item.day} ${monthNames[item.month]} ${
                item.year
            }, ${item.weekday}:`;
            if (!appointmentsPerDay[dayTitle]) {
                appointmentsPerDay[dayTitle] = [];
            }
            appointmentsPerDay[dayTitle].push(item);
        }
    }

    return (
        <div>
            <h1>Schedule</h1>
            <div>
                {appointmentsPerDay &&
                    Object.keys(appointmentsPerDay).map(appointment => {
                        const day = appointmentsPerDay[appointment];
                        return (
                            <div key={appointment}>
                                <h3>{appointment}</h3>
                                <div className="timeslot-container">
                                    {day.map(timeslots => (
                                        <ScheduleTimeslot
                                            key={timeslots.id}
                                            userId={userId}
                                            timeslots={timeslots}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}
