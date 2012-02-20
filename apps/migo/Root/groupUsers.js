function groupUsers_action () { 
	
	//Prüfen, ob der Benutzer auch wirklich angemeldet ist
	if ((session.user != null) && (req.data.groupId) && root.gruppe.getById(req.data.groupId)) {
		
		/* ------------------ */
		//Prüfen, ob dieser User auch in dieser Gruppe ist
		
		var gId = req.data.groupId;
		var inGroup = "false";
		
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
			root.renderGruppe("users");
			
		} else {
			res.redirect(root.href(""));
		}
		
	//Benutzer nicht angemeldet, auf Startseite verweisen
	} else {
		res.redirect(root.href(""));
	}
}

/*
Alle Gruppenmitglieder auflisten
*/
function getAllUsers (gId) {
	
	var date = new Date();
	var users = "<table style='width:100%;'>";
	users += "<thead style='text-align:left;'><th>Vorname</th><th>Nachname</th><th>Geb. Datum</th><th>Wohnort</th><th>E-Mail</th>";
	if (root.isUserInGroupAndAdmin(session.user._id, gId)) { users +=  "<th>Admin?</th><th>L&ouml;schen?</th></thead><tbody>"; }
	else users += "</thead><tbody>";
	
	//Zuerst Id's aller Gruppenmitglieder holen
	for (var i = 0; i < root.personGruppe.count(); i++) {
		if ((gId == root.personGruppe.get(i).gruppeID) && (root.personGruppe.get(i).status == "aktiv")) {
			
			//Jetzt alle Personendaten auslesen, welche in der Gruppe sind
			for (var a = 0; a < root.person.count(); a++) {
				if (root.personGruppe.get(i).personID == root.person.get(a)._id) {
					
					date = root.person.get(a).gebDatum;
					
					users += "<tr>";
					users += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:100px;' >" + root.person.get(a).vorname + "</td>";
					users += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:130px;' >" + root.person.get(a).nachname + "</td>";
					if (root.person.get(a).gebDatum != null) users += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:130px;' >" + date.getDate() + "." + root.getMonthName(date.getMonth().toString()) + "." + date.getFullYear() + "</td>";
					else users += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:130px;' >keine Angabe</td>";
					users += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:100px;' >" + root.person.get(a).ort + "</td>";
					users += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:140px;' >" + root.person.get(a).email + "</td>";
				
					//Gründer der Gruppe bleibt immer Admin
					if (root.isUserInGroupAndAdmin(session.user._id, gId)) {
						users += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:100px;' >" + 
							"<form action=\"" + root.href("editAdmin") + "\" method=\"POST\">" + 
							"<input type=\"hidden\" name=\"userId\" value=\"" + root.person.get(a)._id + "\">" + 
							"<input name=\"admin\" value=\"1\" onclick=\"this.form.submit();\" type=\"checkbox\"";
						if (this.isUserFounder(root.person.get(a)._id, gId)) { users += "disabled=\"disabled\" checked=\"checked\""; }
						else if (root.isUserInGroupAndAdmin(root.person.get(a)._id, gId)) { users += "checked=\"checked\" "; }
						if ((root.person.get(a)._id == session.user._id) ) { users += "disabled=\"disabled\""; }
						users += "/></form></td>";
					}
					
					//Benutzer löschen
					if ((root.isUserInGroupAndAdmin(session.user._id, gId)) && (root.person.get(a)._id != session.user._id)) { users += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:20px;' >" 
						+ "<a href=" + root.href("deleteUser") + "?groupId=" + gId + "&userId=" + root.person.get(a)._id + "><img src=\"../static/images/delete.png\" /></a>" + "</td>"; 
					} else { users+= "<td></td>" }
					
					users += "</tr>";
				}
			}
		}
	}
	
	users += "</table></tbody>";
	
	return users;
}

/*
Ob der User der Gründer der Gruppe ist
*/
function isUserFounder (uId, gId) {
	for (var i = 0; i < root.personGruppe.count(); i++) {
		if ((gId == root.personGruppe.get(i).gruppeID) && (uId == root.personGruppe.get(i).personID)) {
			if (root.personGruppe.get(i).gruender == "1") {
				return true;
				break;
			}
			else {
				return false;
				break;
			}
		}
	}
}

/*
Alle Gruppenanfragen auflisten
*/
function getAllInquiries(gId) {
	
	var date = new Date();
	var users =	"<h3>Gruppenanfragen:</h3>";
	var anfragen = false;
	users += "<table style='width:100%;' ><tbody>";
	
	//Zuerst Id's aller Gruppenmitglieder holen
	for (var i = 0; i < root.personGruppe.count(); i++) {
		if ((gId == root.personGruppe.get(i).gruppeID) && (root.personGruppe.get(i).status == "angefragt")) {
			
			//Jetzt alle Personendaten auslesen, welche in der Gruppe sind
			for (var a = 0; a < root.person.count(); a++) {
				if (root.personGruppe.get(i).personID == root.person.get(a)._id) {
					
					anfragen = true;
					date = root.person.get(a).gebDatum;
					
					users += "<tr>";
					users += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:100px;' >" + root.person.get(a).vorname + "</td>";
					users += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:150px;' >" + root.person.get(a).nachname + "</td>";
					if (root.person.get(a).gebDatum != null) users += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:130px;' >" + date.getDate() + "." + root.getMonthName(date.getMonth().toString()) + "." + date.getFullYear() + "</td>";
					else users += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:130px;' >keine Angabe</td>";
					users += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:100px;' >" + root.person.get(a).ort + "</td>";
					users += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:140px;' >" + root.person.get(a).email + "</td>";
					users += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:20px;' >" + "<a href=" + root.href("acceptUser") + "?groupId=" + gId 
						+ "&userId=" + root.person.get(a)._id + "><img src=\"../static/images/ok.png\" style=\"width:16px; height:16px;\" /></a>" + "</td>";
					users += "<td style ='border-bottom:1px solid #CCC; padding:3px; width:20px;' >" + "<a href=" + root.href("rejectUser") + "?groupId=" + gId 
						+ "&userId=" + root.person.get(a)._id + "><img src=\"../static/images/delete.png\" /></a>" + "</td>";
					users += "</tr>";
				}
			}
		}
	}
	
	users += "</table></tbody>";
	if (!anfragen) users = "";
	return users;
}
