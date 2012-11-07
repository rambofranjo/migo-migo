function newAppointmentCal_action() {
	
	if ((session.user != null) && (req.data.save)) {

		var titel = req.data.groupAppointmentType;
		var start_datum = req.data.datumstart;
		var end_datum = req.data.datumende;
		var startzeit = req.data.startzeit;
		var endzeit = req.data.endzeit;
		var ort = req.data.ort;
		var beschreibung = req.data.beschreibung;
		var repeat = req.data.repeatappointment;
		var id = req.data.terminid;
		
		var m = start_datum.split("-");
		var month = m[1];
		
		var y = start_datum.split("-");
		var year = m[2];
		
		if (id == "") {
			
			//Neuer Termin
			if (repeat) {
				
				var ss_date = start_datum.split("-");
				var date = new Date(ss_date[2], ss_date[1]-1, ss_date[0]);
				var newDate = new Date(ss_date[2], ss_date[1]-1, ss_date[0]);
				date.setDate(date.getDate() - 7);
				
				while (date.getFullYear() == newDate.getFullYear()) {
					
					root.addNewTermin (titel, start_datum, end_datum, startzeit, endzeit, ort, beschreibung, session.data.grpId, session.user._id);
					var datum = start_datum + " " + startzeit;
					if (titel == "Spiel") root.addNewNews (titel, beschreibung, datum, ort); 
					
					//Datum um 7 Tage weiterzählen
					var s_date = start_datum.split("-");
					var sdate = new Date(s_date[2], s_date[1] - 1, s_date[0]);
					sdate.setDate(sdate.getDate() + 7);
					start_datum = sdate.format("dd-MM-yyyy");
					
					var e_date = end_datum.split("-");
					var edate = new Date(e_date[2], e_date[1] - 1, e_date[0]);
					edate.setDate(edate.getDate() + 7);
					end_datum = edate.format("dd-MM-yyyy");
					
					
					newDate.setDate(newDate.getDate() + 7);
				}
				
				//redirect
				res.redirect(root.href("groupCalendar") + "?groupId=" + session.data.grpId + "&month=" + month + "&year=" + year);
				
			} else {
				
				root.addNewTermin (titel, start_datum, end_datum, startzeit, endzeit, ort, beschreibung, session.data.grpId, session.user._id);
				var datum = start_datum + " " + startzeit;
				if (titel == "Spiel") root.addNewNews (titel, beschreibung, datum, ort);
				res.redirect(root.href("groupCalendar") + "?groupId=" + session.data.grpId + "&month=" + month + "&year=" + year);
			}
		} else {
			
			//Termin bearbeiten
			
			var sdate = start_datum.split("-");
			var edate = end_datum.split("-");
			var stime = startzeit.split(":");
			var etime = endzeit.split(":");
			
			var t = root.termine.getById(id);
			t.titel = titel;
			t.datum_anfang = new Date(sdate[2], sdate[1]-1, sdate[0]);
			t.datum_ende = new Date(edate[2], edate[1]-1, edate[0]);
			t.uhrzeit_anfang = new Date(0, 0, 0, stime[0], stime[1], 0);
			t.uhrzeit_ende = new Date(0, 0, 0, etime[0], etime[1], 0);
			t.ort = ort;
			t.beschreibung = beschreibung;
			t.gruppeID = session.data.grpId;
			t.personID = session.user._id;
			
			var datum = start_datum + " " + startzeit;
			if (titel == "Spiel") root.addNewNews (titel, beschreibung, datum, ort); 
			
			//redirect
			res.redirect(root.href("groupCalendar") + "?groupId=" + session.data.grpId + "&month=" + month + "&year=" + year);
		}
		
	} else if ((session.user != null) && (req.data.del)) {
		
		var id = req.data.terminid;
		var start_datum = req.data.datumstart;
		
		var m = start_datum.split("-");
		var month = m[1];
		
		var y = start_datum.split("-");
		var year = m[2];
		
		if (id != "") {
			
			var t = root.termine.getById(id);
			t.remove();
			
			res.redirect(root.href("groupCalendar") + "?groupId=" + session.data.grpId + "&month=" + month + "&year=" + year);
			
		} else {
			res.redirect(root.href(""));
		}
		
	} else {
		res.redirect(root.href(""));
	}
}

function addNewTermin (titel, start_datum, end_datum, startzeit, endzeit, ort, beschreibung, gId, uId) {
	
	var sdate = start_datum.split("-");
	var edate = end_datum.split("-");
	var stime = startzeit.split(":");
	var etime = endzeit.split(":");
	
	var t = new Termine();  
	t.titel = titel;
	t.datum_anfang = new Date(sdate[2], sdate[1]-1, sdate[0]);
	t.datum_ende = new Date(edate[2], edate[1]-1, edate[0]);
	t.uhrzeit_anfang = new Date(0, 0, 0, stime[0], stime[1], 0);
	t.uhrzeit_ende = new Date(0, 0, 0, etime[0], etime[1], 0);
	t.ort = ort;
	t.beschreibung = beschreibung;
	t.gruppeID = gId;
	t.personID = uId;
	root.termine.add(t); 
}


function addNewNews(title, text, datum, ort) {
	
	var newNews = new News();  
	newNews.titel = title;
	newNews.text = "<strong>Datum:</strong> " + datum + "<br /><strong>Ort:</strong> " + ort + "<br /><br />" + text;
	newNews.datum = new Date();
	newNews.uhrzeit = new Date();
	newNews.tag = "Spiel"
	newNews.gruppeID = session.data.grpId;
	newNews.personID = session.user._id;
	root.news.add(newNews); 
}
              