var margin = {top: 60, right: 20, bottom: 60, left: 200},
          width = 960 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;
      // set the ranges
      var x = d3.scaleBand()
                .range([0, width])
                .padding(0.1);
      var y = d3.scaleLinear()
                .range([height, 0]);
      // append the svg object to the body of the page
      // append a 'group' element to 'svg'
      // moves the 'group' element to the top left margin
      var svg = d3.select("body").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
      // gridlines in y axis function
      function make_y_gridlines() {
          return d3.axisLeft(y)
              .ticks(8)
      }
      // get the data
      d3.csv("book1.csv").then(function(data) {
        console.log(data);
        data.forEach(function(d) {
          d.Count = +d.Count;
        });
        // format the data
        let hours = Array.from(data.keys())
        let count = data.map(function(d){return d.Count})
        console.log(data.map(function(d){return d.Count}))

        // Scale the range of the data in the domains
        x.domain(hours);
        y.domain([0, d3.max(count)]);
        console.log(d3.max(count.map(function(d) { return d.Count; })))
        // append the rectangles for the bar chart
        svg.selectAll(".bar")
          .data(data)
          .enter().append("rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.Hour); })
          .attr("width", x.bandwidth())
          .attr("y", function(d) { return y(d.Count); })
          .attr("height", function(d) { return height - y(d.Count); });

        // add the x Axis
        svg.append("g")
          .attr("transform", "translate(0," + height  + ")")
          .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
          .call(d3.axisLeft(y));

        // add the Y gridlines
        svg.append("g")
            .attr("class", "grid")
            .call(make_y_gridlines()
                .tickSize(-width)
                .tickFormat(""))

        svg.append("text")
          .attr("font-size", "25px")
          .attr("transform","translate(" + (width-600) + " ," + (margin.top-100) + ")")
          .style("text-anchor", "right")
          .text("Larceny Theft Frequency in San Francisco")
      });

      svg.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 150 - margin.left)
         .attr("x",0 - (height / 2))
         .attr("dy", "1em")
         .style("text-anchor", "middle")
         .text("Count of Incident Number");

       svg.append("text")
         .attr("transform","translate(" + (width/2) + " ," + (margin.top-70) + ")")
         .style("text-anchor", "middle")
         .text("Incident Time");
