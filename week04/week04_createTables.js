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

// Sample SQL statement to create three tables, but this time only has the data of the address table: 每张表一定要有pk，这个sql确保了character文字形式也能作为primary key，否则的话要用数字
var thisQuery = "CREATE TABLE address (address varchar(100), Lat_ double precision, Long_ double precision);";
// Sample SQL statement to delete a table: 
// var thisQuery = "DROP TABLE address;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});