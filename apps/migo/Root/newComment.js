function newComment_action() {

	if ((session.user != null) && (req.data.save)) {
		
		var error = "";
		var text = req.data.text;
		var nId = req.data.newsId;
		
		if ((text != "")) {
			
			var c = new Kommentare();  
			c.text = text;
			c.datum = new Date();
			c.uhrzeit = new Date();
			c.newsID = nId
			c.personID = session.user._id;
			
			root.comments.add(c); 
			res.redirect(root.href("groupNews") + "?groupId=" + session.data.grpId + "&newsId=" + nId);
		} else {	
			res.redirect(root.href("groupNews") + "?groupId=" + session.data.grpId + "&newsId=" + nId);
		}
		
	} else {
		res.redirect(root.href(""));
	}
}