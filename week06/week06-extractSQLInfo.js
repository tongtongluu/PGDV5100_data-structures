// ****** code based on assignment2 ******
// select all the information 
//npm install cheerio
var fs = require('fs');
var cheerio = require('cheerio');

// Load the AA text file from week01 into a variable, `dataset`
var content = fs.readFileSync('/home/ec2-user/environment/week01/data/m08.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);
//console.log(content)

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

// read original file with location and geo location
var meetingInfo08 =  JSON.parse(fs.readFileSync('/home/ec2-user/environment/week03/address08Final.json'));
var originalAddress = JSON.parse(fs.readFileSync('/home/ec2-user/environment/week03/address08Final.json'));
//console.log(originalAddress)
// add address from the original file
let mtAddress = [];
for(let i = 0; i < originalAddress.length; i++){
        mtAddress.push(originalAddress[i].address);
}

// add geolocation from the original file
let geoLocation = [];
for(let i = 0; i < originalAddress.length; i++){
        geoLocation.push(originalAddress[i].latLong);
}


// add zipcode
let zList = [];
$('td').each(function(i, elem) {
    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px" ) {
         var zipcodeList = $(elem).html().split('<br>')[3].trim().split(' ').pop();
         zList.push(zipcodeList);
         //console.log(zipcodeList)
    }
});

 // add building name to the object
let bdName = [ ];
$('h4').each(function(i, elem) {
    if ($(elem).attr("style") == "margin:0;padding:0;" ) {
        var buildingName = $(elem).html().split('</b>')[0].trim();
        if (buildingName == ''){ buildingName = 'unknown building'}
        bdName.push(buildingName);
        //console.log(buildingName)
    }
});

// add meeting name into the object
let mtList = [ ];
$('td').each(function(i, elem) {
    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3; width:260px" ) {
         var meetingList = $(elem).html().split('<br>')[1].trim().split('</b>')[0].split('<b>')[1];
         mtList.push(meetingList);
    }
});

// add meeting note into the object
 let mtDetails = [ ];
 $('tr').each(function(i, elem) {
    if ($(elem).attr("style") == "margin-bottom:10px" ) {
        let meetings = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,'').split('<br><br>')[1].replace('<br>','').split('</div>')[0].split('<divclass="detailsBox">')[1];
        //if(meetings == undefined){meetings = 'no meeting details'}
        mtDetails.push(meetings);
    }
});


/* here the meetings have many kinds and there are many meetings in one area. learn to use正则表达式*/
 // add meeting day to the object
let mtDay = [ ];
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

// add meeting start time to the object
let mtStart = [ ];
$('td').each(function(i, elem) {
    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3;width:350px;" ) {
        let meetings = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,'').split('<br><br>');
        let singleRecord = [];
        for (let i = 0; i < meetings.length; i++) {
            let meeting = meetings[i].split('<b>')[1];
            //console.log(meeting)
            if (meeting != undefined){
                let start = meeting.substring(meeting.indexOf('>')).substr(1);
                //console.log(start)
                let startTime = convertTime(start);
                // console.log(startTime)
                singleRecord.push({'start': start, 'startTime': startTime[0], 'startMin': startTime[1]});
                
            }
        }
        //console.log('.......')
        mtStart.push(singleRecord);
    }
});


// add meeting end time to the object
let mtEnd = [ ];
$('td').each(function(i, elem) {
    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3;width:350px;" ) {
        let meetings = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,'').split('<br><br>');
        let singleRecord = [];
        for (let i = 0; i < meetings.length; i++) {
            let meeting = meetings[i].split('<b>')[2];
            //console.log(meeting)
            if (meeting != undefined){
                let end = meeting.substring(meeting.indexOf('>'), meeting.indexOf('<b')).substr(1);
                //console.log(end)
                let endTime = convertTime(end);
                //end[11][0] = '9:00PM'
                //singleRecord.push(end)
                singleRecord.push({'end': end, 'endTime': endTime[0], 'endMin': endTime[1]});
                
            }
        }
        //console.log('.......');
        mtEnd.push(singleRecord);
        //console.log(mtEnd[11])
    }
});

