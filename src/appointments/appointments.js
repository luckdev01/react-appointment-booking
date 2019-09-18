import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments, cancelAppointment } from "./appointments-actions";
import AppointmentsTimeslot from "./appointments-timeslot";
import { Link } from "react-router-dom";

export default function Appointments({ id: userId }) {
    const dispatch = useDispatch();
    const [startTime, setStartTime] = useState(0);
    const [endTime, setEndTime] = useState(24);
    const [weekday, setWeekDay] = useState("day");
    const [appointmentType, setAppointmentType] = useState();

    const appointments = useSelector(
        state =>
            state.appointments &&
            state.appointments
                .filter(appointment => appointment.patient_id === null)
                .filter(appointment => appointment.weekday.includes(weekday))
                .filter(
                    appointment => appointment.appointment_start >= startTime
                )
                .filter(appointment => appointment.appointment_end <= endTime)
                .sort((a, b) => a.id - b.id)
    );
    const userAppointment = useSelector(
        state =>
            state.appointments &&
            state.appointments
                .filter(appointment => appointment.patient_id === userId)
                .shift()
    );

    useEffect(() => {
        dispatch(getAppointments());
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

    let showAppointment;
    if (userAppointment) {
        showAppointment = `${userAppointment.day} ${
            monthNames[userAppointment.month]
        }
    ${userAppointment.year}, ${userAppointment.weekday} from
    ${userAppointment.appointment_start}:00
    until ${userAppointment.appointment_end}:00. Please add it to your calendar.
    `;
    }

    return (
        <div>
            <h1>Available appointments</h1>
            <p>
                Thank you for using our medical platform to book appointments.
                Start booking with us today to save time on scheduling your
                appointments.
            </p>
            <div>
                <h3>Your appointment:</h3>
                <p>
                    {showAppointment ||
                        "You currently have no appointment. Please click on a timeslot below to book your appointment:"}
                </p>
                {showAppointment && (
                    <button
                        onClick={e =>
                            dispatch(cancelAppointment(userAppointment.id))
                        }
                    >
                        Cancel appointment
                    </button>
                )}

                {showAppointment && appointmentType == "firstAppointment" && (
                    <p>
                        Thank you for booking your first appointment. We would
                        like to provide the best care possible, so please tell
                        us a bit more about yourself on your{" "}
                        <Link to="/patient-profile">user profile</Link>.
                    </p>
                )}
            </div>
            <div className="appointment-options-container">
                <div>
                    <h2>Weekday:</h2>
                    <select
                        name="preferredDay"
                        onChange={event => setWeekDay(event.target.value)}
                    >
                        <option value="day">All</option>
                        <option value="Monday">Monday</option>
                        <option value="Tuesday">Tuesday</option>
                        <option value="Wednesday">Wednesday</option>
                        <option value="Thursday">Thursday</option>
                        <option value="Friday">Friday</option>
                    </select>
                </div>
                <div>
                    <h2>At the earliest:</h2>
                    <select
                        name="preferredBeginTime"
                        onChange={event => setStartTime(event.target.value)}
                    >
                        <option value="0">Any time</option>
                        <option value="10">10:00</option>
                        <option value="11">11:00</option>
                        <option value="13">13:00</option>
                        <option value="14">14:00</option>
                    </select>
                </div>
                <div>
                    <h2>Until:</h2>
                    <select
                        name="preferredEndTime"
                        onChange={event => setEndTime(event.target.value)}
                    >
                        <option value="24">Any time</option>
                        <option value="11">11:00</option>
                        <option value="12">12:00</option>
                        <option value="14">14:00</option>
                        <option value="15">15:00</option>
                    </select>
                </div>
                <div>
                    <h2>Type:</h2>
                    <select
                        name="preferredTime"
                        onChange={event =>
                            setAppointmentType(event.target.value)
                        }
                    >
                        <option value="regularAppointment">Regular</option>
                        <option value="firstAppointment">First Time</option>
                        <option value="emergencyAppointment">Emergency</option>
                    </select>
                </div>
            </div>
            <div>
                {appointmentType == "emergencyAppointment" && (
                    <p className="warning-message">
                        You have chosen an emergency appointment. Are you or
                        someone else in immediate danger? Please call{" "}
                        <a href="callto:112">112</a>. Otherwise please call our
                        number:{" "}
                        <a href="callto:0301575000000">030 1575 000 000</a>.
                    </p>
                )}
            </div>
            <div>
                {appointmentType != "emergencyAppointment" &&
                    appointmentsPerDay &&
                    Object.keys(appointmentsPerDay).map(appointment => {
                        const day = appointmentsPerDay[appointment];
                        return (
                            <div key={appointment}>
                                <h3>{appointment}</h3>
                                <div className="timeslot-container">
                                    {day.map(timeslots => (
                                        <AppointmentsTimeslot
                                            key={timeslots.id}
                                            userId={userId}
                                            timeslots={timeslots}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                {!appointmentsPerDay && (
                    <div>
                        There are no appointments available. Please try other
                        options.
                    </div>
                )}
            </div>
        </div>
    );
}
