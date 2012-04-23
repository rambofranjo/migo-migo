function editAdmin_action() {
	if (req.data.userId) {
		
		var uId = req.data.userId;
		
		if ((session.user != null) && (root.isUserInGroupAndAdmin(session.user._id, session.data.grpId))) {
			
			if (root.isUserInGroup(uId, session.data.grpId)) {
				
				var persGrpId = this.getPersGrpId(uId, session.data.grpId);
				var u = root.personGruppe.getById(persGrpId);
				
				/* --- User bekommt admin Rechte -- */
				if (req.data.admin) {
					
					//Adminrecht setzen
					u.isAdmin = true;
					
					//Gruppe Benutzer rendern
					root.renderGruppe("users");
					
					//Zurück zu News leiten
					res.redirect(root.href("groupUsers") + "?groupId=" + session.data.grpId);
				
				} else {
					//Adminrecht entziehen
					u.isAdmin = false;
					
					//Gruppe Benutzer rendern
					root.renderGruppe("users");
					
					//Zurück zu News leiten
					res.redirect(root.href("groupUsers") + "?groupId=" + session.data.grpId);
				}
			}	
		} else {
			res.redirect(root.href(""));
		}
	}
}

function getPersGrpId (uId, gId) {
	for (var i = 0; i < root.personGruppe.count(); i++) {
		if ((uId == root.personGruppe.get(i).personID) && (gId == root.personGruppe.get(i).gruppeID)) {
			return root.personGruppe.get(i)._id;
			break;	
		}
	}
	return false;
}