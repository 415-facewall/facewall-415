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
  employee_id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  city VARCHAR(255)  NULL,
  img_url VARCHAR(255)  NULL,
  email VARCHAR(255)  NULL,
  github_profile VARCHAR(255)  NULL,
  spotify_profile VARCHAR(255)  NULL,
  will_carpool VARCHAR(255) NOT NULL,
  address VARCHAR(255)  NULL
);


# Company Table.

CREATE TABLE IF NOT EXISTS
company(
  company_id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(2000) NOT NULL,
  website VARCHAR(255) NULL,
  date_founded VARCHAR(255)  NULL
);

# Employee Role Table.

CREATE TABLE IF NOT EXISTS 
employee_role(        
              employee_id SERIAL NOT NULL,
              company_id SERIAL NOT NULL,
              date_started VARCHAR(255),
              date_ended VARCHAR(255),
              job_title VARCHAR(255)
              PRIMARY KEY(employee_id, company_id)
      );

## Create INSERTS

INSERT INTO employee(first_name, last_name, city, img_url, email, github_profile, spotify_profile, will_carpool, address)
 VALUES('Craig', 'Barkley', 'Cedar Rapids', 'image.jpg', 'info@tektechnologies.com', FALSE, Yes, '415 12th St. SE');

INSERT INTO company(name, description, website, date_founded)
VALUES('Tektechnologies', "Internet Products company specializing in IoT and Web Applications", www.tektechnologies.com', '2012');

INSERT INTO employee_role(employee_id, company_id, date_started, date_ended, job_title)
VALUES(01-01-2012, Present, CIO);



## Update Table 

UPDATE users
SET
  first_name="Craig",
  last_name="Barkley",
  city =  "Iowa City,
  img_url = image.jpg,
  email = "info@tektechnologies.com,
  github_profile = null,
  spotify_profile = null,
  will_carpool = yes, 
  address = null
WHERE id=1;
