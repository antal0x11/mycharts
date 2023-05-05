const express = require("express");
const router = express.Router();
const redis = require("redis");

function status(req, res, next) {

    res.type("application/json");
    
    const client = redis.createClient({
        host : process.env.REDIS_HOST,
        port : process.env.REDIS_PORT
    });

    client.connect()
    .then(() => {
        client.get(req.body.email)
        .then((data) => {
            if (data === null) {
                res.status(404).json(
                    {
                        "client" : data 
                    }
                );
            } else {
                res.status(200).json(
                    {
                        "client" : data 
                    }
                );
            }
            client.disconnect();
        });
    })
    .catch((error) => {
        console.error(`[+] Connection Error With Redis`);
        res.status(500).json(
            {
                "info" : "redis down"
            }
        );
        client.disconnect();
    })
}

router.post("/api/auth/status", status);
module.exports = router;