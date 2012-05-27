function newGroup_action() {
	
	//Wenn jemand angemeldet ist
	if (session.user != null) {
	
		var error = ""; 
		var okmsg = "";
		var farbe = "#123456"
	
		if (req.data.newGroup) {
		
			//Werte aus dem Formular holen
			var name = req.data.name;
			var sportart = req.data.sportart;
			farbe = req.data.farbe;
			var logo = req.data.logo; 
		
			//Überprüfen
			if ((root.gruppe.get(name) == null) && (name != "") && (sportart != "") && (farbe != "")) { 
			
				//Neue Gruppe erstellen
				var grp = new Gruppe(); 
				grp.name = name;
				grp.sportart = sportart;
				grp.farbe = farbe;
				grp.logo = logo;
				grp.sichtbar = "1";	
				root.gruppe.add(grp);
				
				//User als admin in diese Gruppe eintragen und Gründer
				var pgrp = new PersonGruppe();
				pgrp.gruppeID = this.getGroupIdByName(name);
				pgrp.personID = session.user._id;
				pgrp.isAdmin = 1;
				pgrp.status = "aktiv";
				pgrp.gruender = 1;
				root.personGruppe.add(pgrp);
				
				//Zur Gruppenauswahl weiterleiten
				//res.redirect(root.href("chooseGroup"));
				
				okmsg = "Ihre Gruppe wurde erfolgreich erstellt"
				
				
			} else {
				error = "Es ist ein Fehler aufgetreten";
				res.data.newGroupName = name;
				res.data.newGroupSportart = sportart;
				res.data.newGroupFarbe = farbe;
				res.data.newGroupLogo = logo;
			}
		} 

		res.data.title = "MIGO - Management Game Organisation - New Group";
		//errorNewGroup in newGroupForm
		res.data.errorNewGroup = error;
		res.data.okNewGroup = okmsg;
		//newGroupForm in newGroup
		res.data.newGroupFarbe = farbe;
		res.data.newGroupForm = renderSkinAsString("newGroupForm");	
		
		//Login Msg
		var login = "";
		login += "<div class='logged-in-box'><p>Hallo <strong>" + session.user.vorname + ' ' + session.user.nachname + "</strong>!</p>"; 
		login += "<a href=" + root.href("logout") + ">Abmelden</a></div>";
		res.data.loginMsg = login;
		
		renderSkin("newGroup");
		
	//Benutzer nicht angemeldet, auf Startseite verweisen
	} else {
		res.redirect(root.href(""));
	}
}

function getGroupIdByName (name) {
	var gName = root.gruppe.get(name);
	var gName = gName._id;
	return gName;
}