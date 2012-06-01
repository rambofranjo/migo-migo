function newDbEntrie_action() {

	if ((session.user != null) && (req.data.save)) {
		
		var error = "";
		
		var text = req.data.text;
		var mode = req.data.mode;
		
		var path = this.getPath(mode);
		
		if (text != "") {
			
			var db = new Dropbox();  
			db.text = text;
			db.datum = new Date();
			db.uhrzeit = new Date();
			db.gruppeID = session.data.grpId;
			db.personID = session.user._id;
			
			root.dropbox.add(db); 

			res.redirect(root.href(path) + "?groupId=" + session.data.grpId);
		} else {	
			res.data.errorDropBox = "Fehler!";
			root.renderGruppe(mode);
		}
		
	} else {
		res.redirect(root.href(""));
	}
}

function getPath (mode) {
	switch (mode) {
		case "appointment":
			return "newAppointment";
			break;
		case "news": 
			return "groupNews";
			break;
		case "calendar": 
			return "groupCalendar";
			break;
		case "messages": 
			return "groupMessages";
			break;
		case "users": 
			return "groupUsers";
			break;
		case "group": 
			return "groupGroup";				
			break;
	}
}