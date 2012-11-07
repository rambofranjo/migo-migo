function f_register_action() { 
	
	if (req.data.signed_request) {
		app.addRepository('modules/core/JSON.js');
		var data = root.parse_signed_request(req.data.signed_request, 'e199464f2a798d26602d0d019e2af888');
		var json = data.parseJSON();
		
		var pers = new Person();  
		pers.vorname = json.registration.first_name;
		pers.nachname = json.registration.last_name;
		pers.ort = json.registration.location.name;
		pers.email = json.registration.email; 
		pers.passwort = json.registration.password;
			
		root.person.add(pers);
		session.login(pers); 
		res.redirect(root.href()); 
		
		//res.writeln(data);
	} else {
	
		res.data.title = "MIGO - Management Game Organisation - Gruppe";
		renderSkin("f_register");
	}
}

function parse_signed_request(signed_request, secret) {
	
	encoded_data = signed_request.split('.',2);
    // decode the data
    sig = encoded_data[0];
	data = encoded_data[1];
	//var base64url = new Packages.helma.util.Base64();
	var helper = new Packages.com.mindprod.base64.Base64u();
	var padlength = data.length%4;
    var padded = data.valueOf();
    if (padlength>0){
            for (var i = 0; i<(4-padlength); i++){
                padded += "*"
            }
    } 
    //json = helper.decode(encoded_data[1]);
	var chunk =  helper.decode(padded);
	var corr_data = String(new java.lang.String(chunk));
	
    return corr_data;
}