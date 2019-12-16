var blogEntries = [];

class blogEntry {
  constructor(date, course, week, mode, blogName,  duration, fileNumber, includePics,keyInfo,thoughts) {
    // use date and timestamp as the primary key for it should be unique(because i included the second information here)
    this.created = {};
    this.created.S = new Date(date).toISOString();
    
    // create category as the sort key
    this.course = {};
    this.course.S = course.toString();
    
    this.week = {};
    this.week.S = week.toString();
    
    
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
blogEntries.push(new blogEntry('11 October 2019 17:48 UTC','datastructure','4','refine', 'week05','6','8',false,  ["parse-information"], "remember to figure out how to insert pictures into the database"));
blogEntries.push(new blogEntry('13 October 2019 17:48 UTC','statistics','5','can handle','review session','5','0',false, ["hypothesis testing","t test"], "keep the cheatsheet organized"));
blogEntries.push(new blogEntry('14 October 2019 17:48 UTC','datastructure','5','overwhelming','week06','5','0',false, ["noSQL","database testing"], "seems simple than sql database"));
blogEntries.push(new blogEntry('15 October 2019 17:48 UTC','datastructure','5','overwhelming','week07','5','0',false, ["hypothesis testing","t test"], "keep the cheatsheet organized"));
blogEntries.push(new blogEntry('17 October 2019 17:48 UTC','majorstudio','5','can handle','review session','5','0',false, ["project1","critique"], "feel like i should take it later"));
blogEntries.push(new blogEntry('20 October 2019 17:48 UTC','statistics','6','make progress','week07','5','0',false, ["use-index","shape"], "keep the cheatsheet organized"));
blogEntries.push(new blogEntry('22 October 2019 17:48 UTC','dataaesthetic','6','make progress','review session','5','0',false, ["quality data","chroma"], "keep the cheatsheet organized"));
blogEntries.push(new blogEntry('23 October 2019 17:48 UTC','dataaesthetic','6','can handle','week07','5','0',false, ["placement"], "keep the cheatsheet organized"));
blogEntries.push(new blogEntry('24 October 2019 17:48 UTC','dataaesthetic','6','can handle','review session','5','0',false, ["redo","use dataset"], "keep the cheatsheet organized"));
blogEntries.push(new blogEntry('25 October 2019 17:48 UTC','statistics','6','can handle','week08','5','0',false, ["earthquake","boom"], "keep the cheatsheet organized"));
blogEntries.push(new blogEntry('26 October 2019 17:48 UTC','datastructure','7','can handle','week08','5','0',false, ["app","jquerry"], "keep the cheatsheet organized"));
blogEntries.push(new blogEntry('27 October 2019 17:48 UTC','datastructure','7','make progress','week08','5','0',false, ["app testing","ajax"], "keep the cheatsheet organized"));
blogEntries.push(new blogEntry('10 November 2019 17:48 UTC','datastructure','7','can handle','week08','5','0',false, ["app testing","all the information"], "the loop inside the loop confused me"));
blogEntries.push(new blogEntry('11 November 2019 17:48 UTC','statistics','7','can handle','week08','5','0',false, ["structures","t test"], "ummmmmmm its getting more interesting"));
blogEntries.push(new blogEntry('13 November 2019 17:48 UTC','dataaesthetic','8','can handle','week07','5','0',false, ["hypothesis testing","t test"], "ok, lemme redo it"));
blogEntries.push(new blogEntry('15 November 2019 17:48 UTC','dataaesthetic','8','overwhelming','week08','5','0',false, ["structures testing","t test"], "focus on documentation"));
blogEntries.push(new blogEntry('14 November 2019 17:48 UTC','dataaesthetic','8','can handle','week08','5','0',false, ["structurestesting","t test"], "lifelong romance"));
blogEntries.push(new blogEntry('17 November 2019 17:48 UTC','dataaesthetic','8','overwhelming','week08','5','0',false, ["hypothesis testing","t test"], "how to improve my design skills"));
blogEntries.push(new blogEntry('18 November 2019 17:48 UTC','statistics','8','can handle','week08','5','0',false, ["bootstrap","t test"], "it is not as complicated as i thought"));
blogEntries.push(new blogEntry('20 November 2019 17:48 UTC','datastructure','7','overwhelming','week09','5','0',false, ["hypothesis testing","t test"], "keep the cheatsheet organized"));
blogEntries.push(new blogEntry('21 November 2019 17:48 UTC','datastructure','7','can handle','week09','5','0',false, ["d3 library","t test"], "keep the cheatsheet organized"));
blogEntries.push(new blogEntry('22 November 2019 17:48 UTC','datastructure','6','really want to buy a mac now','week09','5','0',false, ["hypothesis testing","t test"], "ahhhhhhhhhhh it works"));
blogEntries.push(new blogEntry('23 November 2019 17:48 UTC','statistics','5','coverwhelming','week09','5','0',false, ["pearson R","t test"], "this time the helper function works"));
blogEntries.push(new blogEntry('24 November 2019 17:48 UTC','dataaesthetic','5','really want to buy a mac now','week09','5','0',false, ["hypothesis testing","t test"], "writing class can help to keep the page organized"));
blogEntries.push(new blogEntry('25 November 2019 17:48 UTC','dataaesthetic','6','can handle','week06','5','0',false, ["gamma","t test"], "it is the case"));
blogEntries.push(new blogEntry('26 November 2019 17:48 UTC','statistics','6','can handle','week06','5','0',false, ["online sharing","t test"], "keep the cheatsheet organized"));
blogEntries.push(new blogEntry('27 November 2019 17:48 UTC','datastructure','7','overwhelming','week07','5','0',false, ["sql comparasion","t test"], "khow to improve my design skills"));
blogEntries.push(new blogEntry('28 November 2019 17:48 UTC','datastructure','7','really want to buy a mac now','week07','5','0',false, ["hypothesis testing","t test"], "keep the cheatsheet organized"));
blogEntries.push(new blogEntry('29 November 2019 17:48 UTC','datastructure','8','can handle','week08','5','0',false, ["deleted","t test"], "keep the cheatsheet organized"));
blogEntries.push(new blogEntry('02 December 2019 17:48 UTC','datastructure','8','can handle','week08','5','0',false, ["youtube tutorials","t test"], "how to improve my design skills"));
blogEntries.push(new blogEntry('02 December 2019 17:48 UTC','statistics','8','can handle','week08','5','0',false, ["ordinal ","z test"], "keep the cheatsheet organized"));
blogEntries.push(new blogEntry('03 December 2019 17:48 UTC','statistics','9','overwhelming','week09','5','0',false, ["interval ratio","t test"], "how to improve my design skills"));
blogEntries.push(new blogEntry('04 December 2019 17:48 UTC','dataaesthetic','9','can handle','week09','5','0',false, ["earthquake","swrils"], "keep the cheatsheet organized"));
blogEntries.push(new blogEntry('05 December 2019 17:48 UTC','dataaesthetic','9','really want to buy a mac now','wrap up','5','0',false, ["legend","smooth line"], "start testing first"));
blogEntries.push(new blogEntry('13 December 2019 17:48 UTC','dataaesthetic','10','can handle','wrap up','5','0',false, ["hypothesis testing","map"], "how to improve my design skills"));
blogEntries.push(new blogEntry('15 December 2019 17:48 UTC','datastructure','10','really want to buy a mac now','wrap up','5','0',false, ["wrap up"], "wrap up and documentation kills"));
blogEntries.push(new blogEntry('10 December 2019 17:48 UTC','statistics','10','can handle','wrap up','5','0',false, ["wrap up"], "keep the cheatsheet organized"));
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
  params.TableName = "newBlog";
  dynamodb.putItem(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}