var margin2 = {top2: 100, right2: 20, bottom2: 50, left2: 200},
          width2 = 960 - margin2.left2 - margin2.right2,
          height2 = 500 - margin2.top2 - margin2.bottom2;

        var svg2 = d3.select("body").append("svg")
          .attr("width", width2 + margin2.left2 + margin2.right2)
          .attr("height", height2 + margin2.top2 + margin2.bottom2)
          .append("g")
          .attr("transform","translate(" + margin2.left2 + "," + margin2.top2 + ")");
          d3.csv("incident.csv").then(function(data2) {
            console.log(data2);
            data2.forEach(function(d) {
              d.Count = +d.Count;
            });
            let days = data2.map(function(d){return d.Day});
            let count = data2.map(function(d){return d.Count});

            console.log(days)
            console.log(count)

            // the mapping from data to pixel values
            var y2 = d3.scaleBand()
                    .domain(days)
                    .range([height2, 0])
                    .padding(0.2);
            var x2 = d3.scaleLinear()
                    .domain([0, d3.max(count)])
                    .range([0, width2]);

            // append the rectangles for the bar chart
            console.log(data2)
            svg2.selectAll(".bar2")
                .data(data2)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("width", function(d) {return x2(d.Count); })
                .attr("y", function(d) { return y2(d.Day); })
                .attr("height", y2.bandwidth());

            svg2.selectAll("rect")
                .data([[78,121,167], [78,121,167], [78,121,167], [78,121,167], [78,121,167], [78,121,167], [78,121,167], [78,121,167], [78,121,167], [78,121,167]])
                .style("fill", function (d, i) {
                  return "rgb(" + d[0] + ", " + d[1] + ", " + d[2] + ")";
                });


              // gridlines in x axis function
              function make_x_gridlines() {
                  return d3.axisBottom(x2)
                      .ticks(15)
              }

            // add the y Axis
            svg2.append("g")
                .call(d3.axisLeft(y2));

            // add the x Axis
            svg2.append("g")
                .attr("transform", "translate(0," + height2 + ")")
                .call(d3.axisBottom(x2));

            svg2.append("text")
                .attr("font-size", "23px")
                .attr("transform","translate(" + (width2-700) + " ," + (-70) + ")")
                .style("text-anchor", "right")
                .text("Top 10 crime in San Francisco")
            svg2.append("text")
                .attr("transform","translate(" + (width2-870) + " ," + (-20) + ")")
                .style("text-anchor", "front")
                .text("Incident of Category");

            svg2.append("text")
                .attr("transform","translate(" + (width2/2-150) + " ," + (margin2.bottom2+350) + ")")
                .style("text-anchor", "front")
                .text("Count of times");

            // gridlines in x axis function
            function make_x_gridlines() {
                return d3.axisBottom(x2)
                    .ticks(15)
                }
          });
