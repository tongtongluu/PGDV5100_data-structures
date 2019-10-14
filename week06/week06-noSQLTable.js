var blogEntries = [];

class blogEntry {
  constructor(dateTimeDetail, category, weekOrder, mode, blogName,  duration, fileNumber, includePics,keyInfo,thoughts) {
    // use date and timestamp as the primary key for it should be unique(because i included the second information here)
    this.dateTimeDetail = {};
    this.dateTimeDetail.S = new Date(dateTimeDetail).toISOString();
    
    // create category as the sort key
    this.category = {};
    this.category.S = category.toString();
    
    this.weekOrder = {};
    this.weekOrder.N = weekOrder.toString();
    
    
    this.mode = {};
    this.mode.S = mode;
    
   // create category as the sort key 
   
   
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

blogEntries.push(new blogEntry('30 August 2019 14:48 UTC','datastructure','1','confused','week01','3','12',false, ["aws-account","github-account","loops"], "Used let instead var to limit the scope of i, make it only exist through the loop, It takes time to get familiar with the JS syntax. the indentation is not as important as python, we use () to differentiate the scope."));
blogEntries.push(new blogEntry('30 August 2019 14:59 UTC','dataaesthetic','1','fun','week01','0.5','3',true, ["design-pattern"], "different design patterns, use directions to differentiate can be hard"));
blogEntries.push(new blogEntry('30 August 2019 19:59 UTC','dataaesthetic','1','really want to buy a mac now','week01','0.5','0',false, ["git-command"], "git update did not work in pc"));
blogEntries.push(new blogEntry('30 August 2019 15:48 UTC','datastructure','1','confused','week01','2','0',false, ["git-command","read-me-file "], " know the difference of pc and mac "));
blogEntries.push(new blogEntry('09 September 2019 15:55 UTC','datastructure','2','making progress','week02','4','4',false,  ["html-structure","unique-style-search"], "remember to figure out the solution of nodes value."));
blogEntries.push(new blogEntry('09 September 2019 17:55 UTC','datastructure','2','making progress','week02','0.5','0',false,  ["read-me-file"], "rewrite the read me file."));
blogEntries.push(new blogEntry('10 September 2019 15:55 UTC','dataaesthetic','2','making progress','week02','2','2',true,  ["clock()","object"], "tutorials on youtube and linkedinlearning"));
blogEntries.push(new blogEntry('11 September 2019 14:48 UTC','majorstudio','1','overwhelming','week01','3','0',false, ["aws-account","github-account"], "how the api works"));
blogEntries.push(new blogEntry('11 September 2019 17:48 UTC','statistics','1','easy','week01','0.5','0',false, ["proportion","percentage"], "this can't be real, feel like i am back to primary school"));
blogEntries.push(new blogEntry('16 September 2019 14:48 UTC','datastructure','3','figured it out quickly','week03','3.5','3',false,  ["use-index","git-ignore"], "study the stuructures first, for example the nested structure"));
blogEntries.push(new blogEntry('10 September 2019 15:55 UTC','dataaesthetic','2','making progress','week02','2','2',true,  ["clock()","object"], "tutorials on youtube and linkedinlearning"));
blogEntries.push(new blogEntry('23 September 2019 17:48 UTC','datastructure','4','be carefule with the design', 'week04','3','5',true,  ["detailed-rm","OLAP","OLTP","database-design"], "I used a Normalized Data Model, the hierarchy of the data: the main table is the meeting general table, which contains two foreign keys that linked with other table for additional information"));
blogEntries.push(new blogEntry('11 October 2019 14:48 UTC','majorstudio','1','overwhelming','week04','0','0',false, ["nothing"], "after done the first project, quit the class. decided to save it later"));
blogEntries.push(new blogEntry('12 October 2019 17:48 UTC','datastructure','4','refine', 'week05','6','8',false,  ["parse-information"], "remember to figure out how to insert pictures into the database"));
blogEntries.push(new blogEntry('13 October 2019 17:48 UTC','statistics','5','can handle','review session','5','0',false, ["hypothesis testing","t test"], "keep the cheatsheet organized"));
console.log(blogEntries);

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