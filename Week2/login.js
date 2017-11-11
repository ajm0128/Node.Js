var request = require('request');

var options = {
	headers : {
		"X-Naver-Client-Id" : "wO66oCuNXggqTMcGAzgo",
		"X-Naver-Client-Secret" : "hWihPw2XxX"
	},
	method : 'get',
	encoding: "utf-8",
	url : 'https://openapi.naver.com/v1/search/local.xml',
	qs : {
	  query : "GS25",
	  display : 1,
	  start : 1,
	  sort : "random"
	}
}

request(options, function(err, res, html) {
	console.log(html);
});