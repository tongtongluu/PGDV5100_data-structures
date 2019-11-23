//set up route
const express = require('express'), // npm install express
    app = express();
const request = require('request');
const { Client } = require('pg');
const dotenv = require('dotenv'); // npm install dotenv
const result = dotenv.config({ path: '.env' });
const AWS= require('aws-sdk');

// Connect to database AA , which includes aameeting and sensor data
var db_aa = new Object();
db_aa.user = result.parsed.AWS_ID;
db_aa.host = result.parsed.AWSRDS_EP;
db_aa.database = 'aa';
db_aa.password = result.parsed.AWSRDS_PW;
db_aa.port = 5432;
// Connect to the AWS RDS Postgres database
const client_aa = new Client(db_aa);
//const client_tem = new Client(db_aa);



// Connect to dynamo db database, which includes my diary data
AWS.config = new AWS.Config();
AWS.config.accessKeyId = result.parsed.AWS_ID;
AWS.config.secretAccessKey = result.parsed.AWS_KEY;
AWS.config.region = "us-east-1";
const client_dynamodb = new AWS.DynamoDB();

//landing page    
app.get('/', async function(req, res) {
    try{
        res.send(landingPage);
    }
catch(error){
    console.log(error);
}
});

//sensor main page
app.get('/sensor', async function(req, res) {
    try{
        res.send(temperaturePage);
    }
catch(error){
    console.log(error);
}
});

//diary main page
app.get('/diary', async function(req, res) {
    try{
        res.send(diaryPage);
    }
catch(error){
    console.log(error);
}
});

// aa main page
app.get('/aa', async function(req, res) {
    try{
        res.send(aaPage);
    }
catch(error){
    console.log(error);
}
});

// tempturature raw data page
app.get('/temdata', async function(req, res) {
    try{
        await connect();
        const page1 = await allTem();
        res.json(page1);    
    }
    catch(error){
        console.log(error)
    }
    // finally{
    //     await client.end()
    //     console.log("cleaned")
    // }
});
app.get('/diarydata', async function(req, res) {
    try{
        // await connect();
        const page2 = await allDia();
        res.json(page2);    
    }
    catch(error){
        console.log(error)
    }
    // finally{
    //     await client.end()
    //     console.log("cleaned")
    // }
});
app.get('/aadata', async function(req, res) {
    try{
        // await connect();
        const page3 = await allAA();
        res.json(page3);    
    }
    catch(error){
        console.log(error)
    }
    // finally{
    //     await client.end()
    //     console.log("cleaned")
    // }
});

app.listen(8080, function() {
    console.log('Server listening...');
});


// execute();
// async function execute(){
//     try{
    
//     await connect();
//     const result = await allTem();
//     //console.log(page1)
//     return result
// }
//     catch (ex){
//         console.log(`failed ${ex}`)
//     }
//     finally{
//         await client_aa.end()
//         console.log("cleaned")
//     }
// }

async function connect(){
    try {
        await client_aa.connect();
    }
    catch(e){
        console.error(`fail to connect ${e}`)
    }
}


async function allTem() {
    try{
        //const result1 = await client_aa.query("SELECT COUNT (*) FROM sensorData;"); // print the number of rows)
        //const result2 = await client_aa.query("SELECT MIN(sensorValue) FROM sensorData;");
        //const result3 = await client_aa.query("SELECT sensorValue, COUNT (*) FROM sensorData GROUP BY sensorValue;")
        const result4 = await client_aa.query("SELECT * FROM sensorData");
        return  result4.rows;
    }
    catch(e){
        return (e);
    }
    
}

async function allAA() {
    try{
        await connect();
        const result1 = await client_aa.query("SELECT * FROM aameeting")
        console.log(result1.rows)
        return  result1.rows
    }
    catch(e){
        return (e);
    }
    
}

async function allDia() {
    try{
        
        var params = {
        TableName : "LearningProcessBlog",
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

        const data = client_dynamodb.query(params).promise();
        return data;
    }
    catch(e){
        return (e);
    }
    
}

//construct landing page and three main pages
var landingPage = `<h1>Data Structures</h1>
<ul>
<li><a href="cats.html">Random placeholder</a></li>
<li><a href="/sensor">Sensor Data</a></li>
<li><a href="/aa">AA Meeting</a></li>
<li><a href="/diary">My Diary</a></li>
</ul>
`;

var temperaturePage = `<h1>Temperature throughout November</h1>
<ul>
<li><a href="/temdata">raw data</a></li>
<li><a href="/meeting">key points</a></li>
<li><a href="/diary">visuals</a></li>
</ul>
`;

var diaryPage = `<h1>Learning Diary throughout November</h1>
<ul>
<li><a href="/diarydata">raw data</a></li>
<li><a href="/meeting">key points</a></li>
<li><a href="/diary">visuals</a></li>
</ul>
`;

var aaPage = `<h1>Find your aa meeting here</h1>
<ul>
<li><a href="/aadata">raw data</a></li>
<li><a href="/meeting">key points</a></li>
<li><a href="/diary">visuals</a></li>
</ul>
`;
