$(function(){

    // this is jQuery! it listens for any time the user changes the drop down menu and when it does it calls the getResults() function.
    $('select').change(function() {
        getResults()
    });
});


function getResults(){
    // creates an object to store our variable(s) in that will be sent back to the server.
    // $('select[name="category"]').val() is jQuery and gets the current selected value from the dropdown.
    var parameters = {};

    //this is AJAX and it calls the /blog endpoint on the server(in app.js) and sends the paramters object.
    $.get( '/aatest',parameters, function(data) {

        // When the server returns information, the returned data (hanlebars html) is added to the blogpost DIV.
        // Alternatively, if the server is sending back JSON data, you can use it to create a map or graph etc.
        console.log(data)
        
        data.forEach(item => {
            L.marker( [item.lat_, item.long_] ).bindPopup(item.buildingName).addTo(map);
        })
    });
}

// put anything you would like to run on pageload inside here
function init(){
    getResults()
    
        map = L.map('map').setView([40.756902, -73.980421], 12);

        // load a set of map tiles – choose from the different providers demoed here:
        // https://leaflet-extras.github.io/leaflet-providers/preview/
        var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	         attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	         subdomains: 'abcd',
	         maxZoom: 19
        });

        CartoDB_Positron.addTo(map);
}

// call the init function to start
init()