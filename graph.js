d3.csv("http://localhost:3000/incident_category.csv",function(error,csvdata){
				var str = d3.csv.format( csvdata );
				console.log(str.length);
				console.log(str);
			});
