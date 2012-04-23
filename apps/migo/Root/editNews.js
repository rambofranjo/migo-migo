function editNews_action() {
	if ((req.data.groupId) && (req.data.newsId)) {
		
		var grpId = req.data.groupId;
		var nId = req.data.newsId;
		
		if ((session.user != null) && (root.isUserInGroupAndAdmin(session.user._id, grpId))) {
			
			if (this.isNewsInGroup(nId, grpId)) {
				
				var n = root.news.getById(nId);
				
				/* --- save button gedrückt -- */
				if (req.data.edit) {
					
					//News bearbeiten
					var title = req.data.title;
					var text = req.data.text;
					
					//Überprüfungen
					if ((title != "") && (text != "")) {
						n.titel = title;
						n.text = text;
						
						//Gruppe News rendern
						root.renderGruppe("news");
						
						//Zurück zu News leiten
						res.redirect(root.href("groupNews") + "?groupId=" + session.data.grpId);	
					} else {
						res.data.errorEditNews = "Fehler aufgetreten!"
						res.data.nTitle = title;
						res.data.nText = text;
						res.data.nId = nId;
						res.data.grpId = grpId;
						
						//Gruppeninfos mit edit News rendern
						root.renderGruppe("editNews");
					}
				
				} else if (req.data.cancel) {
					res.redirect(root.href("groupNews") + "?groupId=" + session.data.grpId);
				} else {
					//Daten im Formular setzen
					res.data.nText = n.text;
					res.data.nTitle = n.titel;
					res.data.nId = nId;
					res.data.grpId = grpId;

					//Gruppeninfos mit edit News rendern
					root.renderGruppe("editNews");
				}
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