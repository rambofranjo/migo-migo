function editGroup_action() {
	
	if ((session.user != null) && (root.isUserInGroupAndAdmin(session.user._id, session.data.grpId))) {
		
		var group = root.gruppe.getById(session.data.grpId);
	
		//Save button gedrückt
		if (req.data.save) {
			
			//Formulardaten holen
			var grpName = req.data.grpName;
			var grpSports = req.data.grpSports;
			var grpColor = req.data.grpColor;
			var grpLogo = req.data.grpLogo;
			if (req.data.grpVisible) var grpVisible = true;
			else var grpVisible = false;
					
			//Überprüfungen
			if (grpName != "") {
				group.name = grpName;
				group.sportart = grpSports;
				group.farbe = grpColor;
				group.logo = grpLogo;
				group.sichtbar = grpVisible;
				
				//Erfolgreich bearbeitet
				res.data.infoEditGroup = "Gruppeninformationen erfolgreich aktualisiert!"
						
				//Gruppeinformationen rendern
				root.renderGruppe("group");
						
				//Zurück zu Gruppe leiten
				//res.redirect(root.href("groupGroup") + "?groupId=" + session.data.grpId);	
			} else {
				res.data.errorEditGroup = "Fehler aufgetreten!"
				res.data.grpName = grpName;
				res.data.grpSports = grpSports;
				res.data.grpColor = grpColor;
				res.data.grpLogo = grpLogo;
				res.data.grpVisible = grpVisible;
						
				//Gruppeninfos mit edit News rendern
				root.renderGruppe("editNews");
			}	
		} else {
			
			//Daten im Formular setzen
			res.data.grpName = group.name;
			res.data.grpSports = group.sportart;
			res.data.grpColor = group.farbe;
			res.data.grpLogo = group.logo;
			res.data.grpVisible = group.sichtbar;

			//Gruppeninfos rendern
			root.renderGruppe("group");
		}
	} else {
		res.redirect(root.href(""));
	}
}