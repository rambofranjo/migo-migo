function editAppointment_action() {

	if ((req.data.groupId) && (req.data.appointmentId)) {
		
		var grpId = req.data.groupId;
		var aId = req.data.appointmentId;
		
		
		if ((session.user != null) && (root.isUserInGroupAndAdmin(session.user._id, grpId))) {
			
			if (this.isAppointmentInGroup(aId, grpId)) {
				
				var a = root.termine.getById(aId);
				
				/* --- save button gedrückt -- */
				if (req.data.edit) {
					
					//Appointments bearbeiten
					var aOrt = req.data.aOrt;
					var aText = req.data.aText;
					var startzeit = req.data.startzeit;
					var endzeit = req.data.endzeit; 
					var datum = req.data.datum;
					
					
					//Überprüfungen
					if ((aOrt != "") && (startzeit != "") && (endzeit != "") && (datum != "")) {
						// in DB schreiben 
						a.ort = aOrt;
						a.beschreibung = aText;
						a.startzeit = startzeit;
						a.endzeit = endzeit;
						a.datum = datum;
						
						//Gruppe Appointment rendern
						root.renderGruppe("appointment");
						
						//Zurück zu Appointment leiten
						res.redirect(root.href("groupAppointment") + "?groupId=" + session.data.grpId);	
					} else {
						res.data.errorEditAppointment = "Fehler aufgetreten!"
						res.data.aOrt = aOrt;
						res.data.aText = aText;
						res.data.startzeit = startzeit;
						res.data.grpId = grpId;
						
						//Gruppeninfos mit edit Appointment rendern
						root.renderGruppe("editAppointment");
					}
					
				
				} else if (req.data.cancel) {
					res.redirect(root.href("groupAppointment") + "?groupId=" + session.data.grpId);
				} else {
					
					
					//Daten im Formular setzen
					res.data.aOrt = a.ort;
					res.data.aText = a.beschreibung;
					res.data.startzeit = a.startzeit.getHours() + ":" + a.startzeit.getMinutes();
					res.data.endzeit = a.endzeit.getHours() + ":" + a.endzeit.getMinutes(); 
					//res.data.datum = a.datum.getDay() + "/" + a.datum.getMonth() + "/" + a.datum.getYear();

					res.data.aId = aId;
					res.data.grpId = grpId;
					
					//Gruppeninfos mit edit Appointment rendern
					root.renderGruppe("editAppointment");
					
				}
			}
			
		} else {
			res.redirect(root.href(""));
		}
	}
	
}

function isAppointmentInGroup (aId, gId) {
	for (var i = 0; i < root.termine.count(); i++) {
		if (aId == root.termine.get(i)._id) {
			if (gId == root.termine.get(i).gruppeID) {
					return true;
					break;	
			}
		}
	}
	return false;
}