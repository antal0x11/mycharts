const express = require("express");
const router = express.Router();
const redis = require("redis");

function signout(req, res, next) {

    res.type("application/json");
    
    const client = redis.createClient({
        host : process.env.REDIS_HOST,
        port : process.env.REDIS_PORT
    });

    client.connect()
    .then(() => {
        client.del(req.body.email)
        .then(() => {
            res.status(200).json(
                {
                    "client" : req.body.email,
                    "status" : "deactivated"
                }
            );
            client.disconnect();
        })
        .catch ((error) => {
            console.error(`[+] Error while deleting value ${req.body.email}`);
            res.status(500).json({
                "info" : "error while deleting value"
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

router.post("/api/auth/signout",signout);
module.exports = router;