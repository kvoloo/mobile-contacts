$(document).ready(function(){

	$('#remote').on('pageshow', function(event,ui){
		$.getJSON("http://localhost:8080/catalog/service/contacts", function(data) {     
			$("#remoteContactList").empty();     
			var items = [];     
			$.each(data, function(key, val) {
				console.log("item: " + key + " " + val.name);
				items.push("<div data-role='collapsible'><h4>"+ val.name +"</h4><p>"+ val.phone +"<br/>"+ val.email +"</p></div>");     
			});     
			$("#remoteContactList").append(items);     
			$("#remoteContactList").collapsibleset("refresh"); 
		});		
	});  
	
	$('#addContact').on('pageinit', function(){ 
	    $(document).on('click', '#submitContact', function() { 
	        if($('#id').val().length > 0 && $('#name').val().length > 0 && $('#phone').val().length > 0 && $('#email').val().length > 0){
	                $.ajax({url: 'http://localhost:8080/catalog/service/contacts',
	                    data: $('#contactForm').serialize(),
	                    type: 'POST',  
	                    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	                    dataType: 'text',
	                    beforeSend: function() {
	                        $.mobile.loading('show');
	                    },
	                    complete: function() {
	                        $.mobile.loading('hide'); 
	                    },
	                    success: function (result) {
	                        $.mobile.changePage("#remote"); 
	                    },
	                    error: function (request,error) {               
	                        alert('Network error');
	                    }
	                });                  
	        } else {
	            alert('Please fill all necessary fields!');
	        }          
	        return false; // cancel original event to prevent form submitting
	    });   
	}); 
});