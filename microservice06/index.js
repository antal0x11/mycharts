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

const initialize = require("./endpoints/session-m07/initialize.js");
const status = require("./endpoints/session-m07/status.js");
const end = require("./endpoints/session-m07/end.js");

const client_info = require("./endpoints/client_information-m03/getclientinfo.js");
const buy = require("./endpoints/client_information-m03/buy.js");

const charts_history = require("./endpoints/charts_bucket/bucket.js");
const chart_data_file = require("./endpoints/charts_bucket/getchart.js");

app.use("/", audit);
app.use("/", initialize);
app.use("/", status);
app.use("/", end);
app.use("/",client_info);
app.use("/", buy);
app.use("/", charts_history);
app.use("/", chart_data_file);

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
