DROP DATABASE IF EXISTS taketwo_db;

-- Create the database day_planner_db and specified it for use.
CREATE DATABASE taketwo_db;

USE taketwo_db;

-- Create the table plans.
CREATE TABLE movies (
  id int NOT NULL AUTO_INCREMENT,
  title varchar(255) NOT NULL,
  role1 varchar(255) NOT NULL,
  role2 varchar(255) NOT NULL,
  role3 varchar(255) NOT NULL,
  role4 varchar(255) NOT NULL,
  actor1 varchar(255) NOT NULL,
  actor2 varchar(255) NOT NULL,
  actor3 varchar(255) NOT NULL,
  actor4 varchar(255) NOT NULL,
  PRIMARY KEY (id)
);

-- Insert a set of records.
INSERT INTO movies (title, role1, role2, role3, role4, actor1, actor2, actor3, actor4) VALUES ("Batman Begins", "Bruce Wayne/Batman", "Aflred Pennyworth","Ra's al Ghul","Rachel Dawes","Christian Bale","Michael Caine","Liam Neeson", "Katie Holmes");
