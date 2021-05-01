
//导入crypto, 用于加密字符串, nodejs核心模块
let crypto = require('crypto');
//用于发邮寄
let nodemailer = require('nodemailer');
//jsonwebtoken用于登录验证
let jsonwebtoken=require('jsonwebtoken');
//导入系统文件模块,node.js核心模块
let fs=require('fs')




//发邮件配置
//创建发邮件实例
//qq: rkauiwpzloasjgbb
//126: VXBTIJIPHVGMOLFR
let transporter = nodemailer.createTransport({
  //服务器地址
  host:config.emailOptions.host,

  //端口, 25端口在阿里云服务器被禁止的, 建议使用465,
  port: config.emailOptions.port,

  //如果端口为465,此项需要设置true, 其他端口需要修改为false
  secure: config.emailOptions.secure,

  //授权认证
  auth: {
    //用户邮箱地址
    user: config.emailOptions.user,

    //授权码(不是邮箱登录密码)
    pass: config.emailOptions.pass
  }
})
class Utils {

  //加密字符串
  encodeString(value) {

    //将value切片
    value = value.slice(0, 3) + config.saltOptions.pwd + value.slice(3);

    //value: 被加密的字符串, string
    let md5 = crypto.createHash('md5');

    //以16进制输出，输出32个字符
    return md5.update(value).digest('hex');

  }
  //随机生成验证码
  RandomCode(){
    let code=[]
    for(let i=0;i<6;i++){
      
      code.push(Math.floor(Math.random()*10))
   
    }
    return code.join("")
   }

  //发邮件
  sendEmail(options) {
    //options: 发邮件配置, object
    //options.from: 发件地址, string
    //options.to: 收件地址, string, 如果多个接收地址需要写成 'aaa@.126.com, bbb@126.com, ccc@qq.com'
    //options.subject: 邮件主题, string
    //text和html二选一
    //options.text: 发件内容(文本内容)
    //options.html: 发件内容(可含有HTML标签)
    return new Promise((resolve, reject) => {
      transporter.sendMail({
        from:config.emailOptions.user,
        to: options.to,
        subject: options.subject,
        text: options.text
      }, (err, info) => {
        //如果发邮件失败
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      })
    })
  }
  //签名token
  signToken(value){
  //value:被签名的字符串
  //config.tokensaltOption:加盐
 return jsonwebtoken.sign({
   data:value
 },config.tokensaltOption.salt,{
   expiresIn:config.tokensaltOption.expires
 })
  }
  //解析Token
  verifyToken(token){
    console.log("token",token)
     return new Promise((resolve,reject)=>{
       jsonwebtoken.verify(token,config.tokensaltOption.salt,(err,info)=>{
         if(err){
           reject(err)
         }else{
           resolve(info)
         }
       })
     })
  }

  //转化token为字符串
  transformToken(cookie){   
  let cookieObj={}
 console.log(cookie)
  let cookies=cookie.split("; ")
  cookies.map(v=>{
   let c=v.split("=")
   cookieObj[c[0]]=c[1]
  })
  // return cookieObj
  console.log("cookieObj=>",cookieObj)
  return cookieObj
  
  }
   
  //上传图片
  uploadImg(base64,type){
    //base64:图片bse64,string,
    //type 图片类型
  return new Promise((resolve,reject)=>{
    //将base64转换buffer，因为base64在传输到后台时候,+号会直接转换成空格，所以需要将空格转换成+
    base64=base64.replace(/ /g,'+');
    //转换成buffer
    let buffer=Buffer.from(base64,'base64');
    //生成文件名
    let filename=Math.random().toString().slice(2)+new Date().getTime()+'.'+type;
    //使用文件系统将Buffer写入服务器
    fs.writeFile(__basename+'/upload/'+filename,buffer,err=>{
      if(err){
        //上传文件失败
        reject(err)
      }else{
        //上传文件成功
        resolve(filename)
      }
    })
  })
  }

}
module.exports = new Utils()