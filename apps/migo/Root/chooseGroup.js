function chooseGroup_action() { 
	
	//Wenn jemand angemeldet ist
	if (session.user != null) {
	
		//Title
		res.data.title = "MIGO - Management Game Organisation - Gruppe";
	
		//Login Msg
		var login = "";
		login += "Hi " + session.user.vorname + ' ' + session.user.nachname + "!<br />"; 
		login += "<a href=" + root.href("logout") + ">Logout</a>";
		res.data.loginMsg = login;

		//Gruppenanfrage
		res.data.optionGroups = this.allGroups("2");
		if (req.data.inquire != null) res.data.groupInquiry = "Gruppenanfrage zur Gruppe \"" + req.data.inquire + "\" wurde an den Administrator dieser Gruppe weitergeleitet.";
	
		//Eigene Gruppen
		gNames = new Array();
		gNames = this.getOwnGroupName();
		gIDs = new Array();
		gIDs = this.getOwnGroupID();
		gStatus = new Array();
		gStatus = this.getOwnGroupStatus();
		
		var myGroupsTable = "";
		
		myGroupsTable += "<table style='padding:10px; margin:5px; border:1px dashed #CCC; background-color:#FFF;'>";	
		for (var i = 0; i < gNames.length; i++) {
			myGroupsTable += "<tr>";
			if (gStatus[i] != "aktiv") myGroupsTable += "<td style=\"padding:5px;\">" + gNames[i] + "</td>";
			else myGroupsTable += "<td style=\"padding:5px;\"><a href=" + root.href("groupNews") + "?groupId=" + gIDs[i] + ">" + gNames[i] + "</a></td>";
			myGroupsTable += "<td style=\"padding:5px\">" + gStatus[i] + "</td>";
			myGroupsTable += "<td style=\"padding:5px\"><a href=" + root.href("deleteMembership") + "?groupId=" + gIDs[i] + "><img src=\"../static/images/delete.png\" /></a></td>";
			myGroupsTable += "</tr>";
			
		}
		myGroupsTable += "</table>";
		
		res.data.myGroups = myGroupsTable;
		res.data.myGroupsDiv = renderSkinAsString("myGroups");
		
		//Neue Gruppe erstellen
		res.data.newGroup = "<a href=" + root.href("newGroup") +">" + "Neue Gruppe erstellen" + "</a>";

		//Skin rendern
		renderSkin("chooseGroup");
		
	//Benutzer nicht angemeldet, auf Startseite verweisen
	} else {
		res.redirect(root.href(""));
	}
}

function getGroupNameByID (id) {
	var group = root.gruppe.getById(id);
	var name = group.name;
	return name;
}

function getOwnGroupName () {
	var group = "";
	gName = new Array();
	var x = 0;
	
	for (var i = 0; i < root.personGruppe.count(); i++) { 
		if (session.user._id == root.personGruppe.get(i).personID) {
			group = root.gruppe.getById(root.personGruppe.get(i).gruppeID);
			gName[x] = group.name;
			x += 1;
		}
	}
	return gName;
}

function getOwnGroupID () {
	var group = "";
	gID = new Array();
	var x = 0;
	
	for (var i = 0; i < root.personGruppe.count(); i++) { 
		if (session.user._id == root.personGruppe.get(i).personID) {
			group = root.gruppe.getById(root.personGruppe.get(i).gruppeID);
			gID[x] = group._id;
			x += 1;
		}
	}
	return gID;
}

function getOwnGroupStatus() {
	var group = "";
	gStatus = new Array();
	var x = 0;
	
	for (var i = 0; i < root.personGruppe.count(); i++) { 
		if (session.user._id == root.personGruppe.get(i).personID) {
			//group = root.gruppe.getById(root.personGruppe.get(i).gruppeID);
			gStatus[x] = root.personGruppe.get(i).status;
			x += 1;
		}
	}
	return gStatus;
}

function allGroups(option) {
	// alle Gruppen auflisten

	groups = "";

	switch (option) {
	  case "1":
		groups += "<hr>"; 
		groups += "<h2>Gruppen</h2>"; 
		for (var i=0; i < root.gruppe.count(); i++) { 
			groups += "<li>" + root.gruppe.get(i).name;
		}
	    break;
	  case "2":
		for (var i=0; i < root.gruppe.count(); i++) {			
			//Nicht die eigenen Gruppen anzeigen
			if (!(this.isUserInGroup_anyStatus(session.user._id, root.gruppe.get(i)._id))) {
				groups += "<option>" + root.gruppe.get(i).name + "</option>";
			}
		}
	    break;
	}
	
	return groups;
}

function isUserInGroup_anyStatus (uId, gId) {
	for (var i = 0; i < root.personGruppe.count(); i++) {
		if ((gId == root.personGruppe.get(i).gruppeID) && (uId == root.personGruppe.get(i).personID)) {
			return true;
			break;
		}
	}
	return false;
}