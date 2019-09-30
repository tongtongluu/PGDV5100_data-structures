var blogEntries = [];

class blogEntry {
  constructor(primaryKey, date, mode, blogName,  duration, fileNumber, includePics,keyInfo,thoughts) {
    // add primary key manually, may not be necessary?
    this.pk = {};
    this.pk.N = primaryKey.toString();
    
 
    this.date = {};
    this.date.S = new Date(date).toDateString();
    
    
    this.mode = {};
    this.mode.S = mode;
    
   // create blogName as the sort key 
    this.blogName = {};
    this.blogName.S = blogName;
    
    
    this.duration = {};
    this.duration.N = duration.toString();
    
    this.fileNumber = {};
    this.fileNumber.N = fileNumber.toString();
    
    this.includePics = {};
    this.includePics.BOOL = includePics;
    
    
    if (keyInfo != null) {
      this.keyInfo = {};
      this.keyInfo.SS = keyInfo;
    }
    if (thoughts != null) {
      this.thoughts = {};
      this.thoughts.S = thoughts;
    }

}}

blogEntries.push(new blogEntry('0','2019-08-30','confused','week01','3','12',false, ["aws-account","github-account","loops"], "Used let instead var to limit the scope of i, make it only exist through the loop, It takes time to get familiar with the JS syntax. the indentation is not as important as python, we use () to differentiate the scope."));
blogEntries.push(new blogEntry('1','2019-09-09','did some detaild observation','week02','4','4',false,  ["html-structure","unique-style-search"], "remember to figure out the solution of nodes value."));
blogEntries.push(new blogEntry('2','2019-09-16','figured it out quickly','week03','3.5','3',false,  ["use-index","git-ignore"], "study the stuructures first, for example the nested structure"));
blogEntries.push(new blogEntry('3','2019-09-23','be carefule with the design', 'week04','3','5',true,  ["detailed-rm","OLAP","OLTP","database-design"], "I used a Normalized Data Model, the hierarchy of the data: the main table is the meeting general table, which contains two foreign keys that linked with other table for additional information"));

//console.log(blogEntries);

var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.accessKeyId = process.env.AWS_ID;
AWS.config.secretAccessKey = process.env.AWS_KEY;
AWS.config.region = "us-east-1";

var dynamodb = new AWS.DynamoDB();

for (var i=0; i < blogEntries.length; i++){
  var params = {};
  params.Item = blogEntries[i];
  params.TableName = "LearningProcessBlog";
  dynamodb.putItem(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}