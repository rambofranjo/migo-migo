function groupAppointment_action () { 
	
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
			root.renderGruppe("appointment");
			
		} else {
			res.redirect(root.href(""));
		}
		
	//Benutzer nicht angemeldet, auf Startseite verweisen
	} else {
		res.redirect(root.href(""));
	}
}

function getAllAppointments (gId) {
	
	var appointment = "";
	var date = new Date();
	var time = new Date();
	
	
	
	for (var i = 0; i < root.termine.count(); i++) {
		if (gId == root.termine.get(i).gruppeID) {
			
			date = root.termine.get(i).datum;
			timeStart = root.termine.get(i).startzeit;
			timeEnd = root.termine.get(i).endzeit;
			
			/*-- Appointment Action --*/
			//Appointments Löschen und bearbeiten
			if (root.isUserInGroupAndAdmin(session.user._id, gId)) {
				//Löschen und bearbeiten der Appointments
				res.data.aDelete = "<a href=" + root.href("deleteAppointment") + "?groupId=" + gId + "&appointmentId=" + root.termine.get(i)._id + "><img src=\"../static/images/delete.png\" />";
				res.data.aEdit = "<a href=" + root.href("editAppointment") + "?groupId=" + gId + "&appointmentId=" + root.termine.get(i)._id + "><img src=\"../static/images/edit.png\" /></a>";
				res.data.aAction = renderSkinAsString("appointmentAction");
			}
			
			
			/*-- Appointment Header --*/
			//res.data.aAvatar = this.getAvatarFromUser(root.news.get(i).personID);
			res.data.aAuthor = this.getPerson(root.termine.get(i).personID);
			res.data.aDate = date.getDate() + "." + root.getMonthName(date.getMonth().toString()) + "." + date.getFullYear();
			res.data.aTimeStart = timeStart.getHours() + ":" + timeStart.getMinutes();
			res.data.aTimeEnd = timeEnd.getHours() + ":" + timeEnd.getMinutes();
			res.data.aTitle = root.termine.get(i).titel;
			res.data.aTag = root.termine.get(i).tag;
			res.data.aPlace = root.termine.get(i).ort;
			res.data.aText = root.termine.get(i).beschreibung;
			
			
			appointment += renderSkinAsString("appointment");
		}
	}
	
	return appointment;
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



