function group_action() { 
	
	//Wenn jemand angemeldet ist
	if ((session.user != null) && (req.data.groupId) && root.gruppe.getById(req.data.groupId)) {
		
		var gId = req.data.groupId;
		
		//Alle User dieser Gruppe holen
		users = new Array();
		users = this.getUsersIdByGroupId(gId);
		
		var inGroup = "false";
		
		//Prüfen, ob dieser User auch in dieser Gruppe ist
		for (var i = 0; i < users.length; i++) {
			if (session.user._id == users[i]) {
				//Person ist in Gruppe
				inGroup = "true";
			}
		}
		
		if (inGroup == "true") {
			
			//Title
			res.data.title = "MIGO - Management Game Organisation - Gruppe " + this.getGroupNameById(gId);

			//Login Msg
			var login = "";
			login += "Hi " + session.user.vorname + ' ' + session.user.nachname + "!<br />"; 
			login += "<a href=" + root.href("logout") + ">Logout</a>";
			res.data.loginMsg = login;
			
			//Gruppenname
			res.data.groupName = this.getGroupNameById(gId);
			
			//Skin rendern
			renderSkin("group");
			
		} else {
			res.redirect(root.href(""));
		}
		
	//Benutzer nicht angemeldet, auf Startseite verweisen
	} else {
		res.redirect(root.href(""));
	}
}

function getGroupNameById (id) {
	return root.gruppe.getById(id).name;
} 

function getUsersIdByGroupId (id) {
	uId = new Array();
	var x = 0;
	
	for (var i = 0; i < root.personGruppe.count(); i++) { 
		if (id == root.personGruppe.get(i).gruppeID) {
			uId[x] = root.personGruppe.get(i).personID;
			x += 1;
		}
	}
	return uId;
} 