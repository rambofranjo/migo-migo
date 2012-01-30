function isUserInGroupAndAdmin (uId, gId) {
	for (var i = 0; i < root.personGruppe.count(); i++) {
		if ((gId == root.personGruppe.get(i).gruppeID) && (uId == root.personGruppe.get(i).personID) && (root.personGruppe.get(i).status == "aktiv")) {
			if (root.personGruppe.get(i).isAdmin == 1) {
				return true;
				break;
			}
		}
	}
	return false;
}

function isUserInGroup (uId, gId) {
	for (var i = 0; i < root.personGruppe.count(); i++) {
		if ((gId == root.personGruppe.get(i).gruppeID) && (uId == root.personGruppe.get(i).personID) && (root.personGruppe.get(i).status == "aktiv")) {
			return true;
			break;
		}
	}
	return false;
}

function renderGruppe (mode) {
	
	/* ------------------ */
	//Modus wählen
	
	switch (mode) {
		case "news":
			//Neue News anlegen
			if (root.isUserInGroupAndAdmin(session.user._id, session.data.grpId)) {
				res.data.newNewsGroup = session.data.grpId;
				res.data.dispNews = res.data.dispNews = "none";
				res.data.newNews = renderSkinAsString("newNews");
			}
			//News auflisten
			res.data.listNews = root.getAllNews(session.data.grpId);
			break;
		case "newsError":
			//Neue News anlegen
			if (root.isUserInGroupAndAdmin(session.user._id, session.data.grpId)) {
				res.data.newNewsGroup = session.data.grpId;
				res.data.dispNews = res.data.dispNews = "block";
				res.data.newNews = renderSkinAsString("newNews");
			}
			//News auflisten
			res.data.listNews = root.getAllNews(session.data.grpId);
		break;
		case "editNews":
			//News bearbeiten
			res.data.editNews = renderSkinAsString("editNews");
			break;
		case "calendar":
			res.data.calendar = "calendar";
			break;
		case "messages":
			//Alle Mitglieder der Gruppe auflisten
			res.data.names = root.getAllGroupMembers(session.data.grpId);
			
			//Nachrichten auflisten
			res.data.listMessages = root.getAllMessages(session.data.grpId);
			
			//Neue Nachricht schreiben
			res.data.dispMessages = res.data.dispMessages = "none";
			res.data.newMessage = renderSkinAsString("newMessage");
			break;
		case "messagesError":
			//Alle Mitglieder der Gruppe auflisten
			res.data.names = root.getAllGroupMembers(session.data.grpId);

			//Nachrichten auflisten
			res.data.listMessages = root.getAllMessages(session.data.grpId);

			//Neue Nachricht schreiben
			res.data.dispMessages = res.data.dispMessages = "block";
			res.data.newMessage = renderSkinAsString("newMessage");
			break;
		case "users":
			//Alle User auflisten
			res.data.showUsers = root.getAllUsers(session.data.grpId);
		
			//Alle Gruppenanfragen auflisten
			if (root.isUserInGroupAndAdmin(session.user._id, session.data.grpId)) {
				res.data.showInquiry = root.getAllInquiries(session.data.grpId);
			}
		
			//Users rendern
			res.data.listUsers = renderSkinAsString("users");
			break;
		case "group":
			res.data.grpName = root.getGroupName(session.data.grpId);
			res.data.grpSports = root.getGroupSports(session.data.grpId);
			res.data.grpColor = root.getGroupColor(session.data.grpId);
			res.data.grpLogo = root.getGroupLogo(session.data.grpId);
			res.data.grpsichtbar
			res.data.groupInfo = renderSkinAsString("groupInfo");
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
	if (this.isUserInGroupAndAdmin(session.user._id, session.data.grpId)) {
		res.data.menuPointGroup = "<li style=\"display:inline; margin-right: 10px;\" ><a href=\"groupGroup?groupId=" + session.data.grpId + "\">Gruppe</a></li>";
	} else res.data.menuPointGroup = "";
	res.data.menu = renderSkinAsString("menu");
	
	
	/* ------------------ */
	//Skin rendern
	renderSkin("group");
}