function main_action () {
	
	// auto login person
	if (req.data.autoLoginName && root.person.get(req.data.autoLoginName)) { 
		var pers = root.person.get(req.data.autoLoginName); 
		var hash = Packages.helma.util.MD5Encoder.encode(pers.email + pers.passwort); 
		if (hash == req.data.autoLoginHash) {
			// session.login -> Anmeldung zur session
			session.login(pers);
		} 
	}
	
	// session.user -> wenn kein Benutzer angemeldet (zur Session), liefert diese Funktion null
	if (session.user != null) { 
		//root.renderGroup();
		res.redirect(root.href("chooseGroup"));
	} else { 
		root.renderMain();
	}
	
	return;
} // main_action() end 


// logout
function logout_action() { 
   session.logout(); 
   res.setCookie("autoLoginName", ""); 
   res.setCookie("autoLoginHash", ""); 
   res.redirect(root.href()); 
}

function href_macro(param) {
  return(this.href(param.action));
}

function allUsers() {
	// alle Benutzer auflisten
	users = "";
	users += "<hr>"; 
	users += "<h2>Users</h2>"; 
	for (var i=0; i < root.person.count(); i++) { 
		users += "<li>" + root.person.get(i).vorname + ' ' + root.person.get(i).nachname; 
	}
	return users;
}


function renderMain() {
		res.data.title = "MIGO - Management Game Organisation";
		res.data.login = renderSkinAsString("login");
		res.data.register = renderSkinAsString("register");
		<!--res.data.registerLink = "<a href=" + root.href("register") + ">Register</a>";-->

		res.data.users = root.allUsers();
		renderSkin("main");
}