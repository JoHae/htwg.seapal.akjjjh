/**
 	URL: http://www.example.com/?titel=test&trinken=bier&essen=schweinshaxe

	wasEssenWir = get_url_param('essen');
	wasTrinkenWir = get_url_param('trinken');
	titelDesEssens = get_url_param('titel');
 */

(function() {
	
	$.urlParam = function(name){
	    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");

		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( window.location.href );
		
		if ( results == null )
			return "";
		else
			return results[1];
	}
	
})();