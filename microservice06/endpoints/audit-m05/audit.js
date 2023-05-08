const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");

const storage = multer.diskStorage({
    destination: function(req,res,cb) {
        cb(null, './uploads');
    },
    filename: function(req,file,cb) {
        //const tmpFileName = Date.now();
        cb(null,file.originalname);
    }
})

const upload = multer({storage : storage});
function audit(req, res, next) {

    const reqFile = fs.createReadStream("./uploads/scatter_plot.csv");

    axios.post("http://localhost/api/data/integrity", {
        title: req.body.title,
        type: req.body.type,
        extension: req.body.extension,
        file: reqFile
    }, {
        headers: {
            "Content-Type" : "multipart/form-data"
        }
    }).then(response => {
        res.status(response.status).json(response.data);
    }).catch(error => {
        res.status(error.response.status).json(error.response.data);
    })
}

router.post("/api/data/audit", upload.single("file"), audit);
module.exports = router;