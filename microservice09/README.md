# MICROSERVICE09

![ChartsLogo](ChartLogo.png)

## MyCharts Simple Plot Microservice Creator

MyCharts Simple Plot Microservice Creator is listening for messages that have specific structure, creates a simple plot chart and delivers it to a queue so it can be stored.

Messages have the following structure:

| Attributes | Type | Required |
| :---: | :---: | :---: |
| title | string | Yes 
| xAxis | string | Yes
| yAxis | string | Yes
| user_id | string | Yes
| extension | string | Yes
| time | string | Yes

The body of the message contains the bytes of the csv data file. CSV file will not be evaluated here. The evaluation process has been successfully completed in previus step.


