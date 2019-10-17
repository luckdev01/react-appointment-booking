const spicedPg = require("spiced-pg");

let database;
if (process.env.DATABASE_URL) {
    database = spicedPg(process.env.DATABASE_URL);
} else {
    database = spicedPg("postgres:postgres:postgres@localhost:5432/network");
}

exports.addUser = (forename, surname, email, password) => {
    return database
        .query(
            `
            INSERT INTO users (forename, surname, email, password)
            VALUES ($1, $2, $3, $4)
            RETURNING id, forename, surname
            ;`,
            [forename, surname, email, password]
        )
        .then(({ rows }) => rows[0]);
};

exports.getHashedPassword = email => {
    return database
        .query(
            `
            SELECT *
            FROM users
            WHERE email IN ($1)
            ;`,
            [email]
        )
        .then(({ rows }) => rows[0]);
};

exports.getUserData = id => {
    return database
        .query(
            `
            SELECT id, forename, surname, image, krankenkasse_name, krankenkasse_coverage, surgery, hospital, medication, diseases, recommendations, important, history
            FROM users
            WHERE id IN ($1)
            ;`,
            [id]
        )
        .then(({ rows }) => rows[0]);
};

exports.getAppointments = () => {
    return database
        .query(
            `
            SELECT id, weekday, day, month, year, appointment_start, appointment_end, appointment_type, patient_id
            FROM appointments
            ;`
        )
        .then(({ rows }) => rows);
};

exports.bookAppointment = (userId, appointmentId) => {
    return database
        .query(
            `
            UPDATE appointments
            SET patient_id = $1
            WHERE id = $2;
            ;`,
            [userId, appointmentId]
        )
        .then(({ rows }) => rows);
};

exports.cancelAppointment = appointmentId => {
    return database
        .query(
            `
            UPDATE appointments
            SET patient_id = null
            WHERE id = $1;
            ;`,
            [appointmentId]
        )
        .then(({ rows }) => rows);
};

exports.addUserImage = (id, image) => {
    return database
        .query(
            `
            UPDATE users
            SET image = ($2)
            WHERE id IN ($1)
            returning image
            ;`,
            [id, image]
        )
        .then(({ rows }) => rows[0]);
};

exports.addUserInformation = (
    userId,
    krankenkasseName,
    krankenkasseType,
    patientSurgery,
    patientHospital,
    patientMedication,
    patientDisease,
    patientImportant
) => {
    return database
        .query(
            `
            UPDATE users
            SET krankenkasse_name = ($2),
            krankenkasse_coverage = ($3),
            surgery = ($4),
            hospital = ($5),
            medication = ($6),
            diseases = ($7),
            important = ($8)
            WHERE id IN ($1)
            returning id
            ;`,
            [
                userId,
                krankenkasseName,
                krankenkasseType,
                patientSurgery,
                patientHospital,
                patientMedication,
                patientDisease,
                patientImportant
            ]
        )
        .then(({ rows }) => rows[0]);
};

exports.getNewestUsers = () => {
    return database
        .query(
            `
            SELECT id, forename, surname, image
            FROM users
            ORDER BY id DESC
            LIMIT 9
            ;`
        )
        .then(({ rows }) => rows);
};

exports.getSearchedUsers = searchQuery => {
    return database
        .query(
            `
            SELECT id, forename, surname, image
            FROM users
            WHERE forename ILIKE $1
            ;`,
            [searchQuery + "%"]
        )
        .then(({ rows }) => rows);
};

exports.getPatientAppointments = () => {
    return database
        .query(
            `
            SELECT appointments.id, appointments.weekday, appointments.day, appointments.month, appointments.year, appointments.appointment_start, appointments.appointment_end, appointments.appointment_type, appointments.patient_id, users.forename, users.surname, users.image
            FROM users
            JOIN appointments
            ON users.id = appointments.patient_id
            ;`
        )
        .then(({ rows }) => rows);
};

exports.addInformationAsDoctor = (
    userId,
    patientHistory,
    patientRecommendations
) => {
    return database
        .query(
            `
            UPDATE users
            SET history = ($2),
            recommendations = ($3)
            WHERE id IN ($1)
            returning id, forename, surname, image, krankenkasse_name, krankenkasse_coverage, surgery, hospital, medication, diseases, recommendations, important, history
            ;`,
            [userId, patientHistory, patientRecommendations]
        )
        .then(({ rows }) => rows[0]);
};
