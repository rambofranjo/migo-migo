function deleteComment_action() {
	if ((req.data.groupId) && (req.data.cId) && (req.data.newsId)) {
		
		var grpId = req.data.groupId;
		var cId = req.data.cId;
		var nId = req.data.newsId;
		
		if ((session.user != null) && (root.isUserInGroup(session.user._id, grpId))) {
			
			if (this.isUserOwnerOfComment(cId) || (root.isUserInGroupAndAdmin(session.user._id, grpId))) {
				
				//löschen
				var c = root.comments.getById(cId);
				c.remove();
				
				//Zurück zu News leiten
				res.redirect(root.href("groupNews") + "?groupId=" + session.data.grpId + "&newsId=" + nId);
			}
			
		} else {
			res.redirect(root.href(""));
		}
	}
}

function isUserOwnerOfComment (cId) {
	for (var i = 0; i < root.comments.count(); i++) {
		if (cId == root.comments.get(i)._id) {
			if (session.user._id == root.comments.get(i).personID) {
				return true;
				break;	
			}
		}
	}
	return false;
}