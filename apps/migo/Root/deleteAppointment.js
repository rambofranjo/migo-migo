function deleteAppointment_action() {
	if ((req.data.groupId) && (req.data.appointmentId)) {
		
		var grpId = req.data.groupId;
		var nId = req.data.appointmentId;
		
		if ((session.user != null) && (root.isUserInGroupAndAdmin(session.user._id, grpId))) {
			
			if (this.isAppointmentInGroup(nId, grpId)) {
				
				//löschen
				var a = root.termine.getById(nId);
				a.remove();
				
				//Zurück zu News leiten
				res.redirect(root.href("groupAppointment") + "?groupId=" + session.data.grpId);
			}
			
		} else {
			res.redirect(root.href(""));
		}
	}
}

function isAppointmentInGroup (nId, gId) {
	for (var i = 0; i < root.termine.count(); i++) {
		if (nId == root.termine.get(i)._id) {
			if (gId == root.termine.get(i).gruppeID) {
					return true;
					break;	
			}
		}
	}
	return false;
}