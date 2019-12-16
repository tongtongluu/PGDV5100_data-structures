// npm install aws-sdk
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "LearningBlogs",
    KeyConditionExpression: "#dt = :minDate and #cat = :category" ,
    ExpressionAttributeNames: { 
        "#dt" : "dateTimeDetail",
        "#cat" : "category"
    },
    ExpressionAttributeValues: { // the query values
        ":minDate": {S: new Date("30 August 2019 14:48 UTC").toISOString()},
        ":category": {S: "datastructure"}
    }
};

dynamodb.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log("***** ***** ***** ***** ***** \n", item);
        });
    }
});