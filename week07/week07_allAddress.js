// ****** read all the address ******
//npm install cheerio
const fs = require('fs');
const cheerio = require('cheerio');

// Load the AA text file from week01 into a variable, `dataset`
var path = '/home/ec2-user/environment/week01/data/m';
var zone = [];
for(let i = 1;i < 11;i ++){
    if (i < 10){ i = '0' + i;
    }
zone.push(i);
}
//console.log(zone);

var content = [];
for(let i = 0; i < zone.length; i++){
    var contentDetails = fs.readFileSync(path + zone[i] + '.txt');
    content.push(contentDetails);
    
}

// load `content` into a cheerio object
let addressAll= [ ]; 
for(let i = 0 ; i < content.length; i++){
    let zoneNumber = i + 1;
    let $ = cheerio.load(content[i]);
    // find all address
        $('td').each(function(i, elem) {
            var thisMeeting = {};
            if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px") {
                thisMeeting.streetAddress = $(elem).html().split('<br>')[2].trim().split(',')[0];
                thisMeeting.city = "New York";
                thisMeeting.state = "NY";
                thisMeeting.zoneNumber = zoneNumber;
                addressAll.push(thisMeeting);
        }

    });
    
}
console.log(addressAll);
fs.writeFileSync('/home/ec2-user/environment/week07/address00.json', JSON.stringify(addressAll));
