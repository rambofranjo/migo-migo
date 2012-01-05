function group_action () { 
	
	//Prüfen, ob der Benutzer auch wirklich angemeldet ist
	if ((session.user != null) && (req.data.groupId) && root.gruppe.getById(req.data.groupId)) {
		
		
		/* ------------------ */
		//Prüfen, ob dieser User auch in dieser Gruppe ist
		
		var gId = req.data.groupId;
		var inGroup = "false";
		
		//Alle User dieser Gruppe holen
		users = new Array();
		users = this.getUsersIdByGroupId(gId);
		
		for (var i = 0; i < users.length; i++) {
			if (session.user._id == users[i]) {
				//Person ist in Gruppe
				inGroup = "true";
			}
		}
		
		
		/* ------------------ */
		//Benutzer ist in Gruppe
		
		if (inGroup == "true") {
			
			//Gruppe zur session hinzufügen
			session.data.grpId = gId;
			
			//Inhalt der Gruppe rendern	
			this.renderGruppe();
			
		} else {
			res.redirect(root.href(""));
		}
		
	//Benutzer nicht angemeldet, auf Startseite verweisen
	} else {
		res.redirect(root.href(""));
	}
}

function renderGruppe () {
	
	/* ------------------ */
	//News auflisten
	res.data.listNews = this.getAllNews(session.data.grpId);
	
	//Neue News anlegen
	if (this.isUserInGroupAndAdmin(session.user._id, session.data.grpId)) {
		res.data.newNewsGroup = session.data.grpId;
		res.data.newNews = renderSkinAsString("newNews");
	}
	
	
	/* ------------------ */
	//Statusausgeben
	
	//Title
	res.data.title = "MIGO - Management Game Organisation - Gruppe " + this.getGroupNameById(session.data.grpId);

	//Login Msg
	var login = "";
	login += "Hi " + session.user.vorname + ' ' + session.user.nachname + "!<br />"; 
	login += "<a href=" + root.href("logout") + ">Logout</a>";
	res.data.loginMsg = login;
	
	//Gruppenname
	res.data.groupName = this.getGroupNameById(session.data.grpId);
	
	//Link zu Gruppenübersicht
	res.data.allGroups = "<a href=" + root.href("group") + ">Zur&uumlck zur Gruppen&uumlbersicht</a>";
	
	//Skin rendern
	renderSkin("group");
}

function getAllNews (gId) {
	
	var news = "";
	var date = new Date();
	var time = new Date();
	
	for (var i = 0; i < root.news.count(); i++) {
		if (gId == root.news.get(i).gruppeID) {
			
			date = root.news.get(i).datum;
			time = root.news.get(i).uhrzeit;
			
			if (this.isUserInGroupAndAdmin(session.user._id, gId)) {
				
				//Löschen und bearbeiten der News
				res.data.nDelete = "<a href=" + root.href("deleteNews") + "?groupId=" + gId + "&newsId=" + root.news.get(i)._id + ">l&oumlschen</a>";
				//res.data.nEdit =
				//TODO
				res.data.nAction = renderSkinAsString("newsAction");
			}
			
			//res.data.nAvatar = this.getAvatarFromUser(root.news.get(i).personID);
			res.data.nAuthor = this.getAuthorFromNews(root.news.get(i).personID);
			res.data.nDate = date.getDate() + "." + this.getMonthName(date.getMonth().toString()) + "." + date.getFullYear();
			res.data.nTime = time.getHours() + ":" + time.getMinutes();
			res.data.nTitle = root.news.get(i).titel;
			res.data.nTag = root.news.get(i).tag;
			res.data.nText = root.news.get(i).text;
			//res.data.nComments = this.getCommentFromNews(root.news.get(i)._id);
			
			news += renderSkinAsString("news");
		}
	}
	
	return news;
}

function getMonthName (id) {
	var month = "";
	
	switch (id) {
		case "0":
			month = "J&auml;nner";
			break;
		case "1":
			month = "Februar";
	    	break;
		case "2":
			month = "M&auml;rz";
	    	break;
		case "3":
			month = "April";
		    break;
		case "4":
			month = "Mai";
		    break;
		case "5":
			month = "Juni";
		    break;
		case "6":
			month = "Juli";
			break;
		case "7":
			month = "August";
			break;
		case "8":
			month = "September";
			break;
		case "9":
			month = "Oktober";
			break;
		case "10":
			month = "November";
			break;
		case "11":
			month = "Dezember";
			break;
	}

	return month;
}

function getAuthorFromNews (persId) {
	var vname = "";
	var nname = "";
	var name = "";
	
	for (var i = 0; i < root.person.count(); i++) {
		if (persId == root.person.get(i)._id) {
			vname = root.person.get(i).vorname;
			nname = root.person.get(i).nachname;
		}
	}
	
	name = vname + " " + nname;
	return name;
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