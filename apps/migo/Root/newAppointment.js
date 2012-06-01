function newAppointment_action() {
	
	if ((session.user != null) && (req.data.save)) {
		
		res.writeln(session.user._id);
		
		var error = "";
		
		var titel = req.data.titel;
		var datum = req.data.datum;
		var startzeit = req.data.startzeit;
		var endzeit = req.data.endzeit;
		var ort = req.data.ort;
		var beschreibung = req.data.beschreibung;

		
		if ((startzeit != "") && (endzeit != "") && (ort != "")) {
			var newAppointment = new Termine();
			res.writeln(startzeit);
			newAppointment.titel = titel;
			newAppointment.beschreibung = beschreibung;
			newAppointment.tag = "findet statt";
			newAppointment.datum = new Date(datum);
			newAppointment.startzeit = new Date(startzeit);
			newAppointment.endzeit = new Date(endzeit);
			//res.writeln("1");
			newAppointment.ort = ort;
			newAppointment.gruppeID = session.data.grpId;
			newAppointment.personID = session.user._id;
			root.termine.add(newAppointment);
			
			//res.redirect(root.href("groupNews") + "?groupId=" + session.data.grpId);
			res.redirect(root.href("newAppointment") + "?groupId=" + session.data.grpId);
		} else {	
			res.data.errorNewAppointment = "Fehler!";
			/*
			res.data.newAppointmentDate = datum;
			res.data.starttime = time1;
			res.data.endtime = time2;
			res.data.newAppointmentPlace = place;
			res.data.newAppointmentText = text;
			*/
			root.renderGruppe("appointmentError");
		}
		
	} else {
		res.redirect(root.href(""));
	}
}