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
		case "appointment": 
		 if (root.isUserInGroupAndAdmin(session.user._id, session.data.grpId)) {
			res.data.dispAppointment = "none";
			res.data.newAppointment = renderSkinAsString("newAppointment");
		 }
		 
			//alle Appointments auflisten
			res.data.listAppointments = root.getAllAppointments(session.data.grpId);
			
			// appointments rendern
			res.data.allAppointments = renderSkinAsString("allAppointments");
			break;
			
		case "appointmentError": 
		  if (root.isUserInGroupAndAdmin(session.user._id, session.data.grpId)) {
			res.data.dispAppointment = "block";
			res.data.newAppointment = renderSkinAsString("newAppointment");
		  }
			//alle Appointments auflisten
			res.data.listAppointments = root.getAllAppointments(session.data.grpId);
			
			break;
			
		case "editAppointment":
			//Appointment bearbeiten
			res.data.editAppointment = renderSkinAsString("editAppointment");
			break;
		
		case "news":
			//Neue News anlegen
			if (root.isUserInGroupAndAdmin(session.user._id, session.data.grpId)) {
				res.data.newNewsGroup = session.data.grpId;
				res.data.dispNews = "none";
				res.data.newNews = renderSkinAsString("newNews");
			}
			//News auflisten
			res.data.listNews = root.getAllNews(session.data.grpId);
			
			//News rendern
			res.data.allNews = renderSkinAsString("allNews");
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
			
			//News rendern
			res.data.allNews = renderSkinAsString("allNews");
		break;
		case "editNews":
			//News bearbeiten
			res.data.editNews = renderSkinAsString("editNews");
			//Rendern
			res.data.allNews = renderSkinAsString("allNews");
			break;
		case "calendar":
			// take all group-events and show it in calendar 
			res.data.calendar = "calendar";
			res.data.calevents = root.getAllEvents(session.data.grpId);
			
			
			break;
		case "messages":
			//Alle Mitglieder der Gruppe auflisten
			res.data.names = root.getAllGroupMembers(session.data.grpId);
			
			//Nachrichten auflisten
			res.data.listMessages = root.getAllMessages(session.data.grpId);
			
			//Neue Nachricht schreiben
			res.data.dispMessages = res.data.dispMessages = "none";
			res.data.newMessage = renderSkinAsString("newMessage");
			
			res.data.allMessages = renderSkinAsString("allMessages");
			break;
		case "messagesError":
			//Alle Mitglieder der Gruppe auflisten
			res.data.names = root.getAllGroupMembers(session.data.grpId);

			//Nachrichten auflisten
			res.data.listMessages = root.getAllMessages(session.data.grpId);

			//Neue Nachricht schreiben
			res.data.dispMessages = res.data.dispMessages = "block";
			res.data.newMessage = renderSkinAsString("newMessage");
			
			res.data.allMessages = renderSkinAsString("allMessages");
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
			var group = root.getGroupInfo(session.data.grpId);
			res.data.grpName = group.name;
			res.data.grpSports = group.sportart;
			res.data.grpColor = group.farbe;
			res.data.grpLogo = group.logo;
			if (!group.sichtbar) res.data.grpVisible = "";
			if (group.sichtbar) res.data.grpVisible = "checked = \"checked\"";
			//Render Informations
			res.data.groupInfo = renderSkinAsString("groupInfo");
			break;
	}
	
	/* ------------------ */
	//Statusausgeben
	
	//Title
	res.data.title = "MIGO - Management Game Organisation - Gruppe " + root.getGroupNameById(session.data.grpId);

	//Login Msg
	var login = "<div class='logged-in-box left' style='width:100%'>";
	login += "<p>Hallo <strong>" + session.user.vorname + ' ' + session.user.nachname + "</strong>!</p>"; 
	login += "<a href=" + root.href("logout") + ">Abmelden</a>";
	login += "</div>";
	res.data.loginMsg = login;
	
	var groupInfo = root.getGroupInfo(session.data.grpId);
	
	//Gruppenname
	res.data.groupName = "<h4 class='left' style='color:"+groupInfo.farbe+"'>" + root.getGroupNameById(session.data.grpId) + "</h4>";
	
	//Link zu Gruppenübersicht
	res.data.allGroups = "<a style='text-decoration:none' href=" + root.href("chooseGroup") + ">Zur&uumlck zur Gruppen&uumlbersicht</a>";
	
	
	/* ------------------ */
	//Menu
	res.data.groupId = session.data.grpId;
	if (this.isUserInGroupAndAdmin(session.user._id, session.data.grpId)) {
		res.data.menuPointGroup = "<li><a href=\"groupGroup?groupId=" + session.data.grpId + "\">Gruppe</a></li>";
	} else res.data.menuPointGroup = "";
	res.data.grpColor = groupInfo.farbe;
	res.data.menu = renderSkinAsString("menu");
	
	
	/* ------------------ */
	//Dropbox
	res.data.dropBoxEntries = root.getDropBoxEntries(mode);
	res.data.listDropBox = renderSkinAsString("listDropBox");
	res.data.mode = mode;
	res.data.dropbox = renderSkinAsString("dropBox");
	
	
	/* ------------------ */
	//Skin rendern
	renderSkin("group");
}