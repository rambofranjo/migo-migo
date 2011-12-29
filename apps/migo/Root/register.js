function register_action() { 
	if (req.data.register) {
		var error = "";
		
		var vname = req.data.vorname;
		var nname = req.data.nachname;
		var ort = req.data.ort;
		var email = req.data.email; 
		var pass = req.data.password;
		var passwh = req.data.passwordWh;
	
		if ((root.person.get(email) == null) && (pass == passwh) && (vname != "") && (nname != "") && (ort != "") && (email != "") && (pass != "")) { 
			var pers = new Person();  
			pers.vorname = vname;
			pers.nachname = nname;
			pers.ort = ort;
			pers.email = email; 
			pers.passwort = pass;
				
			root.person.add(pers); 
			//session.login(pers); 
			res.redirect(root.href()); 
		} else {
			error = "Registration failed!";
			res.data.registerVorname = vname;
			res.data.registerNachname = nname;
			res.data.registerOrt = ort;
			res.data.registerEmail = email;
		}
	} 

	res.data.title = "MIGO - Management Game Organisation - Register";
	res.data.users = root.allUsers();
	res.data.errorRegister = error;
	res.data.register = renderSkinAsString("register");	
	renderSkin("main");
}