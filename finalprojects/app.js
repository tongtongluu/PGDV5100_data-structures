/*Part1: setting up*/
//set up route,handle bars and required packages
const express = require('express'), 
    app = express();
const request = require('request');
const dotenv = require('dotenv')
const result = dotenv.config({ path: '.env' });
const fs = require('fs');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');
const moment = require('moment');
const AWS= require('aws-sdk');
const { Client } = require('pg');


// database AA credentials, which includes aameeting and sensor data
var db_aa = new Object();
db_aa.user = result.parsed.AWS_ID;
db_aa.host = result.parsed.AWSRDS_EP;
db_aa.database = 'aa';
db_aa.password = result.parsed.AWSRDS_PW;
db_aa.port = 5432;
const client_aa = new Client(db_aa);

// dynamo db database credentials, which includes my diary data
AWS.config = new AWS.Config();
AWS.config.accessKeyId = result.parsed.AWS_ID;
AWS.config.secretAccessKey = result.parsed.AWS_KEY;
AWS.config.region = "us-east-1";
const client_dynamodb = new AWS.DynamoDB();

//running the server
app.use(express.static('public'));
app.listen(8080, function() {
    console.log('Server listening...');
});

/*Part2: Listed All the web pages here*/
//1.  tempturature raw data page
app.get('/temdata', async function(req, res) {
    try{
        await connect();
        const page1 = await allTem();
        res.json(page1);    
    }
    catch(error){
        console.log(error)
    }
});

//2. diary raw data page
app.get('/diarydata', async function(req, res) {
    try{
        const page2 = await allDia();
        res.json(page2);    
    }
    catch(error){
        console.log(error)
    }
});

//3. aa meeting raw data page
app.get('/aadata', async function(req, res) {
    try{
        // await connect();
        const page3 = await allAA();
        res.json(page3);
    }
    catch(error){
        console.log(error)
    }

});
//4. aa map page with the dynamic queries/filters
app.get('/aa',async function (req, res){
  if (req.query == {}){
    res.send(await dayFilter());
  } else {
    res.send(await dayFilter(req.query.day, req.query.type));
  }
});


//5. process blog  page with the dynamic queries/filters
app.get('/blog', async function (req, res) {
    
var dynamodb = new AWS.DynamoDB();

    var params = {
    TableName : "LearningBlogs",
    KeyConditionExpression: "#cat = :course and #wk = :week" ,
    ExpressionAttributeNames: { 
        "#wk" : "week",
        "#cat" : "course"
    },
    ExpressionAttributeValues: { // the query values
        ":course": {S: req.query.course},
        ":week": {S: req.query.week}
        // ":maxWeek": {S: "3"}
        
    }
};
    var output = {};
    
    
  dynamodb.query(params, function(err, data) {
      if (err) {
         // console.log('there was an error')
      } else {
          
          output.blogpost = [];
          data.Items.forEach(item => {
              output.blogpost.push({course: item.course.S, week: item.week.S, thoughts: item.thoughts.S})
          })
          
         
         fs.readFile('./bloghandle.html', 'utf8', (error, templateData) => {
            var template = handlebars.compile(templateData);
            var html = template(output);
            res.send(html);
            
        
        })
      }
  });


});



//6. sensor data page  page with the general line graph view
app.get('/sensortest', function(req, res1) {
const client_aa = new Client(db_aa);
client_aa.connect();
var secondQuery = "SELECT * FROM sensorData;"; //print all values
var firstQuery = "SELECT COUNT(*) FROM sensorData;"; // print counts values
var thirdQuery = `SELECT 
        EXTRACT(DAY FROM sensorData) as sensorday,
        EXTRACT(HOUR FROM sensorData) as sensorhour,
        AVG(sensorvalue::int) as AVGTEMP
        FROM sensorData
        GROUP BY sensorday,sensorhour
        ORDER BY sensorday
        ;`;
client_aa.query(secondQuery, (err, res) => {
    if (err) {throw err}
    else {
    //console.table(res.rows);

    var data = JSON.stringify(res.rows)
    
    res1.send(res.rows)
    }
});


});

//7. sensor data page  with the donuts view to show average temperature of each hours on each day
app.get('/sensoraverage', function(req, res1) {
const client_aa = new Client(db_aa);
client_aa.connect();
// Sample SQL statement to query the entire contents of a table: 
var secondQuery = "SELECT * FROM sensorData;"; //print all values
var firstQuery = "SELECT COUNT(*) FROM sensorData;"; // print counts values
var thirdQuery = `SELECT 
        EXTRACT(DAY FROM sensortime) as sensorday,
        EXTRACT(HOUR FROM sensortime) as sensorhour,
        AVG(sensorvalue::int) as AVGTEMP
        FROM sensorData
        GROUP BY sensorday,sensorhour
        ORDER BY sensorday
        ;`;

client_aa.query(thirdQuery, (err, res) => {
    if (err) {throw err}
    else {
    //console.table(res.rows);

    var data = JSON.stringify(res.rows)
    
    res1.send(res.rows)
    
    
    }
});
});

//8. process blog page  with dynamic queries to show blogs created for each subject
app.get('/blogg', async function (req, res) {
    if (req.query == {}){
        res.send(await processBlog());
    } else {
         res.send(await processBlog(req.query.start,req.query.end,req.query.category));
    }
});


