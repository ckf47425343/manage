let sequelize = require("../db/connect.js")

const {QueryTypes} =require("sequelize")


class API{
  //创建数据
  createData(modelName, o,t) {
    //o: 创建的数据, 类型: object

    //返回promise
    return t?model[modelName].create(o,{transaction:t}):model[modelName].create(o)
  }

  //查询
  findData(o) {
    //o.modelName: 模型名称, string 
    //o.condition: 查询条件, object
    //o.attributes: 查询字段, array ==> ['a', 'b'] 或者 具有别名 ['a', ['b', 'b别名']]
    return model[o.modelName].findAll({
      where: o.condition,
      attributes: o.attributes
    })
  }
 //更新
 updateData(modelName,values,condition,t){
   //modelName:模型名称,string
   //value:更新数据,obj
   //condition:条件，object,
   //t:事物处理对象，object
   if(t){
     return model[modelName].update(values,{
       where:condition,
       transaction:t
     })
   }else{
     return model[modelName].update(values,{
        where:condition
     })
   }
    
 }
 //删除
 removeData(modelName,condition,t){
   if(t){
     return model[modelName].destroy({
        where:condition,
        transaction:t
     })
   }
   return  model[modelName].destroy({
       where:condition
   })
    
 }
  //事务处理
  transaction(fn){

    return sequelize.transaction(fn)
    
  }
  //原始查询
  query(sql,replacements){
    //sql :SQL语句  string
    //replacements  替换SQL内容 object
    
    return sequelize.query(sql,{
      replacements,
      type:QueryTypes.SELECT
    })

  }

}
module.exports=new API()