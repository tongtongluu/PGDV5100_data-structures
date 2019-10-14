const dotenv = require('dotenv');
dotenv.config()
const { Client } = require('pg');
const async = require('async');
const fs = require('fs');

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

// Sample SQL statement to query the entire contents of a table: 
//var thisQuery = "SELECT * FROM aameeting;";
var thisQuery = "SELECT meetingname AS MEETINGNAME, meetingday, meetingstart, meetingend, typedetails FROM aameeting WHERE meetingdaynum > 1 and meetingstarthour <= 12;";

client.query(thisQuery, (err, res) => {
    console.log(err,res.rows);
    client.end();
});