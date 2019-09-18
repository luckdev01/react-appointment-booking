import axios from "../app/axios";

export async function getPatientAppointments() {
    const { data } = await axios.get("/api/schedule");
    return {
        type: "GET_SCHEDULE",
        patientAppointments: data.patientAppointments
    };
}

export async function cancelPatientAppointment(appointmentId) {
    await axios.post(`/api/appointments/cancel/${appointmentId}`);
    return {
        type: "CANCEL_PATIENT_APPOINTMENT",
        appointmentId
    };
}
