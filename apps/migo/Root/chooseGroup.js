function chooseGroup_action() { 
	
	//Wenn jemand angemeldet ist
	if (session.user != null) {
	
		//Title
		res.data.title = "MIGO - Management Game Organisation - Gruppe";
	
		//Login Msg
		var login = "";
		login += "<div class='logged-in-box'><p>Hallo <strong>" + session.user.vorname + ' ' + session.user.nachname + "</strong>!</p>"; 
		login += "<a href=" + root.href("logout") + ">Abmelden</a></div>";
		res.data.loginMsg = login;

		//Gruppenanfrage
		res.data.optionGroups = this.allGroups("2");
		if (req.data.inquire != null) {
			var inquiry = "<p style='margin:10px 0'>Ihre <strong>Gruppenanfrage</strong> zur Gruppe \"" + req.data.inquire + "\" wurde an den Administrator dieser Gruppe weitergeleitet.<p>";
			inquiry += "<p>Sobald dieser Sie freischaltet, k&ouml;nnen Sie die Gruppe betreten.<p>";
			inquiry += "<script>$(function() {$('#dialog-message').dialog({modal: true});});</script>";
			res.data.groupInquiry = inquiry;
		}
	
		//Eigene Gruppen
		gNames = new Array();
		gNames = this.getOwnGroupName();
		gIDs = new Array();
		gIDs = this.getOwnGroupID();
		gStatus = new Array();
		gStatus = this.getOwnGroupStatus();
		
		var myGroupsTable = "";
		
		myGroupsTable += "<table class='my-groups'>";	
		for (var i = 0; i < gNames.length; i++) {
			myGroupsTable += "<tr>";
			if (gStatus[i] != "aktiv") myGroupsTable += "<td><a class='btn-groups-dis'>" + gNames[i] + "</a></td>";
			else myGroupsTable += "<td class='name'><a class='btn-groups' href=" + root.href("groupNews") + "?groupId=" + gIDs[i] + ">" + gNames[i] + "</a></td>";
			myGroupsTable += "<td class='status'>" + gStatus[i] + "</td>";
			myGroupsTable += "<td class='del'><a href=" + root.href("deleteMembership") + "?groupId=" + gIDs[i] + "><img src=\"../static/images/delete.png\" /></a></td>";
			myGroupsTable += "</tr>";
			
		}
		myGroupsTable += "</table>";
		
		//Noch bei keiner Gruppe?
		if (gNames.length == 0) {
			myGroupsTable = "<p class='no-group'>Sie befinden Sich noch in keiner Gruppe. Sie k&ouml;nnen entweder eine <strong>Neue Gruppe</strong> erstellen, oder einer bereits bestehenen Gruppe <strong>beitreten</strong>.</p>";
			myGroupsTable += "<p class='no-group'>Falls Sie einer bestehen Gruppe beitreten wollen, muss diese Gruppe Ihren Beitritt akzeptieren.</p>";
		}
		
		res.data.myGroups = myGroupsTable;
		res.data.myGroupsDiv = renderSkinAsString("myGroups");
		
		//Neue Gruppe erstellen
		res.data.newGroup = "<a class='btn-exp' href=" + root.href("newGroup") +">" + "Neue Gruppe erstellen" + "</a>";

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