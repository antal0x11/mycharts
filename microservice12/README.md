# MICROSERVICE

![ChartsLogo](ChartLogo.png)

## MyCharts Bar Plot Microservice Creator

MyCharts Bar Plot Microservice Creator is listening for messages that have specific structure, creates a bar plot chart and delivers it to a queue so it can be stored.

Messages have the following structure:

| Attributes | Type | Required |
| :---: | :---: | :---: |
| title | string | Yes 
| user_id | string | Yes
| extension | string | Yes
| time | string | Yes

The body of the message contains the bytes of the csv data file. CSV file will not be evaluated here. The evaluation process has been successfully completed in previus step.

