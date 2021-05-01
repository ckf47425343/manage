//基础配置
//一个文件只有module.exports导出,可以有多个exports导出
//exports导出，相当于给module.exports添加属性

//服务器配置
exports.serverOptions = {
  host: 'http://119.23.66.217',
  // host: 'http://127.0.0.1',
  
  port: 3000,
  baseUrl:'/static/file'
}
//配置数据库数据
exports.mysqlOptions={
  //数据库名称
  database:'server_db',
  //用户名称
  username:'root',
  //密码
  password:'root123',
  //地址
  host:'localhost',
  //数据库类型
  dialect:'mysql',
  //时区
  timezone:'+8:00',
  //force的值
  forceVal:false




}
//邮件配置, 验证码
exports.emailOptions = {
  //邮件服务器地址
  host: 'smtp.qq.com',

  //端口, 25端口在阿里云服务器被禁止的, 建议使用465
  port: 465,

  //如果端口为465, 此项需要设置true, 其他端口需要修改为false
  secure: true,

  //用户名，发件地址
  user: '47425343@qq.com',

  //授权码
  pass: 'qsrjqzdbrrqmbhdj',

  //验证码有效时间, 单位：毫秒
  expires: 5 * 60 * 1000
}

//匹配随机名字
exports.nickNameOptions = ["蓝天", "白云", "大海", "陆地", "高山"]

//加密
exports.saltOptions = {
  pwd: '?pwd_'
}
//拦截
exports.codeUrlOptions = ['/register']
//配置请求域
exports.hostOptions = [
  'http://127.0.0.1:8081',
  'http://127.0.0.1:8080',
  'http://119.23.66.217',
  'http://119.23.66.217:80',
  'http://119.23.66.217:8081']
//token加盐
exports.tokensaltOption = {
  //token加盐
  salt: '_t_k',
  //有效时间
  expires: '1d'
}
exports.tokenUrlsOption = [
  '/test',
  '/getTypeData',
  '/postProduct',
  '/getUerInfo',
  '/search',
   '/count',
   '/updown',
   '/probyid',
  '/updateProduct',
  '/remove',
  '/uploadBanner',
  '/getBannerAllData',
  '/updateUserInfo'
   ]

