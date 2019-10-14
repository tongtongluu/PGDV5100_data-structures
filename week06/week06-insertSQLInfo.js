const dotenv = require('dotenv');
dotenv.config();
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

var rawData = fs.readFileSync('/home/ec2-user/environment/week06/infoDetails.json');
var mtData = JSON.parse(rawData);

async.eachSeries(mtData, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO aameeting VALUES (E'" + value.buildingName + "','"
    + value.buildingAddress + "','" 
    + value.geoLocation.lat + "', '" 
    + value.geoLocation.lng + "', '" 
    + value.zipCode + "', '"
    + value.meetingName + "', '"
    + value.meetingNote + "','"
    + value.meetingDay + "',"
    + value.meetingDayNum + ", '"
    + value.meetingStart + "', "
    + value.meetingStartHour + ","
    + value.meetingStartMin + ",'"
    + value.meetingEnd + "', "
    + value.meetingEndHour + ","
    + value.meetingEndMin + ",'"
    + value.specialInterest + "', '"
    + value.meetingType + "', '"
    + value.typeDetails + "');";
    //console.log(thisQuery)
    client.query(thisQuery, (err, res) => {
        //console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
}); 