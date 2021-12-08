--
-- PostgreSQL port of the MySQL "World" database.
--
-- The sample data used in the world database is Copyright Statistics 
-- Finland, http://www.stat.fi/worldinfigures.
--

CREATE USER app_user WITH PASSWORD 'app_user';
CREATE DATABASE kanban;
GRANT ALL PRIVILEGES ON DATABASE kanban TO app_user;
