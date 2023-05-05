/*
*   Auth server that allows myCharts clients
*   to naviagate authorized through pages.
*   
*   It uses redis and it simply stores their email
*   address and their status {true -> active, false 
*    -> not active}
*
*/


const express = require("express");
const figlet = require("figlet");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const status = require("./endpoints/status.js");
const signin = require("./endpoints/signin.js");
const signout = require("./endpoints/signout.js");

app.use("/", status);
app.use("/", signin);
app.use("/", signout);

app.listen(process.env.PORT, () => {
    figlet("myChartsAuth", (error,data) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(data);
        console.log("[+] Authorization Server Status : UP");
    });
});