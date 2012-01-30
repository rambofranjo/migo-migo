function groupMessages_action () { 
	
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
			
			//Inhalt der Gruppe rendern	
			root.renderGruppe("messages");
			
		} else {
			res.redirect(root.href(""));
		}
		
	//Benutzer nicht angemeldet, auf Startseite verweisen
	} else {
		res.redirect(root.href(""));
	}
}

function getAllMessages (grpId) {
	var messages = "";
	var tMessages = "<table style='padding:5px; width:100%;'><tbody>";
	
	var date = new Date();
	var time = new Date();
	
	var check = false;
	
	for (var i = 0; i < root.messages.count(); i++) {
		if ((grpId == root.messages.get(i).gruppeID) && (session.user._id == root.messages.get(i).empfaenger)) {	
			
			check = true;
			
			date = root.messages.get(i).datum;
			time = root.messages.get(i).uhrzeit;
			
			tMessages += "<tr>";
			//Nachrichten Header
			tMessages += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:20%;'>" + this.getSenderFromMessage(root.messages.get(i).sender) + "</td>";
			tMessages += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:50%;'><a style='color: #4D90FE; cursor:pointer;' onclick=\"showHideCommentsNews('messages" + root.messages.get(i)._id + "')\" >" + root.messages.get(i).betreff + "</a></td>";
			tMessages += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:10%;'>" + date.getDate() + "." + root.getMonthName(date.getMonth().toString()) + "." + date.getFullYear() + "</td>";
			tMessages += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:5%;'>" + time.getHours() + ":" + time.getMinutes() + "</td>";
			//Nachricht löschen
			tMessages += "<td><a href=" + root.href("deleteMessage") + "?groupId=" + session.data.grpId + "&msgId=" + root.messages.get(i)._id + "><img src=\"../static/images/delete.png\" /></a></td>";
			tMessages += "</tr>";
			//Nachrichten Text
			tMessages += "<tr style='height:50px; display:none;' id=\"messages" + root.messages.get(i)._id + "\"><td colspan =\"4\">" + root.messages.get(i).text + "</td></tr>";
			tMessages += "</tr>";
		}
	}
	
	tMessages += "</tbody></table>";
	res.data.tableMessages = tMessages;
	if (check) {
		messages = renderSkinAsString("messages");	
		return messages;
	}
}

function getSenderFromMessage (pId) {	
	for (var i = 0; i < root.person.count(); i++) {
		if (pId == root.person.get(i)._id) {
			return root.person.get(i).vorname + " " + root.person.get(i).nachname;
		}
	}
}

function getAllGroupMembers (gId) {
	var names = "";
	var pers;
	
	//Eigenen Namen nicht hinzufügen
	
	for (var i = 0; i < root.personGruppe.count(); i++) {
		if ((gId == root.personGruppe.get(i).gruppeID) && (root.personGruppe.get(i).status == "aktiv")) {
			pers = root.person.getById(root.personGruppe.get(i).personID);
			if (!(pers._id == session.user._id)) {
				names += "\"" + pers.vorname + " " + pers.nachname + "\", ";
			}
		}
	}
	
	names += "\"gesamte Gruppe\"";
	//Letzten Beistrich wwegschneiden
	//names = names.substr(0, names.length - 2);
	
	return names;
}