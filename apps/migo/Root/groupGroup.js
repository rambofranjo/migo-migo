function groupGroup_action () { 
	
	//Prüfen, ob der Benutzer auch wirklich angemeldet ist
	if ((session.user != null) && (req.data.groupId) && root.gruppe.getById(req.data.groupId)) {
		
		var gId = req.data.groupId;
		var inGroup = "false";
		
		//Nur Admins dürfen hier weiter
		if (root.isUserInGroupAndAdmin(session.user._id, gId)) {
		
			/* ------------------ */
			//Prüfen, ob dieser User auch in dieser Gruppe ist
		
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
				root.renderGruppe("group");
			
			} else { res.redirect(root.href("")); }
		} else { res.redirect(root.href("")); }
		
	//Benutzer nicht angemeldet, auf Startseite verweisen
	} else { res.redirect(root.href("")); }
}

/*
Gibt die Gruppe zurück
*/
function getGroupInfo (gId) {
	
	var group = root.gruppe.getById(gId);
	return group;
}