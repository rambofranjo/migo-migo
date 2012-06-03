function editAppointment_action() {

	if ((req.data.groupId) && (req.data.appointmentId)) {
		
		var grpId = req.data.groupId;
		var aId = req.data.appointmentId;
		
		
		if ((session.user != null) && (root.isUserInGroupAndAdmin(session.user._id, grpId))) {
			
			if (this.isAppointmentInGroup(aId, grpId)) {
				
				var a = root.termine.getById(aId);
				
				/* --- save button gedrückt -- */
				if (req.data.edit) {
					
					/*
					//News bearbeiten
					var title = req.data.title;
					var text = req.data.text;
					
					//Überprüfungen
					if ((title != "") && (text != "")) {
						a.titel = title;
						a.text = text;
						
						//Gruppe Appointment rendern
						root.renderGruppe("appointment");
						
						//Zurück zu News leiten
						res.redirect(root.href("groupAppointment") + "?groupId=" + session.data.grpId);	
					} else {
						res.data.errorEditAppointment = "Fehler aufgetreten!"
						res.data.nTitle = title;
						res.data.nText = text;
						res.data.nId = nId;
						res.data.grpId = grpId;
						
						//Gruppeninfos mit edit News rendern
						root.renderGruppe("editAppointment");
					}
					
					*/
				
				} else if (req.data.cancel) {
					res.redirect(root.href("groupAppointment") + "?groupId=" + session.data.grpId);
				} else {
				
					//Daten im Formular setzen
					res.data.aText = a.beschreibung;
					res.data.aOrt = a.ort;
					
					res.data.aId = aId;
					res.data.grpId = grpId;
					
					//Gruppeninfos mit edit News rendern
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