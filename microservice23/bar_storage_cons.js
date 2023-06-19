require("dotenv").config();
const amqp = require('amqplib/callback_api');
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const Chart = require("./models/chart");

function receive_message() {
    
    const queue = "store_bar_plot_q";
    const exchange = "bar_plot_store";

    amqp.connect(`amqp://${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`, function (error_connection, connection) {
        if (error_connection) {
            throw error_connection;
        }

        connection.createChannel(function (error_channel, channel) {
            
            if (error_channel) {
                throw (error_channel);
            }
            
            channel.assertExchange(exchange, "fanout", {
                durable : false
            });

            channel.assertQueue(queue, {
                exclusive: false
            }, function (error_queue) {
                if (error_queue) {
                    throw error_queue;
                }

                console.log(" [+] Waiting for messages...");

                channel.bindQueue(queue, exchange, "");

                channel.consume(queue, async function (message) {
                    
                    console.log(" [+] Message Received Initializing Procedures.")
                    const info_store = await create_record(message.properties.headers.properties);
                    store_chart(message.content, info_store);
                    console.log(" [+] Chart Store Completed");

                }, {
                    noAck: true
                });
            });

        });

    });
}

async function create_record(client_info) {
    /*
        Creates a record in the database for the message that
        has been received. The record is a type of chart record.
    */

    try {
        
        const data = await JSON.parse(client_info);

        const store_info = await create_folders(data.user_id, data.extension);

        await Chart.create(
            {
                title: data.title,
                users_id: data.user_id,
                chart_id: store_info.chart_id,
                chart_extension: data.extension,
                chart_type: data.chart_type,
                path_chart : store_info.storage_path
            }
        );

        return {

            "storage_path" : store_info.storage_path,
            "extension" : data.extension
        }

    } catch (error_chart) {
        throw error_chart;
    }
}

async function create_folders(client_id, chart_extension) {

    /*
        Creates the folders if they do not exist to store the charts
        and the chart id. Returns a JSON object with these values. 
    */
    
    const ch_id = await create_random_chart_id();

    
    fs.mkdir(path.join(__dirname,"storage",client_id), function (error_user_directory) {
        if (error_user_directory) {
            if (error_user_directory.code !== "EEXIST") {
                throw error_user_directory
            }
        }

        fs.mkdir(path.join(__dirname,"storage",client_id,chart_extension), function (error_extension_directory) {
            if (error_extension_directory) {
                if (error_extension_directory.code !== "EEXIST") {
                    throw error_extension_directory;
                }
            }
        });
    });

    storage_path =  path.join(__dirname,"storage",client_id,chart_extension,ch_id + "." + chart_extension);
    
    return {
        "storage_path" : storage_path,
        "chart_id" : ch_id
    };
}

async function create_random_chart_id() { 

    /*
        Creates a random chart id. It checks if the 
        chart id that was created is available to use, 
        if not it creates a new one until one is availble.

        Chart id format is XXXXXX-YYYYYY, where 
        X : A-Z, Y: 0-9
    */

    const alphabet = "ABCDEFGHIJKLMKOPQRSTUVWXYZ";
    const numbers = "0123456789";
    let chart_id = "";
    
    const results = await Chart.findAll(
        {
            attributes: {
                exclude : ["id", "title" , "users_id", "chart_extension", "chart_type", "path_chart", "created"]
            }
        }
    );

    for (let i=0; i<6; i++) {
        chart_id += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    chart_id += "-"

    for (let i=0; i<6; i++) {
        chart_id += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }

    while (results.includes(chart_id)) {
        chart_id = "";

        for (let i=0; i<6; i++) {
            chart_id += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        }
    
        chart_id += "-";
    
        for (let i=0; i<6; i++) {
            chart_id += numbers.charAt(Math.floor(Math.random() * numbers.length));
        }
        console.log(chart_id);
    }

    return chart_id;
}

function store_chart(chart_bytes, info) {

    /*
        Every chart is stored under /storage folder.
        For every user there is a folder with its 
        user id and inside of this folder there are
        subfolders for each extension, png, html, pdf
        and svg where the charts are stored based on their
        extension type. 
    */
    
    switch(info.extension) {
        case "png":
            sharp(chart_bytes).toFile(info.storage_path, (error_sharp, info_sharp) => {
                if (error_sharp) {
                    throw error_sharp;
                }
            });
        break;

        case "pdf":
            const bufferPDF = Buffer.from(chart_bytes, "base64");
            fs.writeFile(info.storage_path, bufferPDF, (error) => {
                if (error) {
                    console.error(" [+] Failed to store pdf file for user: " + info.user_id);
                }
            });
        break;

        case "svg":
            const bufferSVG = Buffer.from(chart_bytes, "base64");
            fs.writeFile(info.storage_path, bufferSVG, (error) => {
                if (error) {
                    console.error(" [+] Failed to store svg file for user: " + info.user_id);
                }
            });
        break;

        case "html":
            //TODO add support for html
        break;


        default:
            throw "Invalid Extension";
        break;
    }
}


try {
    receive_message();
}catch (error) {
    console.error(error);
}
