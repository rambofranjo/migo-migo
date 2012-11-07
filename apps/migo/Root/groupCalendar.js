function groupCalendar_action () { 
	
	//Prüfen, ob der Benutzer auch wirklich angemeldet ist
	if ((session.user != null) && root.gruppe.getById(req.data.groupId)) {
		
		
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
			root.renderGruppe("calendar");
			
		} else {
			res.redirect(root.href(""));
		}
		
	//Benutzer nicht angemeldet, auf Startseite verweisen
	} else {
		res.redirect(root.href(""));
	}
}


function getDateTime(gId) {
	
	//var datetimeinfo = 


}


function getAllEvents(gId) {

	var calevents = "";
	
	for (var i = 0; i < root.termine.count(); i++) {
		if (gId == root.termine.get(i).gruppeID) {
		
			var id = root.termine.get(i)._id;
			var title = root.termine.get(i).titel;
			var beschreibung = root.termine.get(i).beschreibung;
			var start = root.termine.get(i).datum_anfang.format("MMM dd yyyy", java.util.Locale.ENGLISH) + " " + root.termine.get(i).uhrzeit_anfang.format("H:mm:ss");
			var end = root.termine.get(i).datum_ende.format("MMM dd yyyy", java.util.Locale.ENGLISH) + " " + root.termine.get(i).uhrzeit_ende.format("H:mm:ss");
			var ort = root.termine.get(i).ort;
			var notice = root.termine.get(i).beschreibung;
			
			calevents += "{title: '"+title+"', start: '"+start+"', end: '"+end+"', allDay: false, editable: true, ort: '"+ort+"', notice: '"+notice+"', id: "+id+"}, ";
		}
	}
	
	return calevents;
}


function IsCalEditable (gId, uId) {

	if (root.isUserInGroupAndAdmin(uId, gId)) return true;
	else return false;
}






