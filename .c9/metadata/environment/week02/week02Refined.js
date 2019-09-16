{"filter":false,"title":"week02Refined.js","tooltip":"/week02/week02Refined.js","undoManager":{"mark":2,"position":2,"stack":[[{"start":{"row":0,"column":0},"end":{"row":31,"column":104},"action":"insert","lines":["// ****** Updated Weekly Assignment 02 and data formatting by Aaron Hill ******","//npm install cheerio","var fs = require('fs');","var cheerio = require('cheerio');","","// Load the AA text file from week01 into a variable, `dataset`","var content = fs.readFileSync('/home/ec2-user/environment/week01/data/m08.txt');","","// load `content` into a cheerio object","var $ = cheerio.load(content);","console.log(content)","","","// create an empty array that holds the cleaned addresses","var address08= []; ","","","//find th required data based on format","$('td').each(function(i, elem) {","    if ($(elem).attr(\"style\") == \"border-bottom:1px solid #e3e3e3; width:260px\") {","        var thisMeeting = {};","        thisMeeting.streetAddress = $(elem).html().split('<br>')[2].trim().split(',')[0];","        thisMeeting.city = \"New York\";","        thisMeeting.state = \"NY\";","        address08.push(thisMeeting);","    }","});","    ","console.log(\"***************\");","console.log(address08);","","fs.writeFileSync('/home/ec2-user/environment/week03/address-m08-table.json', JSON.stringify(address08));"],"id":1}],[{"start":{"row":31,"column":59},"end":{"row":31,"column":69},"action":"remove","lines":["-m08-table"],"id":2}],[{"start":{"row":31,"column":59},"end":{"row":31,"column":60},"action":"insert","lines":["0"],"id":3},{"start":{"row":31,"column":60},"end":{"row":31,"column":61},"action":"insert","lines":["8"]}]]},"ace":{"folds":[],"scrolltop":335.5,"scrollleft":0,"selection":{"start":{"row":24,"column":36},"end":{"row":24,"column":36},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":33,"mode":"ace/mode/javascript"}},"timestamp":1568416860647,"hash":"1ffed7ceacb55c86e848cb4b82f6808317e599c5"}