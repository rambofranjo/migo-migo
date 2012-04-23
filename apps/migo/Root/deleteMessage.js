function deleteMessage_action() {
	if ((req.data.groupId) && (req.data.msgId)) {
		
		var grpId = req.data.groupId;
		var mId = req.data.msgId;
		
		if ((session.user != null) && (root.isUserInGroup(session.user._id, grpId))) {
			
			if (this.isUserOwnerOfMessage(mId)) {
				
				//löschen
				var m = root.messages.getById(mId);
				m.remove();
				
				//Zurück zu Nachrichten leiten
				res.redirect(root.href("groupMessages") + "?groupId=" + session.data.grpId);
			}
			
		} else {
			res.redirect(root.href(""));
		}
	}
}

function isUserOwnerOfMessage (mId) {
	for (var i = 0; i < root.messages.count(); i++) {
		if (mId == root.messages.get(i)._id) {
			if (session.user._id == root.messages.get(i).empfaenger) {
				return true;
				break;	
			}
		}
	}
	return false;
}