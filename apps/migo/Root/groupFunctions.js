function isUserInGroupAndAdmin (uId, gId) {
	for (var i = 0; i < root.personGruppe.count(); i++) {
		if ((gId == root.personGruppe.get(i).gruppeID) && (uId == root.personGruppe.get(i).personID)) {
			if (root.personGruppe.get(i).isAdmin == 1) {
				return true;
				break;
			}
		}
	}
	return false;
}

function renderGruppe (mode) {
	
	/* ------------------ */
	//Modus wählen
	
	switch (mode) {
		case "news":
			//News auflisten
			res.data.listNews = root.getAllNews(session.data.grpId);

			//Neue News anlegen
			if (root.isUserInGroupAndAdmin(session.user._id, session.data.grpId)) {
				res.data.newNewsGroup = session.data.grpId;
				res.data.newNews = renderSkinAsString("newNews");
			}
			break;
		case "editNews":
			//News bearbeiten
			res.data.editNews = renderSkinAsString("editNews");
			break;
		case "calendar":
			res.data.calendar = "calendar";
			break;
		case "messages":
			//Nachrichten auflisten
			res.data.listMessages = root.getAllMessages(session.data.grpId);
			
			//Neue Nachricht schreiben
			res.data.newMessage = renderSkinAsString("newMessage");
			break;
	}
	
	
	/* ------------------ */
	//Statusausgeben
	
	//Title
	res.data.title = "MIGO - Management Game Organisation - Gruppe " + root.getGroupNameById(session.data.grpId);

	//Login Msg
	var login = "";
	login += "Hi " + session.user.vorname + ' ' + session.user.nachname + "!<br />"; 
	login += "<a href=" + root.href("logout") + ">Logout</a>";
	res.data.loginMsg = login;
	
	//Gruppenname
	res.data.groupName = root.getGroupNameById(session.data.grpId);
	
	//Link zu Gruppenübersicht
	res.data.allGroups = "<a href=" + root.href("chooseGroup") + ">Zur&uumlck zur Gruppen&uumlbersicht</a>";
	
	
	/* ------------------ */
	//Menu
	res.data.groupId = session.data.grpId;
	res.data.menu = renderSkinAsString("menu");
	
	
	/* ------------------ */
	//Skin rendern
	renderSkin("group");
}