// add meeting special interest to the object
let sInt = [ ];
$('td').each(function(i, elem) {
    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3;width:350px;" ) {
        let meetings = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,'').split('<br><br>');
        let singleRecord = [];
        for (let i = 0; i < meetings.length; i++) {
             let meeting = meetings[i].split('<b>')[4];
//console.log(meeting)
//console.log('.......');  
    if (meeting != undefined){
             let interest = meeting.substring(meeting.indexOf('>')).substr(1);
             if (interest == []){ interest = 'not specify'}
              //console.log(interest)
      singleRecord.push(interest);
            }
        }
        sInt.push(singleRecord);
    }
});

// add meetingtype to the object
let mtType = [ ];
$('td').each(function(i, elem) {
    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3;width:350px;" ) {
        let meetings = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,'').split('<br><br>');
        let singleRecord = [];
        for (let i = 0; i < meetings.length;i++) {
             let meeting = meetings[i].split('<b>')[3];
//console.log(meeting)
//console.log('.......');  
    if (meeting != undefined){
             let type = meeting.substring(meeting.indexOf('>'), meeting.indexOf('=')).substr(1);
              //console.log(type)
      singleRecord.push(type);
            }
        }
     mtType.push(singleRecord);
    }
});

// add meetingtype details to the object
let tpDetails = [ ];
$('td').each(function(i, elem) {
    if ($(elem).attr("style") == "border-bottom:1px solid #e3e3e3;width:350px;" ) {
        let meetings = $(this).html().replace(/^\s*$[\n\r]{1,}/gm, '').replace(/\s+/g,'').split('<br><br>');
        let singleRecord = [];
        for (let i = 0; i < meetings.length;i++) {
             let meeting = meetings[i].split('<b>')[3];
              //console.log(meeting)
//console.log('.......');  
    if (meeting != undefined){
             let type = meeting.substring(meeting.indexOf('=')).substr(1).replace('<br>','');
              //console.log(type)
      singleRecord.push(type);
            }
        }
     tpDetails.push(singleRecord);
    }
});


// push all the elements into the meetingInfo08 object
    for (let i=0; i<meetingInfo08.length; i++) {
        meetingInfo08[i]['meetingName'] = mtList[i];
        meetingInfo08[i]['meetingDay'] = mtDay[i];
        meetingInfo08[i]['meetingStart'] = mtStart[i];
        meetingInfo08[i]['meetingEnd'] = mtEnd[i];
        meetingInfo08[i]['buildingName'] = bdName[i];
        meetingInfo08[i]['zipCode'] = zList[i];
        meetingInfo08[i]['specialInterest'] = sInt[i];
        meetingInfo08[i]['meetingType'] = mtType[i];
        meetingInfo08[i]['typeDetails'] = tpDetails[i];
        meetingInfo08[i]['meetingDetails'] = mtDetails[i];
        //console.log(meetingInfo08[i]);
    }

let Results = [];
for(let i = 0; i < bdName.length; i++){
    for(let j = 0; j< mtDay[i].length; j++){
        let result = {};
        //console.log(mtDay[i])
        //console.log(mtStart[i])
        result.buildingName = bdName[i];
        result.buildingAddress = mtAddress[i];
        result.geoLocation = geoLocation[i];
        result.zipCode = zList[i];
        result.meetingName = mtList[i];
        result.meetingNote = mtDetails[i];
        result.meetingDay = mtDay[i][j].day;
        result.meetingDayNum = mtDay[i][j].dayNum;
        result.meetingStart = mtStart[i][j].start;
        result.meetingStartHour = mtStart[i][j].startTime;
        result.meetingStartMin = mtStart[i][j].startMin;
        result.meetingEnd = mtEnd[i][j].end;
        result.meetingEndHour = mtEnd[i][j].endTime;
        result.meetingEndMin = mtEnd[i][j].endMin;
        result.specialInterest = sInt[i][j];
        result.meetingType = mtType[i][j];
        result.typeDetails = tpDetails[i][j];
        Results.push(result);
    }
}
console.log(Results);

//write the result into json file
fs.writeFileSync('/home/ec2-user/environment/week06/infoDetails.json', JSON.stringify(Results));

