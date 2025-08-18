const express = require("express");
const path = require("path");
const fs = require("fs");
const archiver = require('archiver');

const uploadFiles = require("./multer/multer.utility");

const server = express();
const cors = require("cors");
const port = 5050;

server.use(cors());

server.get("/", (req, res) => {
    console.log("home route");
    res.send("done");
});

server.post("/api/upload", uploadFiles(), function (req, res, next) {
    res.json({
        id: req.uploadId,
        link: `${req.protocol}://${req.get("host")}/download/${req.uploadId}`,
    });
});

server.get("/download/:id", (req, res) => {
    const folderPath = path.join(__dirname, "uploads", req.params.id);

    if (!fs.existsSync(folderPath)) {
        return res.status(404).send("Not found");
    }
    
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${req.params.id}.zip`
    );
    res.setHeader("Content-Type", "application/zip");

    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.pipe(res);

    archive.directory(folderPath, false);
    archive.finalize();
});

server.listen(port, () => {
    console.log("server is running...");
});
