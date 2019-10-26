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
//var thisQuery = "DROP TABLE aameetingAll;";
// Sample SQL statement to delete a table: 
var thisQuery = "CREATE TABLE aameetingAll ( buildingName VARCHAR(200), buildingAddress VARCHAR(100),Lat_ double precision, Long_ double precision, zipCode VARCHAR(20), zoneNumber INT,meetingName VARCHAR(150), meetingNote VARCHAR(400), meetingDay VARCHAR(20), meetingDayNum INT, meetingStart VARCHAR(20), meetingStartHour INT, meetingStartMin INT, meetingEnd VARCHAR(20),meetingEndHour INT, meetingEndMin INT, specialInterest VARCHAR(400), meetingType VARCHAR(10), typeDetails VARCHAR(50));";

 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});