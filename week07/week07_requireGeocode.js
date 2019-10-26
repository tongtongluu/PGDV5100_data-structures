//  dependencies
var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');
const dotenv = require('dotenv'); // npm install dotenv

//  TAMU api key
dotenv.config();
const apiKey = process.env.TAMU_KEY;
console.log(apiKey);


//  create the geocode addresses array
var content = fs.readFileSync('../week07/completeInfo.json');
content = JSON.parse(content);
var meetingsData = [];
var addresses = [];
for ( var i = 0; i < content.length; i++) {
    addresses.push(content[i]['streetAddress']);
}
console.log(addresses);

var first = false;

// eachSeries in the async module iterates over an array and operates on each item in the array in series
async.eachSeries(addresses, function(value, callback) {
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
     apiRequest += 'streetAddress=' + value.split(' ').join('%20');
     apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
     apiRequest += '&format=json&version=4.01';
    
    if (first===false) {
        console.log(apiRequest);
        first=true;
    }
    // try to make sure the api key works and the file can be formatted into the required format
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
            var tamuGeo = JSON.parse(body);
            console.log(tamuGeo['InputAddress'].StreetAddress, tamuGeo['OutputGeocodes'][0],
                        tamuGeo['OutputGeocodes'][0].OutputGeocode.Latitude, 
                        tamuGeo['OutputGeocodes'][0].OutputGeocode.Longitude);
            let item = {"address": tamuGeo['InputAddress'].StreetAddress, 
                        "latLong": {"lat": tamuGeo['OutputGeocodes'][0].OutputGeocode.Latitude, 
                                    "lng": tamuGeo['OutputGeocodes'][0].OutputGeocode.Longitude}
                        };
            meetingsData.push(item);
            console.log(meetingsData);
        }
    });
    setTimeout(callback, 2000);
}, function() {
  fs.writeFileSync('/home/ec2-user/environment/week07/addressFinal.json', JSON.stringify(meetingsData));
    console.log('*** *** *** *** ***');
    console.log('Number of meetings in this zone: ');
    console.log(meetingsData.length);
});
