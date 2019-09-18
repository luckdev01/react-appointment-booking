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
        console.log("Multer failed inside s3.js");
        return response.sendStatus(500);
    }
    const { filename, mimetype, size, path } = request.file;

    const promise = s3
        .putObject({
            Bucket: "spicedling",
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size
        })
        .promise()
        .then(data => {
            console.log("data: ", data);
            next();
        })
        .catch(error => {
            console.log("error: ", error);
        })
        .then(() => {
            fs.unlink(path, callback => callback);
        });
};
