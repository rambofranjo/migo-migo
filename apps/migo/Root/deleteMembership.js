function deleteMembership_action() {
	if (req.data.groupId) {
		
		var grpId = req.data.groupId;
		
		if (session.user != null) {
			
			//Mitgliedschaft bei Gruppe mit grpId löschen
			for (var i = 0; i < root.personGruppe.count(); i++) {
				if ((session.user._id == root.personGruppe.get(i).personID) && (grpId == root.personGruppe.get(i).gruppeID)) {
					var pg = root.personGruppe.getById(root.personGruppe.get(i)._id);
					pg.remove();
					
					//Zurück zu chooseGroup leiten
					res.redirect(root.href("chooseGroup"));
				}
			}
			
		} else {
			res.redirect(root.href(""));
		}
	}
}