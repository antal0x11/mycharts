/*
    Microservice06 is an orchestrator for my charts.
 */

const express = require("express");
const figlet = require("figlet");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors()); //TODO make cors more strict

const audit = require("./endpoints/audit-m05/audit.js");

const initialize = require("./endpoints/session-m07/initialize");
const status = require("./endpoints/session-m07/status");
const end = require("./endpoints/session-m07/end");

app.use("/", audit);
app.use("/", initialize);
app.use("/", status);
app.use("/", end);

app.listen(process.env.PORT, () => {
    figlet("myChartsMaestro", (error,data) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(data);
        console.log("[+] Maestro status : UP.")
    });
});
