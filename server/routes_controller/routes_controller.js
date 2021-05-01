const { findData } = require("../api/api")


let utils = require(__basename + '/utils/utils.js')

let api = require(__basename + '/api/api.js')

let url = config.serverOptions.host

if (config.serverOptions.port) {
  url += ":" + config.serverOptions.port
}
url += config.serverOptions.baseUrl

//导入nodemailer, 用于发邮件

class RoutesController {
  //测试数据
  testData(req, res) {
    // console.log("test==>",)
    // res.send("test====")
    console.log("test==>")
  }


  //请求域拦截

  verifyHost(req, res, next) {

    if (config.hostOptions.indexOf(req.headers.origin) == -1) {
      return res.send({ msg: '请求域不合法', status: 1020 })
    }

    next();
  }
  //验证码拦截
  verifyCode(req, res, next) {
    let url = req.url.split('?')[0];
    if (config.codeUrlOptions.indexOf(url) > -1) {
      console.log("verifyCode register")
      //根据codeId查询验证码信息
      api.findData({
        modelName: 'Code',
        condition: {
          codeId: req.body.codeId
        }
      }).then(result => {
        //获取当前时间和有效时间的差
        let time = new Date().getTime() - config.emailOptions.expires
        //获取验证码保存时间
        let codeTime = new Date(result[0].dataValues.createdAt).getTime()
        //验证是否是否通过

        let isPass = req.body.vaildcode == result[0].dataValues.text && req.body.email == result[0].dataValues.email && codeTime >= time

        console.log("isPass==>", isPass)
        if (isPass) {
          next()
        } else {
          res.send({ msg: '验证码有错', status: 1031 })
        }
        //获取当前事件 和 验证码有效时间
      }).catch(err => {
        console.log("find Code err==>", err)
        res.send({ msg: '验证码有错', status: 1031 })
      })
    } else {
      console.log("is not register")
      next()
    }
  }
  //检验token是否登录
  verifyToken(req, res, next) {

    let url = req.url.split('?')[0]

    if (config.tokenUrlsOption.indexOf(url) > -1) {
      if (!req.headers.token) {
        return res.send({ msg: '请先登录', status: 1034 })
      }

      //把token转化为字符串
      let cookie = utils.transformToken(req.headers.token)
      let token = [cookie.mama10, cookie.nana20, cookie.mama20].join('.')


      //验证token是否有效
      utils.verifyToken(token).then(result => {
        //解析出来的userId
        req.userId = result.data
        console.log("result.data==>", result.data)
        next()
      }).catch(err => {
        console.log("err==>", err)
        res.send({ msg: '请重新登录', status: 1034 })
      })

    } else {
      next()
    }
  }
  //注册
  register(req, res) {
    //查询邮箱是否已经注册
    api.findData({
      modelName: 'User',
      condition: {
        email: req.body.email
      },
      attributes: ['email']
    }).then(result => {

      if (result.length > 0) {
        res.send({ msg: '邮箱已经注册过', status: 1002 })
      } else {



        //创建用户Id 
        let userId = '_uid' + new Date().getTime();
        //随机呢称
        let index = Math.floor(Math.random() * config.nickNameOptions.length);

        let nickName = config.nickNameOptions[index] + userId

        let password = utils.encodeString(req.body.password);
        //添加的用户信息
        let data = {
          email: req.body.email,
          userId,
          nickName,
          password
        }

        api.createData('User', data).then(result => {

          res.send({ msg: '用户注册成功', status: 1000 })
        }).catch(err => {

          res.send({ msg: '用户注册失败', status: 1001 })
        })
      }
    }).catch(err => {

      res.send({ msg: '用户注册失败', status: 1001 })
    })
  }
  //发邮箱
  email(req, res) {
    //生城验证码
    let code = utils.RandomCode()

    console.log("code==>", code)
    //生成验证码唯一codeId
    let codeId = 'cid' + new Date().getTime()

    //先把验证码储存起来再发给客户
    api.createData('Code', {
      email: req.body.email,
      text: code,
      codeId
    }).then(result => {
      if (result.dataValues) {
        utils.sendEmail({
          to: req.body.email,
          subject: '验证码',
          text: `验证码为${code},五分钟失效`
        }).then(result => {
          console.log("发送成功result==>", result)
          res.send({ msg: `验证码已发至${result.accepted[0]}`, cid: codeId, status: 1010 })
        }).catch(err => {
          res.send({ msg: '验证码获取失败', status: 1011 })
        })
      }
    }).catch(err => {
      res.send({ msg: '验证码获取失败', status: 1011 })
    })




  }
  //登录
  login(req, res) {
    //查询数据库是否存在用户
    api.findData({
      modelName: 'User',
      condition: {
        email: req.body.email
      },
      attributes: ['userId', 'password']
    }).then(result => {
      //判断是否存在此用户
      if (result.length > 0) {
        console.log("login success==>", result)
        //判断密码是否正确
        let password = utils.encodeString(req.body.password)
        if (password == result[0].dataValues.password) {
          //生成token,加密字符串
          let token = utils.signToken(result[0].dataValues.userId)

          let ts = token.split('.')

          let tsObj = {
            mama10: ts[0],
            nana20: ts[1],
            mama20: ts[2],
            //干扰项
            nana19: 'asdhkalshdlsahSFSDfsdafsdgDSFSDFgsdg'
          }

          res.send({ msg: '登录成功', status: 1030, data: tsObj, time: config.tokensaltOption.expires })


        } else {
          res.send({ msg: '用户名或者密码错误', status: 1033 })
        }
      }
      else {
        res.send({ msg: '没有此用户', status: 1032 })
      }
    }).catch(err => {
      res.send({ msg: '登录失败', status: 1031 })
    })

    //获取token值


  }
  //获取用户信息
  getUerInfo(req, res) {
    console.log("req.userId==>", req.userId)
    api.findData({
      modelName: 'User',
      condition: {
        userId: req.userId
      }
    }).then(result => {
    result=result[0].dataValues
      delete result.password
    
      res.send({ msg: '获取用户信息成功', status: 1040,result,url})
    }).catch(error => {
      res.send({ msg: '获取用户信息失败', status: 1041 })
    })
  }
  //获取商品类型数据
  getTypeData(req, res) {
    api.findData({
      modelName: 'Type',
    }).then(result => {
      res.send({ msg: '成功获取商品类型数据', status: 1050, result })
    }).catch(error => {
      res.send({ msg: '获取商品类型失败', status: 1051 })
    })
  }
  //发布商品
  postProduct(req, res) {
    //先上传图片
   
    let promise = [
      utils.uploadImg(req.body.img, req.body.imgType),
      utils.uploadImg(req.body.detail_img, req.body.detailImgType)
    ]
    //所有图片上传完,再将商品数据写进数据库
    Promise.all(promise).then(result => {
      //商品数据
      let productData = Object.assign({}, req.body)
     
      productData.img = result[0]
      productData.detail_img= result[1]
      productData.sale_count='0'
      let typeId = productData.type_id
      delete productData.type_id
      delete productData.imgType
      delete productData.detailImgType
      //生成商品pid
      productData.pid = 'pid' + new Date().getTime()
      console.log("typeId======>", typeId, productData.pid)
      //启动事务处理
      api.transaction(t => {

        return Promise.all([
          //添加商品数据
          api.createData('Product', productData, t),
          //添加商品和类型联表的数据
          api.createData('ProductType', {
            pid: productData.pid,
            typeId
          }, t),
          //添加用户和商品的联表数据

          api.createData('UserProduct', {
            userId: req.userId,
            pid: productData.pid
          }, t)
        ])
      }).then(result2 => {
        res.send({ msg: '发布商品成功', status: 1060, result2 })
      }).catch(error2 => {
        console.log("error2==>",error2)
        res.send({ msg: '发布商品失败', status: 1061 })
      })
    }).catch(error => {
      console.log("error==>",error)
      res.send({ msg: '发布商品失败', status: 1061 })
    })
  }
  //搜索商品
  search(req, res) {
    //SQL预处理,防止SQL注入

    let sql = ''
    sql += "SELECT `p`.`name`,"
    sql += "`p`.`status`,"
    sql += "`p`.`pid`,"
    sql += "`p`.`desc`,"
    sql += "`p`.`img`,"
    sql += "`p`.`price`,"
    sql += "`t`.`title`,"
    sql += "`t`.`type_id`,"
    sql +=" `p`.`save_count`,"
    sql +=" `p`.`sale_count`,"
    sql += "`up`.`user_id`,"
    sql += "`p`.`updated_at`"
    
    sql += "FROM `product` AS `p`"
    sql += "INNER JOIN `product_type` AS `pt` ON `p`.`pid` = `pt`.`pid`"
    sql += "INNER JOIN `type` AS `t` ON `t`.`type_id` = `pt`.`type_id`"
    sql += "INNER JOIN `user_product` AS `up` ON `up`.`pid` = `p`.`pid`"
    sql += " AND `up`.`user_id`= :userId"



    //查询条件
    let params = {
      userId: req.userId,
      count: Number(req.query.count),
      offset: Number(req.query.offset)
    }
    //判断是否按名称查询(模糊查询)
    if (req.query.name) {
      sql += " AND `P`.`name` LIKE '%" + req.query.name + "%'"
      params.name = req.query.name
    }

    //判断是否按类型询
    if (req.query.type_id) {
      sql += " AND `pt`.`type_id`= :type_id"
      params.type_id = req.query.type_id
    }

    //判断根据状态来查询
    if (req.query.status) {
      sql += " AND `p`.`status`= :status"
      params.status = req.query.status
    }

    //判断是否根据日期来查询
    if (req.query.updated_at) {


    

      sql += " AND `p`.`updated_at` >=:start"
      sql += " AND `p`.`updated_at` <=:end"

      params.start = `${req.query.updated_at} 00:00:00`
      params.end = `${req.query.updated_at} 23:59:59`

    }
    //判断是否根据日期来查询
    if (req.query.start&&req.query.end) {


    

      sql += " AND `p`.`updated_at` >=:start"
      sql += " AND `p`.`updated_at` <=:end"

      params.start = `${req.query.start} 00:00:00`
      params.end = `${req.query.end} 23:59:59`

    }
    //排序并且分页
    sql += " ORDER BY `p`.`updated_at` DESC LIMIT  :offset , :count ";
    //原始查询
    api.query(sql, params).then(result => {
      res.send({ msg: '查询商品成功', status: 1070, result, url })
    }).catch(err => {
      console.log("err=>", err)
      res.send({ msg: '查询商品失败', status: 1071 })
    })



    //排序并且分页




    //


    //

  }
  //查询商品数量
  getProductCount(req, res) {

    //SQL预处理,防止SQL注入  
    let sql = ''
    sql += "SELECT COUNT(`p`.`pid`) AS `count`"
    sql += "FROM `product` AS `p`"
    sql += "INNER JOIN `product_type` AS `pt` ON `p`.`pid` = `pt`.`pid`"
    sql += "INNER JOIN `type` AS `t` ON `t`.`type_id` = `pt`.`type_id`"
    sql += "INNER JOIN `user_product` AS `up` ON `up`.`pid` = `p`.`pid`"
    sql += " AND `up`.`user_id`= :userId"
    //查询条件
    let params = {
      userId: req.userId
    }
    //判断是否按名称查询(模糊查询)
    if (req.query.name) {
      sql += " AND `P`.`name` LIKE '%" + req.query.name + "%'"
      params.name = req.query.name
    }

    //判断是否按类型询
    if (req.query.type_id) {
      sql += " AND `pt`.`type_id`= :type_id"
      params.type_id = req.query.type_id
    }

    //判断根据状态来查询
    if (req.query.status) {
      sql += " AND `p`.`status`= :status"
      params.status = req.query.status
    }

    //判断是否根据日期来查询
    if (req.query.updated_at) {


      console.log("req.query.updated_at==>", req.query.updated_at)

      sql += " AND `p`.`updated_at` >=:start"
      sql += " AND `p`.`updated_at` <=:end"

      params.start = `${req.query.updated_at} 00:00:00`
      params.end = `${req.query.updated_at} 23:59:59`

    }
    //排序并且分页
    //原始查询
    api.query(sql, params).then(result => {
      res.send({ msg: '查询商品数量成功', status: 1080, result })
    }).catch(err => {
      console.log("err=>", err)
      res.send({ msg: '查询商品数量失败', status: 1081 })
    })


    //排序并且分页




    //


    //


  }
  //上下架商品
  upDownSelf(req, res) {
    api.updateData('Product',
      { status: req.body.status },
      { pid: req.body.pid }).then(result=>{
        res.send({msg:'上下架商品成功',status:1090,result})
      }).catch(error=>{
        res.send({msg:'上下架商品失败',status:1091})
      })
  }
  //通过id获取商品
  getProductById(req,res){
    let sql = ''
    sql += "SELECT `p`.`name`,"
    sql += "`p`.`status`,"
    sql += "`p`.`pid`,"
    sql += "`p`.`desc`,"
    sql += "`p`.`img`,"
    sql += "`p`.`detail_img`,"
    sql += "`p`.`price`,"
    sql += "`p`.`save_count`,"
    sql += "`p`.`sale_count`,"
    sql += "`t`.`title`,"
    sql += "`t`.`type_id`,"
    sql += "`up`.`user_id`"
    sql += "FROM `product` AS `p`"
    sql += "INNER JOIN `product_type` AS `pt` ON `p`.`pid` = `pt`.`pid`"
    sql += "INNER JOIN `type` AS `t` ON `t`.`type_id` = `pt`.`type_id`"
    sql += "INNER JOIN `user_product` AS `up` ON `up`.`pid` = `p`.`pid`"
    sql += " AND `up`.`user_id`=:userId"
    sql += " AND `up`.`pid`=:pid"

  api.query(sql,{userId:req.userId,pid:req.query.pid}).then(
    result=>{
      res.send({msg:'获取商品信息成功',status:1070,result,url})
    }
  ).catch(error=>{
    
     res.send({msg:'获取商品信息错误',status:1071})
  })
  }
  //更新商品
  updateProduct(req,res){
   //处理Product和ProductType的事物
   function updataProAndType(productData){
    api.transaction(async (t)=>{
      await api.updateData('Product',productData,{pid},t)

      await  api.updateData('ProductType',{typeId},{pid},t)

    }).then(result1=>{
      
      res.send({msg:'商品上传成功',status:1100,result1})
      
    }).catch(error1=>{
      res.send({msg:'商品更新失败',status:1101})
    })
   }
   function updatePro(productData){
     console.log("pid=====>",pid)
    api.updateData('Product',productData,{pid}).then(result2=>{
        
      res.send({msg:'商品更新成功',status:1100,result2})

    }).catch(error2=>{
      console.log("error error  error",error2)
      res.send({msg:'商品更新失败',status:1101})
    })
   }
   function updateType(typeId){
     
    api.updateData("ProductType",{typeId},{pid}).then(result3=>{
      res.send({msg:'商品更新成功',status:1100,result3})
    } 
    ).catch(error3=>{
      
      res.send({msg:'商品更新失败',status:1101})
    })
   }
  

    //首先查看是否要更新图片数据,如果更新图片就先保存图片
 

  let productData=Object.assign({},req.body)
  
  let promise=[]

  let imgs=[]
  
  let pid=productData.pid

  let typeId=productData.type_id
  
  delete productData.imgType
  delete productData.detailImgType
  delete productData.type_id
  delete productData.pid

  console.log("pid,typeId========>",pid,typeId)
  if(req.body.img){
    imgs.push('img')
    promise.push(utils.uploadImg(req.body.img,req.body.imgType))
  }

  if(req.body.detail_img){
    imgs.push('detail_img')
    promise.push(utils.uploadImg(req.body.img,req.body.detailImgType))
  }
  
  if(promise.length>0){
    //当有图片的时候,上传完了图片再上传到数据库
   Promise.all(promise).then(result=>{
    imgs.map((v,i)=>{
      productData[v]=result[i]
    })
   //判断是否要更新商品类型,如果更新就要进行事务处理
   if(typeId){
   
    updataProAndType(productData)
   
   }else{
    
    updatePro(productData)
   }
   
   }).catch(error=>{
    console.log("error error  error")
     res.send({msg:'商品更新失败',status:1101})
   })
  
  


  }
   //当不上传图片时候
  else{
  //当商品typeId为真,商品也有数据,要进行事务处理
  if(typeId && JSON.stringify(productData)!="{}"){
   updataProAndType(productData)
  }
  else if(typeId && JSON.stringify(productData)=="{}"){
    console.log("productData==>",productData)
    updateType(typeId)
  }
  else{
    console.log("productData==>",productData)
    updatePro(productData)
  }

  }

 
      



  }
  //删除商品
  removeProduct(req,res){
    let pid=req.body.pid
    let user_id=req.body.user_id
    console.log(pid,user_id)
    api.transaction(async t=>{
    
    await  api.removeData('UserProduct',{pid,user_id},t)

    await  api.removeData('ProductType',{pid},t)

    await  api.removeData('Product',{pid},t)

    }).then(result=>{
     res.send({msg:'删除商品成功',status:1200,result})
    }).catch(error=>{
      console.log("error===>",error)
     res.send({msg:'删除商品失败',status:1201})
    })
  
  }
  
