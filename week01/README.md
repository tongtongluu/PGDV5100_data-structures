# Initial Setup

I Create a new [GitHub] repository and name it `PGDV5100_data-structures`  

# Weekly Assignment 1



## Procedutes

1. figured out how to link aws with my github account   



2. Used Node.js: Use the initial starter code provided by the professor to generate ten txt files requested from the ten urls.

3. Fixed the bug. that variable i did not go through the loop

4. Used let instead var to limit the scope of i, make it only exist through the loop

5. Optimized the code by inserting several loops to generate the url address without hard code it


## Starter code

```javascript
// npm install request
// mkdir data

var request = require('request');
var fs = require('fs');

request('https://parsons.nyc/thesis-2019/', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/thesis.txt', body);
    }
    else {console.log("Request failed!")}
});
```
### Thoughts

It takes time  to get familiar with the JS syntax. 
the indentation is not as important as python, we use () to differentiate the scope.
