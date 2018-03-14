var express = require('express');
var router = express.Router();
var http = require('ykt-http-client');

// const IP = '192.168.43.31'
const IP = '192.168.0.101'


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



// 注册


// 手机号重复
router.post('/redPhone', function (req, res) {  
  http.post(IP + ':8083/user/find', req.body).then(function (data) {    
    res.send(data);
  })
});




	// 注册信息增加到数据库
router.post('/redADD', function (req, res) {
  req.body.phone = parseInt(req.body.phone);
  http.post(IP + ':8083/user/add', req.body).then(function (data) {    
    console.log('注册成功');
    res.redirect('login.html');
  })
});



//   -----------------------------------------------

// 登录
router.post('/changlogin', function(req, res) {
	let phone = req.body.phone;
	let psw = req.body.psw;
	http.post(IP + ':8083/user/find',{phone,psw,findType:'exact'}).then((msg) => {
		if(msg.length == 1){
			res.send('ok')
		}else{
			res.send('no')
		}
	})
});


//登录
//读取数据库数据，登陆成功跳到主页
router.post('/loginPage', function(req, res) {
  let param = {phone: req.body.phone, psw: req.body.psw,findType:"exact"};
  http.post(IP + ':8083/user/find', param).then(function(data){ 
      if(data.length == 1){  
        res.redirect('index.html');
      } else{
        res.redirect('login.html');
      }     
  })
});



// 推荐歌单

router.get('/hitDate', function (req, res) { 
	http.post(IP + ':8083/wyy_hit/find', req.query).then(function (data) {
	  res.send(data.rows);
	})
  });



module.exports = router;
