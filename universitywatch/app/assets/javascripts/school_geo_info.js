$(function(){	
	var school_address_array;
	var result = [];
	var School_instance = function() {
		this.lat = '',
		this.lng = ''
	}

	var callingGoogle = function() {
		var dataCount = school_address_array.length;
		console.log('data count: ' + dataCount );
		for(var i = 0; i < 100; i++){
			setTimeout(function(){
					var googleMapAPI = "https://maps.googleapis.com/maps/api/geocode/json?address=" + school_address_array[i].split(' ').join('+') + "&key=AIzaSyCWsphU3w6xkjfqyTx0gYZ3Hb1vxYyFeBQ";
					  $.getJSON( googleMapAPI, {
					    format: "json"
					  })
					    .done(function(data) {
					    	var new_school = new School_instance();
					    	new_school.lat = data.results[0].geometry.location.lat,
					    	new_school.lng = data.results[0].geometry.location.lng
					    	result.push(new_school);
					    	console.log('new_school: ' + new_school);
					    	console.log('result: ' + result);
					    	debugger;
					    	console.log(data);
					    	
					    }).fail(function(error){
					    	console.log('error');
					    })
			}, 1000);
		}
		console.log(result);
	}

	$('.run_data').on('click', function(){
		$.ajax({
			url: '/schools/geo_info'
		}).done(function(response){
			school_address_array = response.school_address_array;
			console.log(response);
			callingGoogle();	
		}).fail(function(error){
			console.log('error');
		});
	});	

});