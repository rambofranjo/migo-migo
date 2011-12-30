function newGroup_action() {
	
	//Wenn jemand angemeldet ist
	if (session.user != null) {
	
		var error = ""; 
	
		if (req.data.newGroup) {
		
			//Werte aus dem Formular holen
			var name = req.data.name;
			var sportart = req.data.sportart;
			var farbe = req.data.farbe;
			var logo = req.data.logo; 
		
			//Überprüfen, ob Gruppenname bereits vergeben ist
			if (root.gruppe.get(name) == null) { 
			
				//Neue Gruppe erstellen
				var grp = new Gruppe(); 
				grp.name = name;
				grp.sportart = sportart;
				grp.farbe = farbe;
				grp.logo = logo;
				grp.sichtbar = "1";	
				root.gruppe.add(grp);
				
				//User als admin in diese Gruppe eintragen
				var pgrp = new PersonGruppe();
				pgrp.gruppeID = this.getGroupIdByName(name);
				pgrp.personID = session.user._id;
				pgrp.isAdmin = 1;
				pgrp.status = "angefragt";
				root.personGruppe.add(pgrp);
				
				//Zur Gruppenauswahl weiterleiten
				res.redirect(root.href("chooseGroup"));
				
			} else {
				error = "Es ist ein Fehler aufgetreten, Gruppenname bereits vergeben";
				res.data.newGroupName = name;
				res.data.newGroupSportart = sportart;
				res.data.newGroupFarbe = farbe;
				res.data.newGroupLogo = logo;
			}
		} 

		res.data.title = "MIGO - Management Game Organisation - New Group";
		//errorNewGroup in newGroupForm
		res.data.errorNewGroup = error;
		//newGroupForm in newGroup
		res.data.newGroupForm = renderSkinAsString("newGroupForm");	
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