function newNews_action() {

	if ((session.user != null) && (req.data.save)) {
		
		var error = "";
		
		var title = req.data.title;
		var text = req.data.text;
		
		if ((title != "") && (text != "")) {
			
			var newNews = new News();  
			newNews.titel = title;
			newNews.text = text;
			newNews.datum = new Date();
			newNews.uhrzeit = new Date();
			newNews.tag = "News"
			newNews.gruppeID = session.data.grpId;
			newNews.personID = session.user._id;
			
			root.news.add(newNews); 
			res.redirect(root.href("groupNews") + "?groupId=" + session.data.grpId);
		} else {	
			res.data.errorNewNews = "Fehler: Bitte alle Felder ausf&uuml;llen!";
			res.data.newNewsTitle = title;
			res.data.newNewsText = text;
			root.renderGruppe("newsError");
		}
		
	} else {
		res.redirect(root.href(""));
	}
}