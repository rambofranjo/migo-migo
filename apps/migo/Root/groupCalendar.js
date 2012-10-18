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
	var date = new Date();
	var start = new Date();
	var end = new Date();
	
	
	var timeStart = "";
	var timeEnd = "";
	var title = "";
	
	
	
	for (var i = 0; i < root.termine.count(); i++) {
		if (gId == root.termine.get(i).gruppeID) {
		
			date = root.termine.get(i).datum;
 			
			start = root.termine.get(i).startzeit;
			end = root.termine.get(i).endzeit;
			
			//res.write(root.getMonthName(date.getMonth().toString()) + " " + date.getDate() + " " + date.getFullYear() + " " + start.getHours() + ":" + start.getMinutes() + ":" + start.getSeconds()); 
			//res.write(root.getMonthName(date.getMonth().toString()) + " " + date.getDate() + " " + date.getFullYear() + " " + end.getHours() + ":" + end.getMinutes() + ":" + end.getSeconds());
			//res.write(root.termine.get(i).titel);
			
			
			
			timeStart = root.getMonthName(date.getMonth().toString()) + " " + date.getDate() + " " + date.getFullYear() + " " + start.getHours() + ":" + start.getMinutes() + ":" + start.getSeconds();
			timeEnd   = root.getMonthName(date.getMonth().toString()) + " " + date.getDate() + " " + date.getFullYear() + " " + end.getHours() + ":" + end.getMinutes() + ":" + end.getSeconds();
			title = root.termine.get(i).titel;
			
			//calevents = "{ title: 'Training', start: 'Jul 14 2012 12:30:00', end: 'Jul 14 2012 16:30:00', allDay: false, editable: false }, { title: 'Spiel', start: 'Jul 18 2012 12:30:00', end: 'Jul 18 2012 16:30:00', allDay: false, editable: false }";
			
			//sb.append("{ title: '"+ title +"', start: '"+timeStart+"', end: '"+timeEnd+"', allDay: false, editable: false }");
			//sb.append(",");
			
			calevents = calevents + "{ title: '"+ title +"', start: '"+timeStart+"', end: '"+timeEnd+"', allDay: false, editable: false } , ";
			
		
			
			/*
			res.write("startzeit: " + date + " " + root.termine.get(i).startzeit + "\n");
			res.write("endzeit: " + date + " " + root.termine.get(i).endzeit +"\n");
			res.write("titel: " + root.termine.get(i).titel + "\n");
			res.write("-------------------------------------------" + "\n");
			*/
			
			
			/*-- Appointment Header --*/
			/*
			res.data.aDate = date.getDate() + "." + root.getMonthName(date.getMonth().toString()) + "." + date.getFullYear();
			res.data.aTimeStart = timeStart.getHours() + ":" + timeStart.getMinutes();
			res.data.aTimeEnd = timeEnd.getHours() + ":" + timeEnd.getMinutes();
			*/
			
			
			//calevents += renderSkinAsString("calendar");
		}
	}
	
	return calevents;

}







