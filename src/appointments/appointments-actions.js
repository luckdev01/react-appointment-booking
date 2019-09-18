import axios from "../app/axios";

export async function getAppointments() {
    const { data } = await axios.get("/api/appointments");
    return {
        type: "GET_APPOINTMENTS",
        appointments: data.appointments
    };
}

export async function bookAppointment(appointmentId, userId) {
    await axios.post(`/api/appointments/book/${appointmentId}`);
    return {
        type: "BOOK_APPOINTMENT",
        appointmentId,
        userId
    };
}

export async function cancelAppointment(appointmentId) {
    await axios.post(`/api/appointments/cancel/${appointmentId}`);
    return {
        type: "CANCEL_APPOINTMENT",
        appointmentId
    };
}
