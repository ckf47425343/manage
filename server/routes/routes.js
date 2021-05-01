

//导入路由控制器
let routesController=require(__basename+'/routes_controller/routes_controller.js')
//导出路由函数
module.exports=app=>{
    //请求域拦截host
    app.use(routesController.verifyHost)

    // 白名单拦截 验证码拦截
    app.use(routesController.verifyCode)
    //白名单拦截 检验token
    app.use(routesController.verifyToken)
    //注册
    app.post('/register',routesController.register);
   //发邮件
   app.post('/email',routesController.email);
   //登录
   app.post('/login',routesController.login);
   //获取商品类型
   app.get('/type',routesController.getTypeData)
   //获取用户信息
   app.get('/getUerInfo',routesController.getUerInfo)
   //发布商品
   app.post('/postProduct',routesController.postProduct)
  //获取商品数量
   app.get('/count',routesController.getProductCount)
  //搜素商品
   app.get('/search',routesController.search)
  //上下架商品
   app.post('/updown',routesController.upDownSelf)
  //通过id获取商品内容
   app.get('/probyid',routesController.getProductById)
  //更新商品
   app.post('/updateProduct',routesController.updateProduct)
  //删除
   app.post('/remove',routesController.removeProduct)
  // //发布轮播图
   app.post('/uploadBanner',routesController.uploadBanner)
  //获取轮播数据
  app.get('/getBannerAllData',routesController.getBannerAllData)
  //更新用户信息
  app.post('/updateUserInfo',routesController.updateUserInfo)

   //测试
   app.get('/test',routesController.testData)

  

    
}

