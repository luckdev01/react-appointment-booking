CREATE TABLE appointments(
    id SERIAL PRIMARY KEY,
    weekday VARCHAR(255),
    day INT,
    month INT,
    year INT,
    appointment_start INT,
    appointment_end INT,
    appointment_type VARCHAR(255),
    patient_id INT REFERENCES users(id),
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
