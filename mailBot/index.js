const nodemailer = require("nodemailer");
const { default: Axios } = require("axios");
const schedule = require("node-schedule");
// 发送邮件函数
async function sendMail(text) {
  var user = "xxx@qq.com";//自己的邮箱
  var pass = "xxxx"; //qq邮箱授权码,如何获取授权码下面有讲
  var to = "xxx@163.com";//对方的邮箱
  let transporter = nodemailer.createTransport({
    host: "smtp.qq.com",
    port: 587,
    secure: false,
    auth: {
      user: user, // 用户账号
      pass: pass, //授权码,通过QQ获取
    },
  });
  let info = await transporter.sendMail({
    from: `拾柒<${user}>`, // sender address
    to: `<${to}>`, // list of receivers
    subject: "hey，朋友", // Subject line
    text: text, // plain text body
  });
  console.log("发送成功");
}

//测试一下
// sendMail('你好')

function getHoneyedWords() {
  // 朋友圈
  // var url = "https://pyq.shadiao.app/api.php";
  //  毒鸡汤
  // var url = "https://du.shadiao.app/api.php";
  // 彩虹屁
  var url = "https://chp.shadiao.app/api.php";
  // 骂人
  // var url = "https://nmsl.shadiao.app/api.php";
  //获取这个接口的信息  
  return Axios.get(url);
}

//获取情话
getHoneyedWords().then(res=>{
  console.log(res.data)
  //发送邮件
  // sendMail(res.data);
})


//每天下午5点21分发送
// schedule.scheduleJob({ hour: 16, minute: 00 }, function () {
//   console.log("启动任务:" + new Date());
//   getHoneyedWords().then((res) => {
//     console.log(res.data);
//     sendMail(res.data);
//   });
// });