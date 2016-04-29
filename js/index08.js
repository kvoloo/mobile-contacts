
var app = {
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    
    // Added for fetching mobile device contacts 
    onContactsSuccess: function(contacts) {
   	 $("#debug").html("Found: " + contacts.length);
   	 $("#deviceContacts").empty();
   	 var items = [];
   	 for (var i = 0; i < contacts.length; i++) {
   	 	console.log(contacts[i].displayName);
   	 	console.log(contacts[i].name.formatted);
   	 	if (contacts[i].name.formatted) {
   	 		items.push("<li>" +	contacts[i].name.formatted + "</li>");
   	 	}
   	 }
   	 $("#deviceContacts").append(items);
   	 $("#deviceContacts").listview("refresh");	
   },
   onContactsError: function() {
   	$("#debug").html("Error...");
   },
   // Added for fetching mobile device contacts
    
   
    onDeviceReady: function() {
        app.receivedEvent('deviceready');      
        
     // Added for fetching mobile device contacts (during contacting the device at startup)
        $("#btnFetchContacts").on("click", function(e) {
       	 console.log("button clicked, fetching local contacts");
       	 $("#debug").html("fetching...");
       	 var options  = new ContactFindOptions();
       	 options.multiple = true;
       	 var fields = ["displayName", "name"];
       	 navigator.contacts.find(fields, app.onContactsSuccess, app.onContactsError, options);
    });

    },
    // Update DOM on a Received Event -> elements at mobileInfo page
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
