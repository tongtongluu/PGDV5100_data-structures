const { Client } = require('pg');
const dotenv = require('dotenv')
const async = require('async');

dotenv.config()

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'LuellaLu';
db_credentials.host = 'database-structures.czb4is7lyw2x.us-east-1.rds.amazonaws.com';
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;

db_credentials.port = 5432;
// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to create three tables
//var thisQuery = "DROP TABLE aameeting;";
// Sample SQL statement to delete a table: 
var thisQuery = "CREATE TABLE aameeting (buildingName VARCHAR(50), buildingAddress VARCHAR(100),Lat_ double precision, Long_ double precision, zipCode VARCHAR(10), meetingName VARCHAR(50), meetingNote VARCHAR(100), meetingDay VARCHAR(20), meetingDayNum INT, meetingStart VARCHAR(20), meetingStartHour INT, meetingStartMin INT, meetingEnd VARCHAR(20),meetingEndHour INT, meetingEndMin INT, specialInterest VARCHAR(100), meetingType VARCHAR(10), typeDetails VARCHAR(20));";

 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});