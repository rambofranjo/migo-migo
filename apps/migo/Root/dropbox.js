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
		
			dbEntries += "<div class='dropBoxEntrie'>";
			if (root.isUserInGroupAndAdmin(session.user._id, session.data.grpId)) dbEntries += "<div class=\"dropboxDelete\" ><a href=" + 
				root.href("deleteDbEntrie") + "?dbId=" + dropBox._id + "&mode=" + mode + "><img src=\"../static/images/delete.png\" /></a></div>";
			dbEntries += "<div class='dropboxAuthor' >" + root.getPerson(dropBox.personID) + "</div>";
			dbEntries += "<div class='dropboxDate' >" + date.getDate() + "." + root.getMonthName(date.getMonth().toString()) + "." + date.getFullYear() + "</div>";
			dbEntries += "<div class='dropboxTime' >" + time.getHours() + ":" + time.getMinutes() + "</div>";
			dbEntries += "<div class='dropboxText' >" + dropBox.text + "</div>";
			dbEntries += "<div class='clear'></div></div>";
		
			count--;
			if (count == 0) break;
		}
	}
	
	return dbEntries;
}