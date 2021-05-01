let {Model, DataTypes}=require('sequelize');



class Banner extends Model{}

Banner.init({
   
 id:{
     //数据类型:INTEGER整型,UNSIGNED无符号
     type:DataTypes.INTEGER.UNSIGNED,
    //自动递增
    autoIncrement: true,
     //不能为空
     allowNull:false,
     //主键
     primaryKey:true,
     //注释
     comment:'表id'
 },
 title:{
    type:DataTypes.STRING(30),
    allowNull:false,
    defaultValue:'',
    comment:'轮播主题'
 },
 bid:{
    type:DataTypes.STRING(30),
    allowNull:false,
    //默认值
    defaultValue:'',
    comment:'状态'
 },
 status:{
     type:DataTypes.STRING(10),
     allowNull:false,
     //默认值
     defaultValue:'',
 },
 imgSrc:{
     type:DataTypes.STRING(50),
     allowNull:false,
     defaultVaule:'',
     comment:'图片路径'
 },
 desc:{

     type:DataTypes.STRING,
     allowNull:false,
     defaultValue:'',
     comment:"描述"

 }
},{
    //指定连接实例，这样才知道在指定数据库创建表
    sequelize,

    modelName:'banner',

    freezeTabName:true,

    tableName:'banner'
})

//同步数据库表

Banner.sync({force:config.mysqlOptions.forceVal});
module.exports=Banner;




