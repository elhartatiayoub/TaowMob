/*	The helloWorld() function can be executed from any of your project's server-side JavaScript file using the require() method as follows:
	var result = require('utils').helloWorld();

	For more information, refer to http://doc.wakanda.org/Wakanda Studio0.Beta/help/Title/en/page3355.html
*/
exports.parseCookies = function (c) {
	var res = {};
	c = c.split(';');
	c.forEach(function(item){
		item = item.split('=');
		res[item[0].trim()] = item[1].trim();
	});
	
	return res;
};
