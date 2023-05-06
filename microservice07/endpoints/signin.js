const express = require("express");
const router = express.Router();
const redis = require("redis");
const crypto = require("crypto");

// const corsOptions = {
//     origin: process.env.UI,
//     optionSuccessStatus: 200
// }

function signin(req, res, next) {

    res.type("application/json");
    
    const client = redis.createClient({
        socket: {
            host : process.env.REDIS_HOST,
            port : process.env.REDIS_PORT
        }
    });

    const hidden = req.body.email + process.env.SECRET;

    const token = crypto.randomBytes(64).toString('hex');
    const hmac = crypto.createHmac('sha256', process.env.SECRET);
    hmac.update(token);
    const digest= hmac.digest('hex');


    client.connect()
    .then(() => {
        client.set(digest,"true", {EX: 1200})
        .then(() => {

            res.status(200).json(
                {
                    "client" : req.body.email,
                    "status" : "active",
                    "token" : digest
                }
            );
            client.disconnect();
        })
        .catch ((error) => {
            console.error(`[+] Error when setting value ${req.body.token}`);
            res.status(500).json({
                "info" : "error while setting value"
            });
            client.disconnect();
        });
    })
    .catch((error) => {
        console.error(`[+] Connection Error With Redis`);
        res.status(500).json({
            "info" : "Connection Error"
        });
        client.disconnect();
    });
}

router.post("/api/auth/signin",signin);
module.exports = router;