let fs = require('fs');
let path = require('path');
let http = require('http');
let url = require('url');
let static = path.resolve(__dirname, "public"); // 静态资源目录
let server = http.createServer((req, res) => {
	let referer = req.headers['referer'] || req.headers['referered']; // 兼容性处理

	let pos = path.join(static, url.parse(req.url).pathname); // 处理成绝对路径
	fs.stat(pos, err => { // 先判断文件存不存在
		if (!err) {
			if (referer) { // 当存在referer
				let refererHost = url.parse(referer).hostname; // referer地址
				let host = req.headers['host'].split(':')[0]; // host地址

				if (refererHost !== host) {
					// 若不一致，则替换图片
					fs.createReadStream(path.join(static, '/fail.jpeg')).pipe(res);
				} else {
					// 若路径存在，可以正常显示
					fs.createReadStream(pos).pipe(res);
				}
			} else {
				// 第一次index.html的显示
				fs.createReadStream(pos).pipe(res);
			}
		} else {
			res.end("Not Found");
		}
	});

})
server.listen('8888', () => {
	console.log('服务器开启成功', '端口:8888');
})