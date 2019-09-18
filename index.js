const express = require("express");
const app = express();
const compression = require("compression");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const s3 = require("./utilities/s3");
const config = require("./utilities/config");
const bcrypt = require("./utilities/bcrypt");
const database = require("./sql/database");

app.use(compression());

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (request, response) =>
        response.sendFile(`${__dirname}/bundle.js`)
    );
}

const diskStorage = multer.diskStorage({
    destination: function(request, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(request, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});

app.use(require("body-parser").json());

app.use(
    cookieSession({
        secret: `DA9#j@`,
        maxAge: 1000 * 60 * 60 * 24 * 30
    })
);

app.use(express.static("./public"));

app.use(csurf());

app.use((request, response, next) => {
    response.cookie("mytoken", request.csrfToken());
    next();
});

app.get("/welcome", function(request, response) {
    if (request.session.userId) {
        response.redirect("/");
    } else {
        response.sendFile(__dirname + "/index.html");
    }
});

app.post("/api/registration", async (request, response) => {
    try {
        const { forename, surname, email, password } = request.body;
        const hashedPassword = await bcrypt.hashPassword(password);
        const userData = await database.addUser(
            forename,
            surname,
            email,
            hashedPassword
        );
        const userId = userData.id;
        request.session.userId = userId;
        request.session.userForename = forename;
        request.session.userSurname = surname;
        response.json({
            registrationValid: true
        });
    } catch (error) {
        console.log("error inside post /api/registration: ", error);
        response.json({
            registrationValid: false
        });
    }
});

app.post("/api/login", async (request, response) => {
    const { email, password } = request.body;
    try {
        const userData = await database.getHashedPassword(email);
        const hashedPassword = userData.password;
        const passwordValid = await bcrypt.checkPassword(
            password,
            hashedPassword
        );
        if (passwordValid) {
            request.session.userId = userData.id;
            request.session.userForename = userData.forename;
            request.session.userSurname = userData.surname;
        }
        response.json({
            passwordValid: passwordValid
        });
    } catch (error) {
        console.log("error inside post /api/login: ", error);
        response.json({
            passwordValid: false
        });
    }
});

app.get("/api/app", async (request, response) => {
    const { userId } = request.session;
    try {
        const userData = await database.getUserData(userId);
        response.json({ userData });
    } catch (error) {
        console.log("error inside get /api/app: ", error);
    }
});

app.get("/api/appointments", async (request, response) => {
    try {
        const appointments = await database.getAppointments();
        response.json({ appointments });
    } catch (error) {
        console.log("error inside get /api/appointments: ", error);
    }
});

app.post("/api/appointments/book/:appointmentId", async (request, response) => {
    const { userId } = request.session;
    const { appointmentId } = request.params;
    try {
        const data = await database.bookAppointment(userId, appointmentId);
        response.json({ data });
    } catch (error) {
        console.log(
            "error inside post /api/appointments/book/:appointmentId: ",
            error
        );
    }
});

app.post(
    "/api/appointments/cancel/:appointmentId",
    async (request, response) => {
        const { appointmentId } = request.params;
        try {
            const data = await database.cancelAppointment(appointmentId);
            response.json({ data });
        } catch (error) {
            console.log(
                "error inside post /api/appointments/cancel/:appointmentId: ",
                error
            );
        }
    }
);

app.post("/api/user-profile-edit", async (request, response) => {
    const { userId } = request.session;
    const {
        krankenkasseName,
        krankenkasseType,
        patientSurgery,
        patientHospital,
        patientMedication,
        patientDisease,
        patientImportant
    } = request.body;
    try {
        const results = await database.addUserInformation(
            userId,
            krankenkasseName,
            krankenkasseType,
            patientSurgery,
            patientHospital,
            patientMedication,
            patientDisease,
            patientImportant
        );
        response.json({ results });
    } catch (error) {
        console.log("error inside post /api/user-profile-edit: ", error);
    }
});

app.post(
    "/api/upload-image",
    uploader.single("file"),
    s3.upload,
    async (request, response) => {
        const { userId } = request.session;
        const imageUrl = config.s3Url + request.file.filename;
        try {
            const userImage = await database.addUserImage(userId, imageUrl);
            response.json({
                image: userImage.image
            });
        } catch (error) {
            console.log("error inside post /api/upload-image: ", error);
        }
    }
);

app.get("/api/patients/:searchQuery", async (request, response) => {
    try {
        let data;
        if (request.params.searchQuery == "undefined") {
            data = await database.getNewestUsers();
        } else {
            const { searchQuery } = request.params;
            data = await database.getSearchedUsers(searchQuery);
        }
        response.json({ data });
    } catch (error) {
        console.log("error inside get /api/patients/:searchQuery: ", error);
    }
});

app.get("/api/patients-profile/:id", async (request, response) => {
    try {
        const { id } = request.params;
        const patientData = await database.getUserData(id);
        response.json({ patientData });
    } catch (error) {
        console.log("error inside get /api/patients-profile/:id: ", error);
    }
});

app.post("/api/patients-profile/edit/:patientId", async (request, response) => {
    const { patientId } = request.params;
    const { history, recommendations } = request.body;
    try {
        const otherData = await database.addInformationAsDoctor(
            patientId,
            history,
            recommendations
        );
        response.json({ otherData });
    } catch (error) {
        console.log(
            "error inside post /api/patients-profile/edit/:patientId: ",
            error
        );
    }
});

app.get("/api/schedule", async (request, response) => {
    try {
        const patientAppointments = await database.getPatientAppointments();
        response.json({ patientAppointments });
    } catch (error) {
        console.log("error inside get /api/schedule: ", error);
    }
});

app.get("*", (request, response) => {
    if (!request.session.userId) {
        response.redirect("/welcome");
    } else {
        response.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("App is listening.");
});
