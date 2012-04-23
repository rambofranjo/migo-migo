function acceptUser_action() {
	if ((req.data.groupId) && (req.data.userId)) {
		
		var gId = req.data.groupId;
		var uId = req.data.userId;
		
		if ((session.user != null) && (root.isUserInGroupAndAdmin(session.user._id, gId))) {
			
			//Status auf aktiv setzen
			for (var i = 0; i < root.personGruppe.count(); i++) {
				if ((gId == root.personGruppe.get(i).gruppeID) && (uId == root.personGruppe.get(i).personID)) {
					var u = root.personGruppe.getById(root.personGruppe.get(i)._id);	
					u.status = "aktiv";
				}
			}
				
			//Zurück zu Mitglieder leiten
			res.redirect(root.href("groupUsers") + "?groupId=" + session.data.grpId);
			
		} else {
			res.redirect(root.href(""));
		}
	}
}