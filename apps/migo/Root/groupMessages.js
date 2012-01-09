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
	
	for (var i = 0; i < root.messages.count(); i++) {
		if ((grpId == root.messages.get(i).gruppeID) && (session.user._id == root.messages.get(i).personID)) {	
			
			date = root.messages.get(i).datum;
			time = root.messages.get(i).uhrzeit;
			
			tMessages += "<tr>";
			tMessages += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:20%;'>" + this.getSenderFromMessage(root.messages.get(i).sender) + "</td>";
			tMessages += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:50%;'><a style='color: #4D90FE; cursor:pointer;' onclick=\"showHideCommentsNews('messages" + root.messages.get(i)._id + "')\" >" + root.messages.get(i).betreff + "</a></td>";
			tMessages += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:15%;'>" + date.getDate() + "." + root.getMonthName(date.getMonth().toString()) + "." + date.getFullYear() + "</td>";
			tMessages += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:5%;'>" + time.getHours() + ":" + time.getMinutes() + "</td>";
			tMessages += "<tr style='height:50px; display:none;' id=\"messages" + root.messages.get(i)._id + "\"><td>" + root.messages.get(i).text + "</td></tr>";
			tMessages += "</tr>";
		}
	}
	
	tMessages += "</tbody></table>";
	res.data.tableMessages = tMessages;
	messages = renderSkinAsString("messages");	
	
	return messages;
}

function getSenderFromMessage (pId) {	
	for (var i = 0; i < root.person.count(); i++) {
		if (pId == root.person.get(i)._id) {
			return root.person.get(i).vorname + " " + root.person.get(i).nachname;
		}
	}
}