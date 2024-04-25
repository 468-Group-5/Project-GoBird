CREATE DATABASE gobird;
use gobird;

CREATE TABLE spots (
  spots_number int NOT NULL,
  spots_street varchar(50) NOT NULL,
  spots_status varchar(50) NOT NULL,
  PRIMARY KEY (spots_number)
);

CREATE TABLE parking (
  park_spot_number int NOT NULL,
  park_time_in varchar(50) NOT NULL,
  park_time_out varchar(50) NOT NULL,
  PRIMARY KEY (park_spot_number),
  FOREIGN KEY (park_spot_number) REFERENCES spots(spots_number)
);

INSERT INTO spots (spots_number, spots_street, spots_status)
VALUES ("1", "S Church", "open"), ("2", "S Church", "taken"),("3", "S Church", "taken"),("4", "S Church", "open");

INSERT INTO spots (spots_number, spots_street, spots_status)
VALUES ("21", "University Ave", "open"), ("22", "University Ave", "taken"),("23", "University Ave", "taken"),("24", "University Ave", "open");



CREATE USER 'root'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON gobird.* TO 'root'@'%';
FLUSH PRIVILEGES;
