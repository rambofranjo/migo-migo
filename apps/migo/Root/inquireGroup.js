function inquireGroup_action() {
	if ((req.data.chooseGroup) && (req.data.groupName)) {
		
		var gName = req.data.groupName;
		
		if (session.user != null) {
			
			//Eintrag in personGruppe, und Status auf angefragt setzen
			var pg = new PersonGruppe();
			pg.gruppeID = this.getGroupIdByName(gName);
			pg.personID = session.user._id;
			pg.isAdmin = 0;
			pg.gruender = 0;
			pg.status = "angefragt";  
			
			root.personGruppe.add(pg);
			
			//Nachricht an Admin(s) dieser Gruppe senden
			for (var i = 0; i < root.personGruppe.count(); i++) {
				if ((this.getGroupIdByName(gName) == root.personGruppe.get(i).gruppeID) && (root.personGruppe.get(i).isAdmin == 1)) {
					var msg = new Nachrichten();  
					msg.betreff = "Gruppenanfrage";
					msg.text = "Der Benutzer " + session.user.vorname + " " + session.user.nachname + " m&ouml;chte zu dieser Gruppe beitreten.";
					msg.sender = session.user._id;
					msg.empfaenger = root.personGruppe.get(i).personID;
					msg.datum = new Date();
					msg.uhrzeit = new Date();
					msg.gruppeID = this.getGroupIdByName(gName);
					msg.personID = session.user._id;
			
					root.messages.add(msg);
				}
			}
			
			//Zurück zu ChooseGroup leiten
			res.redirect(root.href("chooseGroup") + "?inquire=" + gName);
			
		} else {
			res.redirect(root.href(""));
		}
	}
}

function getGroupIdByName(gName) {
	for (var i = 0; i < root.gruppe.count(); i++) {
		if (root.gruppe.get(i).name == gName) {
			return root.gruppe.get(i)._id;
		}
	}
}