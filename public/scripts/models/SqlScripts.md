# The 415 Facewall

**Author**: Craig Barkley, Nathan Cashman, Marc Hauschildt, Dylan Schroeder
**Version**: 1.1.0

## Overview These are the scripts to set up the database and the tables and inserts.

## Getting Started - Create Database
  CREATE DATABASE facewall;

## Getting Started - Create Tables.

# Employee Table.

CREATE TABLE IF NOT EXISTS
employee (
  employee_id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  city VARCHAR(255),
  img_url VARCHAR(255),
  email VARCHAR(255),
  github_profile VARCHAR(255),
  spotify_profile VARCHAR(255),
  will_carpool BOOLEAN NOT NULL,
  address VARCHAR(255)
);


# Company Table.

CREATE TABLE IF NOT EXISTS
company(
  company_id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(2000),
  website VARCHAR(255),
  date_founded VARCHAR(255)
);

# Employee Role Table.

CREATE TABLE IF NOT EXISTS 
employee_role(        
              employee_id INTEGER REFERENCES employee(employee_id),
              company_id INTEGER REFERENCES company(company_id),
              date_started VARCHAR(255),
              date_ended VARCHAR(255),
              job_title VARCHAR(255) NOT NULL
      );

## Create INSERTS

INSERT INTO employee(first_name, last_name, city, img_url, email, github_profile, spotify_profile, will_carpool, address)
 VALUES('Craig', 'Barkley', 'Cedar Rapids', 'image.jpg', 'info@tektechnologies.com', 'tektechnologies', '', TRUE, '415 12th St. SE');

INSERT INTO company(name, description, website, date_founded)
VALUES('Tektechnologies', 'Internet Products company specializing in IoT and Web Applications', 'www.tektechnologies.com', '2012');

INSERT INTO employee_role(employee_id, company_id, date_started, date_ended, job_title)
VALUES(1, 1, '01-01-2012', null, 'CIO');



## Update Table 

UPDATE users
SET
  first_name="Craig",
  last_name="Barkley",
  city =  "Iowa City,
  img_url = 'image.jpg',
  email = 'info@tektechnologies.com',
  github_profile = null,
  spotify_profile = null,
  will_carpool = TRUE, 
  address = '415 12th St. SE'
WHERE id=1;


## Select statement for 3 table ref.

SELECT e.first_name, e.last_name, e.city, e.img_url, e.email, e.github_profile, e.spotify_profile, c.name, r.job_title, r.date_started, r.date_ended
FROM employee_role r
INNER JOIN employee e ON e.employee_id = r.employee_id
INNER JOIN company c ON c.company_id = r.company_id;