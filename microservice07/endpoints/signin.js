const express = require("express");
const router = express.Router();
const redis = require("redis");

// const corsOptions = {
//     origin: process.env.UI,
//     optionSuccessStatus: 200
// }

function signin(req, res, next) {

    res.type("application/json");
    
    const client = redis.createClient({
        host : process.env.REDIS_HOST,
        port : process.env.REDIS_PORT
    });

    client.connect()
    .then(() => {
        client.set(req.body.email,"true", {EX: 1200})
        .then(() => {
            res.status(200).json(
                {
                    "client" : req.body.email,
                    "status" : "active"
                }
            );
            client.disconnect();
        })
        .catch ((error) => {
            console.error(`[+] Error when setting value ${req.body.email}`);
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