function login_action() { 
	if (req.data.login) {
		// Email und Passwort aus der login Form 
		var email = req.data.email; 
		var pass = req.data.password; 
		var error = "";

		// Um email zu nutzen, muss accessname in type.properties in root gesetzt werden
		var user = root.person.get(email);
		
		if (user && user.passwort == pass) { 
			session.login(user); 
			
			if (req.data.remember) { 
				var hash = Packages.helma.util.MD5Encoder.encode(email + pass); 
				res.setCookie("autoLoginName", email, 30); 
				res.setCookie("autoLoginHash", hash, 30); 
			} 
			res.redirect(root.href()); 
		} else { 
			error = "Login failed!"; 
		} 
	}
	
	res.data.title = "MIGO - Management Game Organisation - Login";
	res.data.users = root.allUsers();
	res.data.errorLogin = error;
	res.data.errorRegister = error; 
	res.data.login = renderSkinAsString("login");
	res.data.register = renderSkinAsString("register");
	renderSkin("main");
}