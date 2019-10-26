// ****** read all the address ******
//npm install cheerio
var fs = require('fs');
var cheerio = require('cheerio');

// ****helper functions****
// convert time into time string
const convertTime = (timeString) => {
  const time = timeString.slice(0,-2);
  const modifier = timeString.slice(-2);

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  return [parseInt(hours), parseInt(minutes)];
};

// convert day into day string
const convertDay = (dayString)=>{
    let days = ['Mondays','Tuesdays','Wednesdays','Thursdays','Fridays','Saturdays','Sundays'];
    return days.indexOf(dayString) + 1;
};



// Load the AA text file from week01 into a variable, `dataset`
var path = '/home/ec2-user/environment/week01/data/m';
var zone = [];
for(let i = 1;i < 11;i ++){
    if (i < 10){ i = '0' + i;
    }
zone.push(i);
}

// push content for each file into a content string
var content = [ ];
for(let i = 0; i < zone.length; i++){
    var contentDetails = fs.readFileSync(path + zone[i] + '.txt');
    content.push(contentDetails);
}

// load `content` into a cheerio object
for(let m = 0 ; m < content.length; m++){
    var $ = cheerio.load(content[m]);
    var allInfo =  JSON.parse(fs.readFileSync('/home/ec2-user/environment/week07/address00.json'));
    var originalAddress = JSON.parse(fs.readFileSync('/home/ec2-user/environment/week07/address00.json'));
    //console.log(originalAddress)
    
// add address    
    var mtAddress = [];
    for(let i = 0; i < originalAddress.length; i++){
        mtAddress.push(originalAddress[i].streetAddress);
    }
    
// add geolocation from the original file
    // let geoLocation = [];
    // for(let i = 0; i < originalAddress.length; i++){
    //     geoLocation.push(originalAddress[i].latLong);
    // }
    // console.log(mtAddress)
 
    
// add zone number from the original file
    var zoneN = [];
    for(let i = 0; i < originalAddress.length; i++){
        zoneN.push(originalAddress[i].zoneNumber);
    }

// add zipcode
var zList = [];
$('td').each(function(i, elem) {
    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px" ) {
         var zipcodeList = $(elem).html().split('<br>')[3].trim().split(' ').pop();
         zList.push(zipcodeList);
    }
});

// add building name to the object
var bdName = [ ];
$('h4').each(function(i, elem) {
    if ($(elem).attr("style") == "margin:0;padding:0;" ) {
        var buildingName = $(elem).html().split('</b>')[0].trim();
        if (buildingName == ''){ buildingName = 'unknown building'}
        bdName.push(buildingName);
        
    }
    
});
//console.log(bdName.length)
    
 // add meeting day to the object
var mtDay = [ ];
$('td').each(function(i, elem) {
    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3;width:350px;" ) {
        let meetings = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,'').split('<br><br>');
        let singleRecord = [];
        for (let i = 0; i < meetings.length; i++) {
            let meeting = meetings[i].split('<b>')[1];
            //console.log(meetings)
            if (meeting != undefined){
                let day = meeting.substring(0, meeting.indexOf('From'));
                //console.log(day)
                let dayNum = convertDay(day);
                singleRecord.push({'day':day, 'dayNum': dayNum});
            }
        }
        //console.log('.......');
        mtDay.push(singleRecord);
    }
});
   


    }
    

// push all the elements into the allInfo object
    for (let i = 0; i < allInfo.length; i++) {
        //allInfo[i]['meetingName'] = mtList[i];
        allInfo[i]['meetingDay'] = mtDay[i];
        // meetingInfo08[i]['meetingStart'] = mtStart[i];
        // meetingInfo08[i]['meetingEnd'] = mtEnd[i];
        allInfo[i]['buildingName'] = bdName[i];
        allInfo[i]['zipCode'] = zList[i];
        // meetingInfo08[i]['specialInterest'] = sInt[i];
        // meetingInfo08[i]['meetingType'] = mtType[i];
        // meetingInfo08[i]['typeDetails'] = tpDetails[i];
        // meetingInfo08[i]['meetingDetails'] = mtDetails[i];
        allInfo[i]['meetingAddress'] = mtAddress[i];
        allInfo[i]['meetingZone'] = zoneN[i];
    }
        console.log(allInfo);
//fs.writeFileSync('/home/ec2-user/environment/week07/address00.json', JSON.stringify(addressAll));
