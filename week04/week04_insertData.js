const dotenv = require('dotenv')
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

var rawData = fs.readFileSync('/home/ec2-user/environment/week03/address08Final.json');
var Location08 = JSON.parse(rawData);

async.eachSeries(Location08, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO address VALUES (E'" + value.address + "', " + value.latLong.lat + ", " + value.latLong.lng + ");";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
}); 