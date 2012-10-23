function newAppointment_action() {
	
	if ((session.user != null) && (req.data.save)) {
		
		
		var selectedarea = req.data.selectedarea;
	
		res.write(selectedarea);
		
		
		
		
	} else {
		res.redirect(root.href(""));
	}
	
}
              