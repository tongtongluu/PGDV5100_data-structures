var request = require('request');
var fs = require('fs');


for (let i = 1; i < 11; i++) {
         if(i<10){
                        i='0'+i;
         }
 request('https://parsons.nyc/aa/m'+i+'.html', function(error, response, body){ 
             if (!error && response.statusCode == 200) {
                 fs.writeFileSync( '/home/ec2-user/environment/week01/data/m'+i+'.txt', body);
             }
             else { console.log("Request failed!")}
        });
    } 

       
       
    
    
