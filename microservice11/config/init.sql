DROP DATABASE IF EXISTS SCATTER_PLOT_CHARTS;

CREATE DATABASE SCATTER_PLOT_CHARTS;

USE SCATTER_PLOT_CHARTS;

CREATE TABLE charts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title varchar(255),
    users_id varchar(100),
    chart_id varchar(20) UNIQUE,
    chart_extension varchar(10),
    chart_type varchar(20),
    path_chart varchar(250) UNIQUE,
    created TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX users_id_idx ON charts (users_id);