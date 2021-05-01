let {DataTypes, Model} = require('sequelize');

class ProductType extends Model {}


// console.log("定义模型")
//定义模型结构, 数据表结构
ProductType.init({
  id:{
    //数据类型：INTEGER整型, UNSIGNED无符号
    type: DataTypes.INTEGER.UNSIGNED,
    //自动递增
    autoIncrement: true,
    //主键
    primaryKey: true,
    //不允许为null
    allowNull: false,
    //注释
    comment: '表id'
  },

  typeId: {
    type: DataTypes.STRING(30),
    allowNull: false,
    //默认值
    defaultValue:'',
    comment: '验证码id'
  },
  pid: {
    type: DataTypes.STRING(30),
    allowNull: false,
    //默认值
    defaultValue: '',
    comment:'商品id'
  }
 
}, {

  //指定连接实例，这样才知道在指定数据库创建user表
  sequelize,

  //模型名称, 当没有指定表名时，sequelize推断名称为模型名称的复数
  modelName: 'productType',

  //不推断，直接使用模型作为表名 ==> user作为表名
  freezeTableName: true,

  //指定表名
  tableName: 'product_type'
})

//同步数据库表
//force: true ==> 删除原有user表，新建user表
//force: false ==> 如果user存在，则不创建，反之，不创建user表
ProductType.sync({force: config.mysqlOptions.forceVal})

  

module.exports =ProductType;