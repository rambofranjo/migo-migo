function newAppointment_action() {
	
	if ((session.user != null) && (req.data.save)) {
	
		var newAppointmentArray = new Array();
		
		//res.writeln(session.user._id);
		
		
		var datumstart = new Date(req.data.datumstart);
		var datumend = new Date(req.data.datumend);

		/************* zeitraum ***************/
		var startmonth = datumstart.getMonth() + 1;
		var startday = datumstart.getDate();
		var startyear = datumstart.getFullYear();
		
		var endmonth = datumend.getMonth() + 1;
		var endday = datumend.getDate();
		var endyear = datumend.getFullYear();
		/***************************************/
		
		var repeat = req.data.repeat;  // selected repeating value 
		
		
		var error = "";
		
		var titel = req.data.titel;
		//var datum = req.data.datum;
		var startzeit = req.data.startzeit;
		var endzeit = req.data.endzeit;
		var ort = req.data.ort;
		var beschreibung = req.data.beschreibung;
		
		var time1 = new Array(); 
		var time2 = new Array();
		time1 = "";
		time2 = "";
		
		/** split time info */
		time1 = startzeit.toString().split(":");
		time2 = endzeit.toString().split(":");
		
		res.writeln("month: " + startmonth);
		res.writeln("day: " + startday);    // returns day of the month
		res.writeln("year: " + startyear);
		
		res.writeln("datumend: " + datumend);
		
		res.writeln("days in month: " + this.daysInMonth(7, 2012));
		
		//res.write(time2);
		
		re = /^\d{1,2}:\d{2}([ap]m)?$/;
		
		if(!startzeit.match(re) || !endzeit.match(re)) {
			error = "Zeitangabe muss die Form HH:MM haben!";
		} 
		if (ort == "") {
			error = "Terminort muss angegeben werden!";
		} 
		if (datumstart == "" || datumend == "") {
			error = "Bitte Datum eingeben!"; 
		}
		
		if(datumstart != datumend) {
			// newAppointmentArray
			if(repeat == "w" && startyear <= endyear) {  // repeat every week
				// date format: month/day/year
				if(startyear == endyear) {
				
				}
				
				
				
				
				
			} error = "Fehler Termineingabe!";
			
		}
		
		
		/*
		
		if (startzeit.match(re) && endzeit.match(re) && (ort != "") && datumstart != "") {
			
			
			
			
			//res.write(time1);
			//res.write(time2);
		
		
			var newAppointment = new Termine();
			//res.writeln(startzeit);
			newAppointment.titel = titel;
			newAppointment.beschreibung = beschreibung;
			newAppointment.tag = "findet statt";
			newAppointment.datum = new Date(datum);
			newAppointment.startzeit = new Date(2012, 02, 02, time1[0], time1[1],00, 00);
			newAppointment.endzeit = new Date(2012, 02, 02, time2[0], time2[1], 00, 00);
			//res.writeln("1");
			newAppointment.ort = ort;
			newAppointment.gruppeID = session.data.grpId;
			newAppointment.personID = session.user._id;
			root.termine.add(newAppointment); // in db schreiben
			
			res.redirect(root.href("groupAppointment") + "?groupId=" + session.data.grpId);
		} else {	
			res.data.errorNewAppointment = "Fehler: " + error;
			
			if(titel == "Training") res.data.selectTraining = "selected";
			if(titel == "Spiel") res.data.selectSpiel = "selected";
			else res.data.selectSonstiges = "selected";
			
			res.data.beschreibung = beschreibung;
			res.data.tag = "findet statt";
			
			//res.data.datum = new Date(datum);
			//res.data.startzeit = new Date(2012, 2, 2, time1[0], time1[1],0, 0);
			//res.data.endzeit = endzeit = new Date(2012, 02, 02, time2[0], time2[1], 00, 00);
			
			res.data.ort = ort;
			root.renderGruppe("appointmentError");
		}
		
		*/
		
	} else {
		res.redirect(root.href(""));
	}
	
}

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}
                  