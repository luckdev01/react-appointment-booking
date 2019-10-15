# Appointment Booking Platform

Appointment Booking Platform is great for business owners in the medical field that want to allow their patients to book available appointments in real-time.

The medical appointments platform will save both time and money on scheduling. This is beneficial for both the patients and the staff. Accenture has predicted the following stats for the end of 2019:

-   64% of patients will book appointments digitally
-   Self-scheduled appointments will create 3.2 billion dollar in value in the US
-   Average time for a patient to complete a scheduling call is 8.1 minutes

## Preview

<p align="center">
<img src="/public/appointment-booking-platform-preview.png" alt="Preview of the Appointment Booking Platform”>
</p>

## Features for patients

-   User authentication page: register and login to an account
-   Appointments page: book and cancel appointments, specify the type of appointment and sort appointments by day, earliest and latest timeslot
-   User profile page: upload a profile image, add medical data and read doctors’ recommendations

## Features for staff

-   Others’ profile page: view medical data and add recommendations
-   Friends page: find any patient on the platform
-   Schedule page: view all booked appointments including date, timeslot, patient name, patient image, type of appointment and the option to cancel appointments

## Technology

-   HTML
-   CSS
-   JavaScript
-   React
-   Hooks
-   Redux
-   Node
-   Express
-   AWS S3
-   Postgres

## Code Example

```
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

```

```
export default function AppointmentsTimeslot({ timeslots, userId }) {
    const dispatch = useDispatch();
    let timeNotation = `${timeslots.appointment_start}:00 - ${timeslots.appointment_end}:00`;
    return (
        <div>
            <button
                onClick={e => dispatch(bookAppointment(timeslots.id, userId))}
            >
                {timeNotation}
            </button>
            <div></div>
        </div>
    );
}
```

## Credits

The idea of this project came from a friend who works in the medical field. He told me there is a strong need to upgrade booking systems from traditional to online.

## Contribute

Contribution is much appreciated. Please let me know about any bugs and ideas for improvements.
