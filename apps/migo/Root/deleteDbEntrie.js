function deleteDbEntrie_action() {
	if (req.data.dbId) {
		
		var dropboxEntrie = req.data.dbId;
		var mode = req.data.mode;
		
		if ((session.user != null) && (root.isUserInGroupAndAdmin(session.user._id, session.data.grpId))) {
			
			//löschen
			var dropbox = root.dropbox.getById(dropboxEntrie);
			dropbox.remove();
			
			var path = root.getPath(mode);
				
			//Zurückleiten
			res.redirect(root.href(path) + "?groupId=" + session.data.grpId);
			
		} else {
			res.redirect(root.href(""));
		}
	}
}