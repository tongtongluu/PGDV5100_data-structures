// ****** Updated Weekly Assignment 02 and data formatting by Aaron Hill ******
//npm install cheerio
var fs = require('fs');
var cheerio = require('cheerio');

// Load the AA text file from week01 into a variable, `dataset`
var content = fs.readFileSync('/home/ec2-user/environment/week01/data/m08.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);
console.log(content)


// create an empty array that holds the cleaned addresses
var address08= []; 


//find th required data based on format
$('td').each(function(i, elem) {
    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px") {
        var thisMeeting = {};
        thisMeeting.streetAddress = $(elem).html().split('<br>')[2].trim().split(',')[0];
        thisMeeting.city = "New York";
        thisMeeting.state = "NY";
        address08.push(thisMeeting);
    }
});
    
console.log("***************");
console.log(address08);

fs.writeFileSync('/home/ec2-user/environment/week03/address08.json', JSON.stringify(address08));