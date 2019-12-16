
/*global L,carto */
// $(document).ready(function(){
//   $("#splasher").click(function(){
//     $("#splasher").fadeOut('slow');
//   });
//   $("#button2").click(function(){
//     $("#splasher").fadeIn('slow');
//   });
// });

const mymap = L.map('mapid',{
  center:[40.7132514,-74.002398],
  zoom:13,
  minZoon: 3,
  maxZoom:15,
  zoomControl:false,
  attributionControl:true
  });
  
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 20,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1IjoibHVxNzc4IiwiYSI6ImNrMzdsZ3hxaDAwMHEzamxkdTJtcGppc3UifQ.oQP1bg5nLong5oE0dh8GgQ'
}).addTo(mymap);


let markers = L.layerGroup().addTo(mymap);

$(function(){
    $('select').change(function(){
        getResults()
    });
});

function getResults(){
    var parameters = { day: $('select[ name="day"]').val(), type: $('select[ name="type"]').val()}
    $.get('/aa', parameters, function(data){
        $('#meetings').html(data[0])
        console.log(data[1])
        markers.clearLayers();
        //loop through the JSON data and add markers to the map
        for (var i=0; i<data[1].length; i++) {
            var popupText = `<h1>${data[1][i].buildingname}</h1>`
            //console.log(popupText)
            L.marker( [data[1][i].lat_, data[1][i].long_] ).bindPopup(popupText).addTo(mymap).bindPopup(popupText).addTo(markers)
              }
    });
}
        
getResults();
