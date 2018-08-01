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







<!-- INSERT INTO company(name, description, website, date_founded)
VALUES('Tektechnologies', 'Internet Products company specializing in IoT and Web Applications', 'www.tektechnologies.com', '2012'); -->





INSERT INTO company(name, description, website, date_founded)VALUES('NewBoCo', 'The New Bohemian Innovation Collaborative, NewBoCo is built to help grow ideas, from Iowa. You may or may not be from Iowa, but you can get your start here and impact the entire world. Within Iowa, NewBoCo will strengthen the state''s entrepreneurs, creatives, and technologists that are making big ideas happen. While headquartered in Cedar Rapids, our impact will be felt statewide. A win for Iowa City or Des Moines or Sioux City is a win for us too', 'https://newbo.co/', '2008');


      INSERT INTO company(name, description, website, date_founded)VALUES('Geonetric', 'Geonetric helps healthcare brands thrive through effective marketing and distinctive websites. As a marketing agency and software developer with deep technical and creative expertise, Geonetric provides hospitals, health systems, and medical groups with a healthcare-specific content management system, hosting, marketing strategies and creative services optimized for the unique needs of the healthcare industry', 'https://www.geonetric.com', '1999');
      
      
      INSERT INTO company(name, description, website, date_founded)VALUES('McNary Marketing and Design LLC', 'McNary Marketing and Design LLC is a Marketing Technology firm, which helps businesses discover and implement the best marketing and sales technology, so they can sell more while doing less.','https://mcnarymarketing.com/', '2013');
     






      //start   here. tonight
      INSERT INTO company(name, description, website, date_founded)VALUES('Converge', 'Converge is a bold, indispensable partner for colleges and universities. Our thought-provoking digital strategies connect the next generation of learners with right-fit programs', 'https://convergeconsulting.org/', '2016');
      
      INSERT INTO company(name, description, website, date_founded)VALUES('Quick Action Accounting', 'Quick Action Accounting is your local authority for QuickBooks products, small business financial management, and consulting services. Quick Actions certifications, ongoing learning, and great business relationships help them lead the way in the financial services industry throughout the Corridor.', 'https://quick-action.com/', '2012');
      
      INSERT INTO company(name, description, website, date_founded)VALUES('Iowa BIG', 'Iowa BIG is a public school with no admissions requirements. Each partnering district has slots proportional to their financial commitment to the program. We currently serve an accurate cross section of our partner districts'' demographics.', 'http://www.iowabig.org/', 'May 28, 2014');
     
      INSERT INTO company(name, description, website, date_founded)VALUES('50 Pound Boson', '50-Pound Boson is a small marketing and growth hacking team focused on driving business results – not marketing results – by doing the dirty work underneath the surface of the big ecommerce and communications platforms like Amazon, Shopify, and Facebook and more', 'http://50poundboson.com/', '2017');
      
      INSERT INTO company(name, description, website, date_founded)VALUES('512 Creative', 'In 2012, after many years of creating award-winning marketing materials and websites for other firms, graphic designers John Foster and Josh Mateer struck out on their own. Together they started Five Twelve Creative, which is a graphic design firm based in Cedar Rapids, Iowa', 'https://512creative.com/', '2012');
     
      INSERT INTO company(name, description, website, date_founded)VALUES('Fassler Marketing', 'From startup companies to long established businesses and everything in between, Fassler Marketing can create a solution that works for your business. Whether it''s a simple one page website or a complex site that needs to gel with your marketing efforts, we can handle it. Need a design for an app or want to sell your products online? We can do that too!', 'http://fasslermarketing.com/', '2018');






INSERT INTO employee_role(employee_id, company_id, date_started, date_ended, job_title)
VALUES(1, 1, '01-01-2012', null, 'CIO');




