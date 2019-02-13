d3.csv("/incident_category.csv",function(error,csvdata){
				var str = d3.csv.format( csvdata );
				console.log(str.length);
				console.log(str);
			});
