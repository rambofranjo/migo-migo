function groupNews_action () { 
	
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
			root.renderGruppe("news");
			
		} else {
			res.redirect(root.href(""));
		}
		
	//Benutzer nicht angemeldet, auf Startseite verweisen
	} else {
		res.redirect(root.href(""));
	}
}

function getAllNews (gId) {
	
	var news = "";
	var date = new Date();
	var time = new Date();
	
	for (var i = 0; i < root.news.count(); i++) {
		if (gId == root.news.get(i).gruppeID) {
			
			date = root.news.get(i).datum;
			time = root.news.get(i).uhrzeit;
			
			/*-- News Action --*/
			//News Löschen und bearbeiten
			if (root.isUserInGroupAndAdmin(session.user._id, gId)) {
				
				//Löschen und bearbeiten der News
				res.data.nDelete = "<a href=" + root.href("deleteNews") + "?groupId=" + gId + "&newsId=" + root.news.get(i)._id + "><img src=\"../static/images/delete.png\" /></a>";
				res.data.nEdit = "<a href=" + root.href("editNews") + "?groupId=" + gId + "&newsId=" + root.news.get(i)._id + "><img src=\"../static/images/edit.png\" /></a>";
				res.data.nAction = renderSkinAsString("newsAction");
			}
			
			/*-- News Header --*/
			//res.data.nAvatar = this.getAvatarFromUser(root.news.get(i).personID);
			res.data.nAuthor = this.getPerson(root.news.get(i).personID);
			res.data.nDate = date.getDate() + "." + this.getMonthName(date.getMonth().toString()) + "." + date.getFullYear();
			res.data.nTime = time.getHours() + ":" + time.getMinutes();
			res.data.nTitle = root.news.get(i).titel;
			res.data.nTag = root.news.get(i).tag;
			res.data.nText = root.news.get(i).text;
			
			//Kommentare
			res.data.newsId = root.news.get(i)._id;
			res.data.commentId = root.news.get(i)._id;
			res.data.newComment = renderSkinAsString("newComment");
			if (req.data.newsId == root.news.get(i)._id) res.data.dispComments = "block";
			else res.data.dispComments = "none";
			res.data.nComments = this.getCommentsFromNews(root.news.get(i)._id);
			
			news += renderSkinAsString("news");
		}
	}
	
	return news;
}

function getCommentsFromNews (nId) {
	
	var comments = "";
	var date = new Date();
	var time = new Date();
	var commentId = 0;
	
	for (var i = 0; i < root.comments.count(); i++) {
		if (nId == root.comments.get(i).newsID) {
			
			date = root.comments.get(i).datum;
			time = root.comments.get(i).uhrzeit;
			
			commentId = root.comments.get(i)._id;
			
			//Kommentare Löschen
			res.data.cAction = this.isUserOwnerOfCommentorAdmin(commentId, session.data.grpId, nId);
			
			/*-- Kommentare --*/
			res.data.cAuthor = this.getPerson(root.comments.get(i).personID);
			res.data.cDate = date.getDate() + "." + this.getMonthName(date.getMonth().toString()) + "." + date.getFullYear();
			res.data.cTime = time.getHours() + ":" + time.getMinutes();
			res.data.cText = root.comments.get(i).text;
			
			comments += renderSkinAsString("comments");
		}
	}
	
	return comments;
}

function isUserOwnerOfCommentorAdmin (cId, gId, nId) {
	var c = root.comments.getById(cId);
 	
	if (root.isUserInGroupAndAdmin (session.user._id, gId)) return "<a href=" + root.href("deleteComment") + "?groupId=" + gId + "&cId=" + cId + "&newsId=" + nId + "><img src=\"../static/images/delete.png\" /></a>";
	else if (c.personID == session.user._id) return "<a href=" + root.href("deleteComment") + "?groupId=" + gId + "&cId=" + cId + "&newsId=" + nId + "><img src=\"../static/images/delete.png\" /></a>";
	else return "";
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
			month = "Jul";
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

function getPerson (persId) {
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
		if ((id == root.personGruppe.get(i).gruppeID) && (root.personGruppe.get(i).status == "aktiv")) {
			uId[x] = root.personGruppe.get(i).personID;
			x += 1;
		}
	}
	return uId;
}