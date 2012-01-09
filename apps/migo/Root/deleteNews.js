function deleteNews_action() {
	if ((req.data.groupId) && (req.data.newsId)) {
		
		var grpId = req.data.groupId;
		var nId = req.data.newsId;
		
		if ((session.user != null) && (root.isUserInGroupAndAdmin(session.user._id, grpId))) {
			
			if (this.isNewsInGroup(nId, grpId)) {
				
				//löschen
				var n = root.news.getById(nId);
				n.remove();
				
				//Zurück zu News leiten
				res.redirect(root.href("groupNews") + "?groupId=" + session.data.grpId);
			}
			
		} else {
			res.redirect(root.href(""));
		}
	}
}

function isNewsInGroup (nId, gId) {
	for (var i = 0; i < root.news.count(); i++) {
		if (nId == root.news.get(i)._id) {
			if (gId == root.news.get(i).gruppeID) {
					return true;
					break;	
			}
		}
	}
	return false;
}