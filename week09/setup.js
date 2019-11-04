const { Client } = require('pg');
const dotenv = require('dotenv').config();
const async = require('async');



// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'LuellaLu';
db_credentials.host = process.env.AWSRDS_EP;
db_credentials.database = 'aa';
db_credentials.password = process.env.AWSRDS_PW;

db_credentials.port = 5432;

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();

// Sample SQL statement to create three tables, but this time only has the data of the address table: 每张表一定要有pk，这个sql确保了character文字形式也能作为primary key，否则的话要用数字
var thisQuery = "CREATE TABLE sensorData ( sensorValue real, sensorTime timestamp DEFAULT current_timestamp );";
// Sample SQL statement to delete a table: 
//var thisQuery = "DROP TABLE sensorData;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});