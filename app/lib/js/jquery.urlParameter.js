/**
 * // example.com?param1=name&amp;param2=&amp;id=6
	$.urlParam('param1'); // name
	$.urlParam('id');        // 6
	$.urlParam('param2');   // null

	//example params with spaces
	http://www.jquery4u.com?city=Gold Coast
	console.log($.urlParam('city'));  
	//output: Gold%20Coast
	
	console.log(decodeURIComponent($.urlParam('city')));  
	//output: Gold Coast
 */

(function() {
	
	$.urlParam = function(name){
	    var results = new RegExp('[\\?&amp;]' + name + '=([^&amp;#]*)').exec(window.location.href);
	    return results[1] || 0;
	}
	
})();