  //上传轮播图
  uploadBanner(req,res){

    
    api.findData({
     modelName:'Banner',
     condition:{title:req.body.title}
    }).then(result=>{
      console.log("result.length====>",result)
      if(result.length>0){
        res.send({msg:'标题已经存在',status:1302})
      }
    })
       
    utils.uploadImg(req.body.imgSrc,req.body.imgType).then(result=>{
    
      req.body.imgSrc=result
      req.body.bid='_bid'+new Date().getTime()
      api.createData('Banner',req.body).then(result1=>{
         
          res.send({msg:'数据上传成功',status:1300,result:result1})
      }).catch(error1=>{
        console.log("error1==>",error1)
         res.send({msg:'数据上传失败',status:1301})
      })

    }).catch(error=>{
   
      res.send({msg:'数据上传失败',status:1301})
    })

  
   
   
   
  }
  //获取轮播数据
  getBannerAllData(req,res){
   
  api.findData({
    modelName:'Banner',
  }).then(result=>{
    res.send({msg:'获取数据成功',status:1040,result,url})
  }).catch(error=>{
    res.send({msg:'获取数据失败',status:1041})
  })
  
  
  }
  //更改图片信息
  updateUserInfo(req,res){
    // console.log("692 result==>",req.body)
  
    
    if(req.body.avatar){
      console.log("成功进来")
      utils.uploadImg(req.body.avatar,req.body.type).then(result=>{
        

        api.updateData('User',{avatar:result},{userId:req.userId}).then(result1=>{
      
          res.send({msg:'用户更新信息成功',status:1050,result,url})

        }).catch(error=>{
          res.send({msg:'用户更新信息失败',status:1051})
        })
       
     }).catch(error=>{
      res.send({msg:'用户更新信息失败',status:1051})
     })
     }
    else if(req.body.password){
  
    }
    else if(req.body.email){
     
    }
    else{
      api.updateData('User',req.body,{userId:req.userId}).then(result=>{
        res.send({msg:'用户信息更新成功',status:1050,result})
      }).catch(error=>{
        res.send({msg:'用户信息更新失败',status:1051})
      })
    }
  
   

   
    
  }
  
}


//导出实例
module.exports = new RoutesController()