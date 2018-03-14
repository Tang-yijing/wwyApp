var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');

const IP = '192.168.43.31'
// const IP = '192.168.0.103'






// 获取播放信息
router.get('/playDate', function (req, res) {
	http.post(IP + ':8083/wyy_hit/find', req.query).then(function (data) {
		res.send(data);
	})
});



module.exports = router;
