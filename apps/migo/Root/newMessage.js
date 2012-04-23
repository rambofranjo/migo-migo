function newMessage_action() {

	if ((session.user != null) && (req.data.send)) {
		
		var error = "";
		
		var sendTo = req.data.sendTo;
		var betreff = req.data.betreff;
		var text = req.data.text;
		
		if ((sendTo != "") && (betreff != "") && (text != "")) {
			
			if (sendTo == "gesamte Gruppe") {
				//Nachricht an alle schicken, ausser an sich selbst
				
				//Alle Gruppenmitglieder holen
				for (var i = 0; i < root.personGruppe.count(); i++) {
					if ((session.data.grpId == root.personGruppe.get(i).gruppeID) && (root.personGruppe.get(i).status == "aktiv")) {
						//Nachticht nicht an sich selbst schicken
						if (root.personGruppe.get(i).personID != session.user._id) {
							var msg = new Nachrichten();  
							msg.betreff = betreff;
							msg.text = text;
							msg.sender = session.user._id;
							msg.empfaenger = root.personGruppe.get(i).personID;
							msg.datum = new Date();
							msg.uhrzeit = new Date();
							msg.gruppeID = session.data.grpId;
							msg.personID = session.user._id;
							
							root.messages.add(msg); 
						}
					}
				}
				//Weiterleiten
				res.redirect(root.href("groupMessages") + "?groupId=" + session.data.grpId);	
			} else {
				if ((this.getIdByName(sendTo) != false) && (root.isUserInGroup(session.user._id, session.data.grpId))) {
					var msg = new Nachrichten();  
					msg.betreff = betreff;
					msg.text = text;
					msg.sender = session.user._id;
					msg.empfaenger = this.getIdByName(sendTo);
					msg.datum = new Date();
					msg.uhrzeit = new Date();
					msg.gruppeID = session.data.grpId;
					msg.personID = session.user._id;
			
					root.messages.add(msg); 
					res.redirect(root.href("groupMessages") + "?groupId=" + session.data.grpId);
				} else {
					res.data.errorNewMessage = "Fehler: Empf&auml;nger ung&uuml;tig!";
					res.data.newMessageSendTo = sendTo;
					res.data.newMessageBetreff = betreff;
					res.data.newMessageText = text;
					root.renderGruppe("messagesError");
				}
			}
		} else {	
			res.data.errorNewMessage = "Fehler! Bitte alle Felder ausf&uuml;llen!";
			res.data.newMessageSendTo = sendTo;
			res.data.newMessageBetreff = betreff;
			res.data.newMessageText = text;
			root.renderGruppe("messagesError");
		}
		
	} else {
		res.redirect(root.href(""));
	}
}

function getIdByName(name) {
	var n = name.split(" ");
	var vname = n[0];
	var nname = n[1];
	
	for (var i = 0; i < root.person.count(); i++) {
		if ((vname == root.person.get(i).vorname) && (nname == root.person.get(i).nachname)) {
			return root.person.get(i)._id;
			break;
		}
	}
	return false
}