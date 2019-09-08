//npm install cheerio
const fs = require('fs');
var cheerio = require('cheerio');

// load the m08 text file from last week into a variable, `content`
const content = fs.readFileSync('/home/ec2-user/environment/week01/data/m08.txt');



// load m08 file content` into a cheerio object
const $ = cheerio.load(content);


// create an empty array that holds the cleaned addresses
var address08= []; 

// find the elements based on style 
$('td[style="border-bottom\\:1px solid #e3e3e3; width\\:260px"]').each(function(i, elem) {

// translate the elements into html format to see the structure, then define the groups(by br to identify the order)
    $(elem).html();
    //console.log($(elem).html());

// the street details is order 2, started from 0
const street = $(elem).html().split('<br>')[2];
//console.log(street);

// the venue name is order 0: const venue = $(elem).html().split('<br>')[0];
// can also use find to extract text from h4 element, some information are missing: 
const venue = $(elem).find('h4').text().split('<br>');
    //console.log(venue);
    
//push elemenets into the empty arrary
address08.push(street.trim().split(',')[0]);
    
//  for(var a = 0; a < street.length; ++a){
//      address08.push({
// //         venue : venue[a],
//         street : street[a]
//      });
//   }
 }
    
 ); 
 console.log(address08);
fs.writeFileSync('cleanedAddress.txt', address08); 
    
    
    
// second method to choose the element by choosing nodes value. need to figure out how the nodes value works, here I just tried every number.
// $("td").each(function(i,elem){
//     if ($(elem).attr("style")=="border-bottom:1px solid #e3e3e3; width:260px"){

//         //  var x = $(elem).contents().get(6).nodeValue
//         //  console.log(x)
//          address08 += ($(elem).text()) + '\n';

         
         
         
