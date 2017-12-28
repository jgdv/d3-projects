// Source: http://bl.ocks.org/NPashaP/a74faf20b492ad377312
window.onload = function() {
  $("#all").css("background-color", "#3e8e41");
  var display = "total";
  function tooltipHtml(n, d){	/* function to create html content string in tooltip div. */
  	return "<h4>"+n+"</h4><table>"+
	  (display == "total" ? ("<tr><td>Congresspeople: </td><td>"+d.total+"</td></tr>") : "")+
      (display != "sen" ? ("<tr><td>Representatives: </td><td>"+(d.rep)+"</td></tr>") : "")+
	  (display != "rep" ? ("<tr><td>Senators: </td><td>"+(d.sen)+"</td></tr>") : "")+
	  "</table>";
  }

  d3.json("stateRecords.json", function(error, data) {
  	if (error) throw error;

  	// Start with the first record as an initial setting:
  	var init = data[1917];

  	//console.log(init);
  	var sampleData = {};  
  	["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
  	"ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
  	"MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
  	"CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
  	"WI", "MO", "AR", "OK", "KS", "LS", "VA"]
    .forEach(function(d){
  	  // Program the key-data info into the map
  	  var colorScale = 0;
  	  if (init[d]) {
  	  	var colorScale = (display == "total" ? d3.interpolate("#00f0ff", "#000000")((init[d]["value"]) / 25) : (display == "sen" ? d3.interpolate("#ffffff", "#ffff44")((init[d]["sen"].length) / 2) : d3.interpolate("#00f0ff", "#000000")((init[d]["rep"].length) / 25)));
  	  }
  	  if (colorScale !== 0 && colorScale != "#00f0ff") {
  	  	sampleData[d] = {total : init[d]["value"], rep : init[d]["rep"].length, sen : init[d]["sen"].length, color : colorScale, repNames : init[d]["rep"], senNames : init[d]["sen"]};
  	  } else {
  	  	sampleData[d] = {total : 0, rep : 0, sen : 0, color : "#ffffff"};
  	  }
  	});
  	uStates.draw("#statesvg", sampleData, tooltipHtml, display);

  	$("#all").on("click", function() {
  	  $("#all").css("background-color", "#3e8e41");
  	  $("#sen").css("background-color", "#4CAF50");
  	  $("#rep").css("background-color", "#4CAF50");
	  $("#senTable").css("visibility", "hidden");
	  $("#repTable").css("visibility", "hidden");
  	  display = "total";
  	  $("#statesvg").empty();
      init = data[parseInt($("#slider")[0].innerText)];
  	  ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
  	  "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
  	  "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
  	  "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
  	  "WI", "MO", "AR", "OK", "KS", "LA", "VA"] // Challenge: Convert all this to records of women in congress over time - json file? Probably...
      .forEach(function(d){
  	    // Program the key-data info into the map  	  
  	    var colorScale = 0;
  	    if (init[d]) {
  	      sampleData[d] = {total : init[d]["value"], test : "hi", rep : init[d]["rep"].length, sen : init[d]["sen"].length, color : d3.interpolate("#00f0ff", "#000000")((init[d]["value"]) / 25), repNames : init[d]["rep"], senNames : init[d]["sen"]};
  	    } else {
  	      sampleData[d] = {total : 0, rep : 0, sen : 0, color : "#ffffff"};
  	    }
  	  });
  	  uStates.draw("#statesvg", sampleData, tooltipHtml, display);
  	});

  	$("#sen").on("click", function() {
  	  $("#sen").css("background-color", "#3e8e41");
  	  $("#all").css("background-color", "#4CAF50");
  	  $("#rep").css("background-color", "#4CAF50");
	  $("#senTable").css("visibility", "hidden");
	  $("#repTable").css("visibility", "hidden");
  	  display = "sen";
  	  $("#statesvg").empty();
      init = data[parseInt($("#slider")[0].innerText)];
  	  ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
  	  "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
  	  "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
  	  "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
  	  "WI", "MO", "AR", "OK", "KS", "LA", "VA"] // Challenge: Convert all this to records of women in congress over time - json file? Probably...
      .forEach(function(d){
  	    // Program the key-data info into the map
  	    var colorScale = 0;
  	    if (init[d]) { 
  	      colorScale = d3.interpolate("#ffffff", "#ffff44")((init[d]["sen"].length) / 2);
  	  	}
  	    if (colorScale != 0) {
  	      sampleData[d] = {total : init[d]["value"], test : "hi", rep : init[d]["rep"].length, sen : init[d]["sen"].length, color : colorScale, repNames : init[d]["rep"], senNames : init[d]["sen"]};
  	    } else {
  	      sampleData[d] = {total : 0, rep : 0, sen : 0, color : "#ffffff"};
  	    }
  	  });
  	  uStates.draw("#statesvg", sampleData, tooltipHtml, display);
  	});

  	$("#rep").on("click", function() {
  	  $("#rep").css("background-color", "#3e8e41");
  	  $("#sen").css("background-color", "#4CAF50");
  	  $("#all").css("background-color", "#4CAF50");
	  $("#senTable").css("visibility", "hidden");
	  $("#repTable").css("visibility", "hidden");
  	  display = "rep";
  	  $("#statesvg").empty();
      init = data[parseInt($("#slider")[0].innerText)];
  	  ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
  	  "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
  	  "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
  	  "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
  	  "WI", "MO", "AR", "OK", "KS", "LA", "VA"] // Challenge: Convert all this to records of women in congress over time - json file? Probably...
      .forEach(function(d){
  	    // Program the key-data info into the map 
  	    var colorScale = 0;
  	    if (init[d]) { 	  
  	      colorScale = d3.interpolate("#00f0ff", "#000000")((init[d]["rep"].length) / 25);
  	    }
  	    if (colorScale != 0 && colorScale != "#00f0ff") {
  	      sampleData[d] = {total : init[d]["value"], test : "hi", rep : init[d]["rep"].length, sen : init[d]["sen"].length, color : colorScale, repNames : init[d]["rep"], senNames : init[d]["sen"]};
  	    } else {
  	      sampleData[d] = {total : 0, rep : 0, sen : 0, color : "#ffffff"};
  	    }
  	  });
  	  uStates.draw("#statesvg", sampleData, tooltipHtml, display);
  	});

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
          $("#senTable").css("visibility", "hidden");
		  $("#repTable").css("visibility", "hidden");
          handle.text(ui.value);
          $("#statesvg").empty();
          init = data[ui.value];
  		  ["HI", "AK", "FL", "SC", "GA", "AL", "NC", "TN", "RI", "CT", "MA",
  	      "ME", "NH", "VT", "NY", "NJ", "PA", "DE", "MD", "WV", "KY", "OH", 
  	      "MI", "WY", "MT", "ID", "WA", "DC", "TX", "CA", "AZ", "NV", "UT", 
  	      "CO", "NM", "OR", "ND", "SD", "NE", "IA", "MS", "IN", "IL", "MN", 
  	      "WI", "MO", "AR", "OK", "KS", "LA", "VA"] // Challenge: Convert all this to records of women in congress over time - json file? Probably...
          .forEach(function(d){
  	        // Program the key-data info into the map  	  
  	        var colorScale = 0;
  	 		if (init[d]) {
  	  		  var colorScale = (display == "total" ? d3.interpolate("#00f0ff", "#000000")((init[d]["value"]) / 25) : (display == "sen" ? d3.interpolate("#ffffff", "#ffff44")((init[d]["sen"].length) / 2) : d3.interpolate("#00f0ff", "#000000")((init[d]["rep"].length) / 25)));
  	  		}
  	        if (colorScale != 0 && colorScale != "#00f0ff") {
  	          sampleData[d] = {total : init[d]["value"], test : "hi", rep : init[d]["rep"].length, sen : init[d]["sen"].length, color : colorScale, repNames : init[d]["rep"], senNames : init[d]["sen"]};
  	        } else {
  	      	  sampleData[d] = {total : 0, rep : 0, sen : 0, color : "#ffffff"};
  	        }
  	      });
  	      uStates.draw("#statesvg", sampleData, tooltipHtml, display);
  		  d3.select(self.frameElement).style("height", "600px"); 
        }
      });
    });
  });

  //uStates.draw("#statesvg", sampleData, tooltipHtml);

  d3.select(self.frameElement).style("height", "600px"); 
}