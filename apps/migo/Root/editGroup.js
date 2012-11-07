function editGroup_action() {
	
	if ((session.user != null) && (root.isUserInGroupAndAdmin(session.user._id, session.data.grpId))) {
		
		var group = root.gruppe.getById(session.data.grpId);
	
		//Save button gedrückt
		if (req.data.save) {
			
			this.uploadDirectory = "/images";
			
			//Formulardaten holen
			var grpName = req.data.grpName;
			var grpSports = req.data.grpSports;
			var grpColor = req.data.grpColor;
			var grpLogo = req.data.grpLogo;
			if (req.data.grpVisible) var grpVisible = true;
			else var grpVisible = false;
			var status = session.getUploadStatus(req.data.upload_id);
					
			//Überprüfungen
			if ((grpName != "") && (grpColor != "")) {
				
				if (grpLogo.getName() != "") {
					if (status && status.getCurrent() == status.getTotal()) {
						var staticDir = new File(app.dir, "static");
						var img = new Image(req.data.grpLogo.inputStream || req.data.logo.content);
						
						var w = img.getWidth(); 
						var h = img.getHeight(); 
						
						if (w > 100) {
							var factor = w/100;
							img.resize(parseInt(100), parseInt(h / factor)); 
						}
						
						img.saveAs(staticDir + "/uploads/" + grpLogo.getName());
						image = "/static/uploads/" + grpLogo.getName();
						group.logo = image;
						img.dispose();
					}
				}
				
				group.name = grpName;
				group.sportart = grpSports;
				group.farbe = grpColor;
				group.sichtbar = grpVisible;
				
				//Erfolgreich bearbeitet
				res.data.infoEditGroup = "<p class='success'>Gruppeninformationen erfolgreich aktualisiert!</p>"
						
				//Gruppeinformationen rendern
				root.renderGruppe("group");
						
				//Zurück zu Gruppe leiten
				//res.redirect(root.href("groupGroup") + "?groupId=" + session.data.grpId);	
			} else {
				res.data.errorEditGroup = "<p class='error'>Fehler aufgetreten!</p>"
				res.data.grpName = grpName;
				res.data.grpSports = grpSports;
				res.data.grpColor = grpColor;
				res.data.grpLogo = grpLogo;
				res.data.grpVisible = grpVisible;
						
				//Gruppeninfos mit edit News rendern
				root.renderGruppe("group");
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