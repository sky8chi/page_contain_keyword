//phantomjs keyword.js d:/temp/keyWord.txt d:/temp/readUrl.txt d:/temp/result.txt 10
var system = require('system');
if (system.args.length < 3) {
	console.log("Usage: " + system.args[0] + " keywordPath readPath writePath waitSec");
	phantom.exit();
}


var fs = require('fs');

var keyWordPath = system.args[1];
var readPath = system.args[2];
var writePath = system.args[3];
var waitSec = system.args[4] * 1000;

var eol = system.os.name == 'windows' ? '\r\n' : '\n';
var readAll = false;
var urlSize = 0;
function doPage(line, page, file, wfile) {
	return function(status) {
		console.log(line + "==" + status);
		if (status !== 'success') {
			wfile.write(line + "\t" + "请求失败" + eol);
			urlSize--;
		} else {
			setTimeout(function() {
				var pageContent = page.content;
				var containWordArr = [];
				for (var idx in keyWordArr) {
					var keyword = keyWordArr[idx].replace(/\r/g,"").replace(/\n/g, "");
					if (keyword.length>0 && pageContent.indexOf(keyword) != -1) {
						containWordArr.push(keyword);
					}
				}
				var content = containWordArr.length > 0 ? containWordArr.join(";") : "无";
				wfile.write(line + "\t" + content + eol);
				if (readAll && --urlSize <= 0) {
					file && file.close();
					wfile && wfile.close();
					console.log("All End");
					phantom.exit();
				}
			}, waitSec);
		}
	}
}

try {
	var file = fs.open(readPath, 'r');
	var wfile = fs.open(writePath, 'w');
	var keywordFile = fs.open(keyWordPath, 'r');
	keyWordContent = keywordFile.read();
	keyWordArr = keyWordContent.split(eol);
	content = file.read();
	if (content) {
		while(line = file.readLine()) {
			urlSize++;
			console.log("Start " + line);
			var page = require('webpage').create();
			page.open(line, doPage(line, page, file, wfile));
		}
	}
	readAll = true;
} catch(e) {
	console.log(e);
}

