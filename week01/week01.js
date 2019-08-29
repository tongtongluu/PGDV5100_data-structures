var request = require('request');
var fs = require('fs');
var urls = [
    'https://parsons.nyc/aa/m01.html',
    'https://parsons.nyc/aa/m02.html',
    'https://parsons.nyc/aa/m03.html',  
    'https://parsons.nyc/aa/m04.html',
    'https://parsons.nyc/aa/m05.html',  
    'https://parsons.nyc/aa/m06.html',  
    'https://parsons.nyc/aa/m07.html',  
    'https://parsons.nyc/aa/m08.html',  
    'https://parsons.nyc/aa/m09.html',  
    'https://parsons.nyc/aa/m10.html' 
    ]; 

var fns = [
    '/home/ec2-user/environment/data/m01.txt',
    '/home/ec2-user/environment/data/m02.txt',
    '/home/ec2-user/environment/data/m03.txt',
    '/home/ec2-user/environment/data/m04.txt',
    '/home/ec2-user/environment/data/m05.txt',
    '/home/ec2-user/environment/data/m06.txt',
    '/home/ec2-user/environment/data/m07.txt',
    '/home/ec2-user/environment/data/m08.txt',
    '/home/ec2-user/environment/data/m09.txt',
    '/home/ec2-user/environment/data/m10.txt'
    ];
//
for (let i = 0; i < 10; i++) {
         request(urls[i], function(error, response, body){ 
             if (!error && response.statusCode == 200) {
                 fs.writeFileSync(fns[i], body);
             }
             else { console.log("Request failed!")}
        });
    
    } 
    
// request(urls[0], function(error, response, body){ 
//              if (!error && response.statusCode == 200) {
//                  fs.writeFileSync(fns[0], body);
//              }
//              else { console.log("Request failed!")}
// });
       
       
    
    
