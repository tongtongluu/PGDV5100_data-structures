var data;

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
    $.get( '/sensoraverage',parameters, function(d) {

        // When the server returns information, the returned data (hanlebars html) is added to the blogpost DIV.
        // Alternatively, if the server is sending back JSON data, you can use it to create a map or graph etc.
        console.log(d)
        // fs.writeFileSync('/home/ec2-user/environment/week11/try.json', JSON.stringify(d));
        data = d;
        
        filterData(d)
        
        for (var i=0; i<completeData.length; i++) {
            drawGraph(completeData[i])
        }
        
        
    });
}

// put anything you would like to run on pageload inside here
function init(){
    getResults()

}

// call the init function to start
init()
    // set the dimensions and margins of the graph
var margin = {top: 10, right: 10, bottom: 10, left: 10},
    height = 20 - margin.top - margin.bottom;


          
function drawGraph(dataForGraph){

// set the dimensions and margins of the graph
var width = 300
    height = 300
    margin = 40

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = Math.min(width, height) / 4 - margin

// append the svg object to the div called 'my_dataviz'
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("class", "pie-svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// Create dummy data
var data = dataForGraph;

// set the color scale
var color = d3.scaleOrdinal()
  .domain(data)
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"])

// Compute the position of each group on the pie:
var pie = d3.pie()
  .value(function(d) {return d.value; })
var data_ready = pie(d3.entries(data))

// Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
svg
  .selectAll('whatever')
  .data(data_ready)
  .enter()
  .append('path')
  .attr('d', d3.arc()
    .innerRadius(100)         // This is the size of the donut hole
    .outerRadius(radius)
  )
  .attr('fill', function(d){ 
      console.log(d)
      
      
      if (parseFloat(d.value) < 65) {
          return "#f1f9f5";
      }
      else if (parseInt(d.value) >= 65 && parseInt(d.value <67)) {
         return "#d4ede2";
      } 
      else if (parseFloat(d.value) >= 67 && parseFloat(d.value) <69) {
         return "#b7e1ce";
       } 
       else if (d.value >= 69 && d.value <71) {
         return "#9ad6bb"
       } 
       else if (d.value >= 71 && d.value <73) {
           return "#7dcaa7";
       } 
       else if (d.value >= 73 && d.value <75){
          return "#60b194"
       }
        else if (d.value >= 75 && d.value <77){
          return "#47ae80"
       }
        else if (d.value >= 77 && d.value <79){
          return "#3b916a"
       }
        else if (d.value >= 79 && d.value <81){
          return "#325740"
       }
        else if (d.value >= 81 ){
          return "#060e0b"
       }
       })
  .attr("stroke", "white")
  .style("stroke-width", "0.5px")
  .style("opacity", 0.7)

}



var allData = [];
var completeData = [];

function filterData(d) {
    for (var i = 0; i < 30; i++) {
    var day = d.filter(x => {
        if (x.sensorday == i + 1) {
            return x
        }
    })

    allData.push(day)
}

console.log(allData)



allData.forEach(day => {
    var dayObj = {};
    day.forEach(hour => {
        dayObj[hour.sensorhour] = hour.avgtemp
    })
    completeData.push(dayObj)
})

console.log(completeData)


}

