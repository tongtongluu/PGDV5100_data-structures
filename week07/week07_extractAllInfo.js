// ****** read all the address ******
//npm install cheerio
const fs = require('fs');
const cheerio = require('cheerio');

//helper functions
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
//console.log(zone);

let content = [];
for(let i = 0; i < zone.length; i++){
    const contentDetails = fs.readFileSync(path + zone[i] + '.txt');
    content.push(contentDetails);
}

// read original file with location and geo location
const originalLocation = JSON.parse(fs.readFileSync('/home/ec2-user/environment/week07/addressFinal.json'));
console.log(originalLocation.length);




// load `content` seperatly into cheerio object
let addressAll= [ ]; 
let geoInfo = [ ];
let bdNameAll = [ ];
let mtAll = [ ];
let mtDetails = [ ];

    // add geolocation from the original file
for(let i = 0; i < originalLocation.length; i++){
        geoInfo.push(originalLocation[i].latLong);
}
//console.log(geoInfo)
for(let i = 0 ; i < content.length; i++){
    let zoneNumber = i + 1;
    let $ = cheerio.load(content[i]);
    // find  address, city. state, zoneNumber,zipCode and meetingName
        $('td').each(function(i, elem) {
            var thisMeeting = {};
            if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px") {
                thisMeeting.streetAddress = $(elem).html().split('<br>')[2].trim().split(',')[0];
                thisMeeting.city = "New York";
                thisMeeting.state = "NY";
                thisMeeting.zoneNumber = zoneNumber;
                thisMeeting.zipCode = $(elem).html().split('<br>')[3].trim().split(' ').pop();
                thisMeeting.meetingName = $(elem).html().split('<br>')[1].trim().split('</b>')[0].split('<b>')[1];
                addressAll.push(thisMeeting);
        }
    });
    


//console.log(geoInfo)
    
    // building name
      $('h4').each(function(i, elem) {
          var bdName = {};
          if ($(elem).attr("style") == "margin:0;padding:0;" ) {
                bdName.buildingName = $(elem).html().split('</b>')[0].trim();
                if (bdName.buildingName == ''){ bdName.buildingName = 'unknown building'}
            bdNameAll.push(bdName);
            
            }
    });  
    
   // meeting note
    $('tr').each(function(i, elem) {
        if ($(elem).attr("style") == "margin-bottom:10px" ) {
            let meetings = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,'').split('<br><br>')[1].replace('<br>','').split('</div>')[0].replace('<br>','').split('<divclass="detailsBox">')[1];
        //if(meetings == undefined){meetings = 'no meeting details'}
            mtDetails.push(meetings);
    }
});
 
    //meetings
     // add meeting day to the object
        $('td').each(function(i, elem) {
            if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3;width:350px;" ) {
                let meetings = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,'').split('<br><br>');
                let singleRecord = [];
                for (let i = 0; i < meetings.length; i++) {
                    let meeting1 = meetings[i].split('<b>')[1];
                    let meeting2 = meetings[i].split('<b>')[2];
                    let meeting3 = meetings[i].split('<b>')[3];
                    let meeting4 = meetings[i].split('<b>')[4];

                    if (meeting1 != undefined){
                        let day = meeting1.substring(0, meeting1.indexOf('From'));
                        let dayNum = convertDay(day);
                        let start = meeting1.substring(meeting1.indexOf('>')).substr(1);
                        let startTime = convertTime(start);
                        singleRecord.push({'day':day, 'dayNum': dayNum, 'start' : start, 'startTime': startTime[0], 'startMin': startTime[1]});
                        
                        if (meeting2 != undefined){
                            let end = meeting2.substring(meeting2.indexOf('>'), meeting2.indexOf('<b')).substr(1);
                            let endTime = convertTime(end);
                            singleRecord.push({'end': end, 'endTime': endTime[0], 'endMin': endTime[1]});
                            
                                if (meeting3 != undefined){
                                    let type = meeting3.substring(meeting3.indexOf('>'), meeting3.indexOf('=')).substr(1);
                                    let typeDetails = meeting3.substring(meeting3.indexOf('=')).substr(1).replace('<br>','');
                                    singleRecord.push({'type' : type, 'typeDetails' : typeDetails});
                        
                                    if (meeting4 != undefined){
                                        let interest = meeting4.substring(meeting4.indexOf('>')).substr(1).replace('<br>','');
                                        singleRecord.push({'specialInterest' : interest});
                                    }
                                }
                            }
                        }
                     }
                     mtAll.push(singleRecord);
            }
    
        });
}
//console.log(mtAll[0][0])

// push all the elements into the original objects  with location and geo location
let completeInfo = [];
for (let i = 0; i < addressAll.length; i++) {
    const address = addressAll[i];
    const geoLocation = geoInfo[i];
    const bdName = bdNameAll[i];
    const mt = mtAll[i];
    const mtDetail = mtDetails[i];
    //console.log(geoLocation)

    let completeRecord = {};

    completeRecord.streetAddress = address.streetAddress;
    completeRecord.latitude = geoLocation.lat;
    completeRecord.longtitude = geoLocation.lng;
    completeRecord.city = address.city;
    completeRecord.state = address.state;
    completeRecord.zoneNumber = address.zoneNumber;
    completeRecord.zipCode = address.zipCode;
    completeRecord.meetingName = address.meetingName;
    completeRecord.buildingName = bdName.buildingName;
    completeRecord.details = mtDetail;
    
    let j = 0;
    while (mt[j]) {
        completeRecord.day = mt[j].day;
        completeRecord.dayNum = mt[j].dayNum;
        completeRecord.start = mt[j].start;
        completeRecord.startTime = mt[j].startTime;
        completeRecord.startMin = mt[j].startMin;
        j += 1;
        if (mt[j]) {
            if (mt[j].end) {
                completeRecord.end = mt[j].end;
                completeRecord.endTime = mt[j].endTime;
                completeRecord.endMin = mt[j].endMin;
                j += 1;
            }
        }
        if (mt[j]) {
            if (mt[j].type) {
                completeRecord.type = mt[j].type;
                completeRecord.typeDetails = mt[j].typeDetails;
                j += 1;
            }
        }
        if (mt[j]) {
            if (mt[j].specialInterest) {
                completeRecord.specialInterest = mt[j].specialInterest;
                j += 1;
            }
        }
        completeInfo.push(completeRecord);
    }
}

console.log(completeInfo);

fs.writeFileSync('/home/ec2-user/environment/week07/completeInfo.json', JSON.stringify(completeInfo));
