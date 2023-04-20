# MICROSERVICE


![ChartsLogo](ChartLogo.png)

## Charts Server
---

- About Chart Server
- Installation
- User's Guide


***

## About Charts Server

Charts Server creates and stores a chart based on the csv file with the supplied data and a json file containing all charts attributes. Charts Server uses python matplotlib library to create three types of charts:

- Simple plot
- Scatter plot with legend
- Bar label plot

Sample files of csv and json formats can be found on [csv_prototypes](./csv_prototypes/) directory and [sample_json](./sample_json/) directory.

***

## Installation

You can install Charts Server either locally with [install.sh](./install.sh) 

- cd microservice01
- python3 -m venv venv (create a virtual environment to install dependencies)
- . venv/bin/activate
- chmod +x install.sh
- ./install.sh
- flask --app app run
- deactivate (to deactivate virtual environment)

or by creating a docker container with the [Dockerfile](./Dockerfile) provided above

- docker build -t chartserver .
- docker container run -d -p 8080:5000 chartserver  

---

## User's Guide

Chart Server has the following endpoints to interact with the user:

- /setchart , creates and stores chart to the server

    **required query parameters**:
    - userid
    - chart_type
    - extension

    **required body parameters**
    - file_data (contains csv data)
    - properties (contains json data)

- /getchart , responds back with requested chart

    **required query parameters**
    - chart_id

 

