function getDropBoxEntries (mode) {
	
	var count = 5;
	var dropBox = "";
	var dbEntries = "";
	
	for (var i = root.dropbox.count(); i >= 1; i--) {
		if (root.dropbox.get(i) == null) continue;
		if (session.data.grpId == root.dropbox.get(i).gruppeID) {
			dropBox = root.dropbox.getById(root.dropbox.get(i)._id);
			
			date = dropBox.datum;
			time = dropBox.uhrzeit;
		
			dbEntries += "<div id=\"dropboxEntries\" style = \"margin-bottom:5px; background-color:#FFF; padding:10px; border:1px solid #CCC;\" >";
			if (root.isUserInGroupAndAdmin(session.user._id, session.data.grpId)) dbEntries += "<div id=\"dropboxDelete\" ><a href=" + 
				root.href("deleteDbEntrie") + "?dbId=" + dropBox._id + "&mode=" + mode + "><img src=\"../static/images/delete.png\" /></a></div>";
			dbEntries += "<div id=\"dropboxAuthor\" >" + root.getPerson(dropBox.personID) + "</div>";
			dbEntries += "<div id=\"dropboxDate\" >" + date.getDate() + "." + root.getMonthName(date.getMonth().toString()) + "." + date.getFullYear() + "</div>";
			dbEntries += "<div id=\"dropboxTime\" >" + time.getHours() + ":" + time.getMinutes() + "</div>";
			dbEntries += "<div id=\"dropboxText\" >" + dropBox.text + "</div>";
			dbEntries += "</div>";
		
			count--;
			if (count == 0) break;
		}
	}
	
	return dbEntries;
}