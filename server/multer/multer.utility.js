const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!req.uploadId) {
            req.uploadId = uuidv4();
        }

        const uploadPath = path.join(
            __dirname,
            "..",
            "uploads",
            req.uploadId,
            path.dirname(file.originalname)
        ); 
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, path.basename(file.originalname));
    },
});

const upload = multer({ storage: storage });

const uploadFiles = function () {
    return upload.any();
};

module.exports = uploadFiles;
