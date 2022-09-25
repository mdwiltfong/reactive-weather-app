\echo 'Delete and recreate weatherapp db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE weatherapp;
CREATE DATABASE weatherapp;
\connect weatherapp

\i weatherapp_schema.sql
\i weatherapp_seed.sql

\echo 'Delete and recreate weatherapp_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE weatherapp_test;
CREATE DATABASE weatherapp_test;
\connect weatherapp_test

\i weatherapp_schema.sql