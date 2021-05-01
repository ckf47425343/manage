
//导入模型
 let User=require(__basename+'/db/model/user.js')
 let Code=require(__basename+'/db/model/code.js')
 let Type=require(__basename+'/db/model/type.js')
 let Product=require(__basename+'/db/model/product.js')
 let ProductType=require(__basename+'/db/model/product_type.js')
 let UserProduct=require(__basename+'/db/model/user_product.js')
 let Banner=require(__basename+'/db/model/banner.js')
 

 module.exports={
      User,
      Code,
      Type,
      Product,
      ProductType,
      UserProduct,
      Banner,
 }
 