use MYCHARTS_CLIENTS;
create table clients (
                         email varchar(255) not null,
                         charts integer,
                         credits integer,
                         first_name varchar(255),
                         last_name varchar(255),
                         path varchar(255),
                         userid varchar(255),
                         primary key (email)
);