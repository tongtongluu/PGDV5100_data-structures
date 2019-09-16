# Weekly Assignment 3
### step 1
work on the previous data for assignment 2 and save it as week08.json

### step 2
mainly forcused on the instructions provided. Hand type in one address to see if it workspace, saved in a file called first.json

### step 3

track if the code read my apiKey successfully. and study the nested structure of the data called back

### step 4
use [index] to trace the addresses and geographic attributes I need. saved it as file address08Final.json


```javascript
let item = {"address": tamuGeo['InputAddress'].StreetAddress, 
                        "latLong": {"lat": tamuGeo['OutputGeocodes'][0].OutputGeocode.Latitude, 
                                    "lng": tamuGeo['OutputGeocodes'][0].OutputGeocode.Longitude}
                        }
            meetingsData.push(item);
```

#### thoughts: create a git ignore file and protect your information