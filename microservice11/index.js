/*
*   Storage Server API. 
*   Responds back with all clients charts information
*   and with a single chart.
*
*/

const express = require("express");
const app = express();
const figlet = require("figlet");
const cors = require("cors");
require("dotenv").config();
const sequelize = require("./config/db");

sequelize
    .authenticate()
    .then(() => {
        console.log(" [+] Database Connection Successful.");
    })
    .catch((error) => {
        console.error(" [+] Database Connection fail.");
        console.error(error);
    });

app.use(express.json());
app.use(cors());

const getscatterplotchart = require("./routes/getscatterplotchart");
const info = require("./routes/info");

app.use("/", getscatterplotchart);
app.use("/", info);

app.listen(process.env.PORT, () => {
    figlet("ScatterPlotStorage", function (error,data) {
        if (error) {
            console.error(" [+] Error with figlet.");
            return;
        }
        console.log(data);
        console.log(` [+] Scatter Plot Storage Server running on port: ${process.env.PORT}.`);
    });
});