///////////////////////////////////////////////////////////////////////////////////
/*Part3: helper functions that can be called on each page based on the user needs*/
//1. function that can connect with database and throw the errors
async function connect(){
    try {
        await client_aa.connect();
    }
    catch(e){
        console.error(`fail to connect ${e}`);
    }
}

//2. function that query all the raw data from the temperature sensor database
async function allTem() {
    try{
       const result4 = await client_aa.query("SELECT * FROM sensorData");
        return  result4.rows;
    }
    catch(e){
        return (e);
    }
    
}

//2. function that query all the raw data from the aa meeting database
async function allAA() {
    try{
        await connect();
        const result1 = await client_aa.query("SELECT * FROM aameetingALL")
        console.log(result1.rows)
        return  result1.rows
    }
    catch(e){
        return (e);
    }
    
}
//3. function that query all the raw data from the process blog dynamodb 
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

//4. function that used for aa meeting to query based on meeting days and meeting type
async function dayFilter(day, type) {
        return new Promise(resolve => {
             dayy = day || moment().format("dddd") + 's'; 
             typee = type;
            var output = {};
            const client_aa = new Client(db_aa);
            client_aa.connect();
            var thisQuery;
            if(day == '*' , type =="*"){
                thisQuery = `SELECT lat_, long_, buildingname,  zipcode, json_agg(json_build_object('location', buildingname, 'address', buildingaddress,'specialinterest',specialinterest, 'meeting', meetingname, 'day', meetingday, 'types', meetingtype,'shour', meetingstart)) as meeting
            FROM aameetingALL
            GROUP BY  lat_, long_, zipCode,buildingName
            ;`;
            }
            
            else if(day !="*", type !="*"){thisQuery = `SELECT lat_, long_, buildingname,  zipcode, json_agg(json_build_object('location', buildingname, 'address', buildingaddress,'specialinterest',specialinterest, 'meeting', meetingname, 'day', meetingday, 'types', meetingtype,'shour', meetingstart)) as meeting
            FROM aameetingAll
            WHERE meetingDay = '` + dayy + `' AND meetingtype = '` + typee + `'
            GROUP BY buildingName, lat_, long_, zipCode
            ;`}
            
            else if(day != '*' , type =="*"){thisQuery = `SELECT lat_, long_, buildingname,  zipcode, json_agg(json_build_object('location', buildingname, 'address', buildingaddress,'specialinterest',specialinterest, 'meeting', meetingname, 'day', meetingday, 'types', meetingtype,'shour', meetingstart)) as meeting
            FROM aameetingAll
            WHERE meetingDay = '` + dayy + `' 
            GROUP BY buildingName, lat_, long_, zipCode
            ;` }
            else if(day == '*' , type !="*"){thisQuery = `SELECT lat_, long_, buildingname,  zipcode, json_agg(json_build_object('location', buildingname, 'address', buildingaddress,'specialinterest',specialinterest, 'meeting', meetingname, 'day', meetingday, 'types', meetingtype,'shour', meetingstart)) as meeting
            FROM aameetingAll
            WHERE meetingtype = '` + typee + `'
            GROUP BY buildingName, lat_, long_, zipCode
            ;` }
            
            client_aa.query(thisQuery,  async (err, res) => {
                if (err){console.log(err)}
                console.log(res.rows);

                await fs.readFile('./aahandle.html', 'utf8', (error, data) => {
                  var template = handlebars.compile(data);
                    output.meetings= res.rows;
                   var html = template(output);
                    resolve([html,res.rows]);
            });
            // client_aa.end();
        });
            
        })
}


//5. function that used for process blog to query based on subject type
async function processBlog(minDate, maxDate, course){
    return new Promise(resolve => {
        var output = {};
        
        minDate = minDate || "August 1 2000"
        maxDate = maxDate || "December 10 2100"; 
        course = course || 'all';
        // console.log(new Date(maxDate).toLocaleString())
        output.blogpost = [];
        
        if (course != 'all'){
            var params = {
                TableName : "newBlog",
                KeyConditionExpression: "course = :course and created between :minDate and :maxDate", // the query expression
                ExpressionAttributeValues: { // the query values
                    ":course": {S: course},
                    ":minDate": {S: new Date(minDate).toISOString()},
                    ":maxDate": {S: new Date(maxDate).toISOString()},
                }
            };
            
            client_dynamodb.query(params, onScan)

        } else {
            var params = {
                TableName: "newBlog",
                ProjectionExpression: "created, blogName, course, keyInfo, thoughts",
                FilterExpression: "created between :minDate and :maxDate",
                 ExpressionAttributeValues: { // the query values
                    ":minDate": {S: new Date(minDate).toISOString()},
                    ":maxDate": {S: new Date(maxDate).toISOString()}
                }
            };
            
            client_dynamodb.scan(params, onScan)

        }

//6. function that used for process blog to query all result that meet the requirements
        function onScan(err, data) {
            if (err) {
                console.error("Error. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                data.Items.forEach(function(item) {
                    // console.log(item)
                    // console.log("***** ***** ***** ***** ***** \n", item);
                    output.blogpost.push({'course':item.course.S, 'content':item.keyInfo.SS, 'thoughts':item.thoughts.S,'created':moment(item.created.S).format("LL")});
                });
    
                fs.readFile('blogghandle.html', 'utf8', (error, data) => {
                    var template = handlebars.compile(data);
                    var html = template(output);
                    resolve(html);
                });
            }
        };
    });
 }
 



