CREATE DATABASE gobird;
use gobird;

CREATE TABLE customer (
  cust_username varchar(50) NOT NULL,
  cust_password varchar(50) NOT NULL,
  cust_plate varchar(50) NOT NULL,
  PRIMARY KEY (cust_username)
);

CREATE TABLE parking (
  park_username varchar(50) NOT NULL,
  park_spot_number varchar(50) NOT NULL,
  park_time_in varchar(50) NOT NULL,
  park_time_out int,
  PRIMARY KEY (park_username)
);

CREATE TABLE spots (
  spots_number int NOT NULL,
  spots_street varchar(50) NOT NULL,
  spots_status varchar(50) NOT NULL,
  PRIMARY KEY (spots_number)
);

INSERT INTO customer(cust_username, cust_password, cust_plate)
VALUES("user1", "pass1", "LYD876"), ("user2", "pass2", "YDK3842");

INSERT INTO spots(spots_number, spots_street, spots_status)
VALUES("1", "S Church", "open"), ("2", "S Church", "open");
