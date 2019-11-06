const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env;
} else {
    secrets = require("../secrets");
}

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET
});

exports.upload = (request, response, next) => {
    const { file } = request;
    if (!file) {
        console.log("multer failed inside s3.js");
        return response.sendStatus(500);
    }
    const { filename, mimetype, size, path } = request.file;

    s3.putObject({
        Bucket: "appointment-booking-platform",
        ACL: "public-read",
        Key: filename,
        Body: fs.createReadStream(path),
        ContentType: mimetype,
        ContentLength: size
    })
        .promise()
        .then(data => {
            fs.unlink(path, error => {
                if (error) {
                    return;
                }
            });
            next();
        })
        .catch(error => {
            console.log("error inside s3.putObject: ", error);
            response.sendSatus(500);
        });
};
