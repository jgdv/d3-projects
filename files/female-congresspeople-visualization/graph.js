window.onload = function() {
  // Source: https://bl.ocks.org/alandunning/cfb7dcd7951826b9eacd54f0647f48d3

  var svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

  var parseTime = d3.timeParse("%Y")
      bisectDate = d3.bisector(function(d) { return d.year; }).left;

  var x = d3.scaleTime().range([0, width]);
  var y = d3.scaleLinear().range([height, 0]);


  var line = d3.line()
      .x(function(d) { return x(d.year); })
      .y(function(d) { return y(d.value); });

  var g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Draw the initial graph
  d3.json("data.json", function(error, data) {
    if (error) throw error;

    // parse the data
    data.forEach(function(d) {
      d.year = parseTime(d.year);
      d.value = +d.value;
    });

    // Adjust the axes based on the data
    x.domain(d3.extent(data, function(d) { return d.year; }));
    y.domain([d3.min(data, function(d) { return d.value; }) / 1.005, d3.max(data, function(d) { return d.value; }) * 1.005]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(6).tickFormat(function(d) { return parseInt(d); }))
      .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .attr("fill", "#5D6971")
        .text("Congresspeople");

    g.append("path")
        .datum(data)
        .attr("class", "line")
        .attr("d", line)
        .attr("stroke", function() {
          return "#6F257F";
        });

    // Add tooltips visible on mouseover
    var focus = g.append("g")
        .attr("class", "focus")
        .style("display", "none");

    focus.append("circle")
        .attr("r", 7.5);

    focus.append("text")
        .attr("x", "-.75em")
      	.attr("dy", "-.65em");

    svg.append("rect")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .attr("class", "overlay")
        .attr("width", width)
        .attr("height", height)
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
      var x0 = x.invert(d3.mouse(this)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.year > d1.year - x0 ? d1 : d0;
      focus.attr("transform", "translate(" + x(d.year) + "," + y(d.value) + ")");
      focus.select("text").text(function() { return d.value; });
      focus.select(".x-hover-line").attr("y2", height - y(d.value));
      focus.select(".y-hover-line").attr("x2", width + width);
    }
  });

  // Event listeners for buttons
  $("#total").on("click", function() {updateData("num");});
  $("#sen").on("click", function() {updateData("sen");});
  $("#rep").on("click", function() {updateData("rep");});

  // Source: http://bl.ocks.org/d3noob/7030f35b72de721622b8
  // Update the graph dynamically
  function updateData(lineName) {
    // Get the data again
    d3.json("data.json", function(error, data) {
      data.forEach(function(d) {
        d.year = parseTime(d.year);
        if (lineName === "num") {
          d.value = +d.value;
        } else if (lineName === "rep") {
          d.value = +d.rep;
        } else if (lineName === "sen") {
          d.value = +d.sen;
        }
      });

      function mousemove() {
        var x0 = x.invert(d3.mouse(this)[0]),
            i = bisectDate(data, x0, 1),
            d0 = data[i - 1],
            d1 = data[i],
            focus = d3.select(".focus"),
            d = x0 - d0.year > d1.year - x0 ? d1 : d0;

        focus.attr("transform", "translate(" + x(d.year) + "," + y(d.value) + ")");
        focus.select("text").text(function() { return d.value; });
        focus.select(".x-hover-line").attr("y2", height - y(d.value));
        focus.select(".y-hover-line").attr("x2", width + width);
      }

      // Scale the range of the data again 
      x.domain(d3.extent(data, function(d) { return d.year; }));
      y.domain([0, d3.max(data, function(d) { return d.value; })]);

      // Select the section we want to apply our changes to
      var svg = d3.select("svg").transition();

      // Make the changes
      svg.select(".line")   // change the line
          .duration(750)
          .attr("d", line(data))
          .attr("stroke", function() {
            if (lineName === "num") {
              return "#6F257F";
            } else if (lineName === "rep") {
              return "red";
            } else if (lineName === "sen") {
              return "yellow";
            }
          });;
      svg.select(".axis--x") // change the x axis
          .duration(750)
          .call(d3.axisBottom(x));
      svg.select(".axis--y") // change the y axis
          .duration(750)
          .call(d3.axisLeft(y));

      d3.select("rect")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
          .attr("class", "overlay")
          .attr("width", width)
          .attr("height", height)
          .on("mouseover", function() { d3.select(".focus").style("display", null); })
          .on("mouseout", function() { d3.select(".focus").style("display", "none"); })
          .on("mousemove", mousemove);
    });
  }
}