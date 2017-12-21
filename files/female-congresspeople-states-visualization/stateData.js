// Source: http://bl.ocks.org/NPashaP/a74faf20b492ad377312
window.onload = function() {
  function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
  	return "<h4>"+n+"</h4><table>"+
	  "<tr><td>Congresspeople: </td><td>"+(d.total)+"</td></tr>"+
      "<tr><td>Representatives: </td><td>"+(d.rep)+"</td></tr>"+
	  "<tr><td>Senators: </td><td>"+(d.sen)+"</td></tr>"+
	  "</table>";
  }

  /*var sampleData ={};	 Sample random data. 	
  ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
  "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
  "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
  "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
  "WI", "MO", "AR", "OK", "KS", "LS", "VA"] // Challenge: Convert all this to records of women in congress over time - json file? Probably...
    .forEach(function(d){ 
      /*var low=Math.round(100*Math.random()), 
          mid=Math.round(100*Math.random()), 
          high=Math.round(100*Math.random());
      
      sampleData[d]={low:d3.min([low,mid,high]), high:d3.max([low,mid,high]), 
          avg:Math.round((low+mid+high)/3), color:d3.interpolate("#ffffcc", "#800026")(low/100)}; 
    });*/

  /* draw states on id #statesvg */	
  // Interesting how the data is pre-set: map each state to an object with some fields (will need to be changed in usStates.js)
  // and a color that'll be like the one already there but slightly modified to be different shades of blue or purple or green - green!

  /*var slider = svg.append("g")
    .attr("class", "slider")
    .attr("transform", "translate(" + margin.left + "," + height / 2 + ")");*/


  d3.json("stateRecords.json", function(error, data) {
  	if (error) throw error;

  	// Start with the first record as an initial setting:
  	var init = data[1917];
  	//init.forEach(function(d) {
  	//	console.log(d);
  	//});

  	//console.log(init);
  	var sampleData = {};  
  	["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
  	"ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
  	"MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
  	"CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
  	"WI", "MO", "AR", "OK", "KS", "LS", "VA"] // Challenge: Convert all this to records of women in congress over time - json file? Probably...
    .forEach(function(d){
  	  // Program the key-data info into the map
  	  if (init[d]) {
  	  	sampleData[d] = {total : init[d]["value"], rep : init[d]["rep"].length, sen : init[d]["sen"].length, color : d3.interpolate("#00f0ff", "#000000")((init[d]["value"])/25)};
  	  } else {
  	  	sampleData[d] = {total : 0, rep : 0, sen : 0, color : "#ffffff"};
  	  }
  	});
  	uStates.draw("#statesvg", sampleData, tooltipHtml);

  	$( function() {
	  var handle = $( "#custom-handle" );
	  $( "#slider" ).slider({
        min: 1917,
        max: 2017,
        step: 2,
        create: function() {
          handle.text( $( this ).slider( "value" ) );
        },
        slide: function(event, ui) {
          handle.text(ui.value); // This is where I should be doing the change
          $("#statesvg").empty();
          init = data[ui.value];
          console.log(init);
  		  ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
  	      "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
  	      "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
  	      "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
  	      "WI", "MO", "AR", "OK", "KS", "LS", "VA"] // Challenge: Convert all this to records of women in congress over time - json file? Probably...
          .forEach(function(d){
  	        // Program the key-data info into the map
  	        if (init[d]) {
  	          sampleData[d] = {total : init[d]["value"], rep : init[d]["rep"].length, sen : init[d]["sen"].length, color : d3.interpolate("#00f0ff", "#000000")((init[d]["value"])/25)};
  	        } else {
  	      	  sampleData[d] = {total : 0, rep : 0, sen : 0, color : "#ffffff"};
  	        }
  	      });
  	      uStates.draw("#statesvg", sampleData, tooltipHtml);
  		  d3.select(self.frameElement).style("height", "600px"); 
        },
        change: function(event, ui) {
          console.log(ui.value); //ui.value is the year I should reference
        }
      });
    });
  });

  //uStates.draw("#statesvg", sampleData, tooltipHtml);

  d3.select(self.frameElement).style("height", "600px"); 
}