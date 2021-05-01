let {DataTypes, Model} = require('sequelize');

class Product extends Model {}

// console.log("定义模型")
//定义模型结构, 数据表结构
Product.init({
  id: {
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
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
    defaultValue: '',
    comment: '商品昵称'
  },
  pid: {
    type: DataTypes.STRING(30),
    allowNull: false,
    //默认值
    defaultValue: '',
    comment:'商品id'
  },
  status:{
    type: DataTypes.STRING(10),
    allowNull: false,
    //默认值
    defaultValue: '',
    comment:'状态'
  },
  price: {
    type: DataTypes.STRING(30),
    allowNull: false,
    defaultValue: '',
    comment: '商品价格'
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: '',
    comment: '商品描述'
  },

  img: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: '',
    comment: '商品图片路径'
  },

  detail_img: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: '',
    comment: '商品详情图片路径'
  },
              
  save_count:{
    type:DataTypes.STRING(50),
    allowNull:false,
    defaultValue:'0',
    comment:'商品库存量'
  },
  sale_count:{
    type:DataTypes.STRING(50),
    allowNull:false,
    defaultValue:'0',
    defaultValue:'商品销售量'
  }
}, {

  //指定连接实例，这样才知道在指定数据库创建user表
  sequelize,

  //模型名称, 当没有指定表名时，sequelize推断名称为模型名称的复数 ==> users作为表名
  modelName: 'product',

  //不推断，直接使用模型作为表名 ==> user作为表名
  freezeTableName: true,

  //指定表名
  tableName: 'product'
})

//同步数据库表
//force: true ==> 删除原有user表，新建user表
//force: false ==> 如果user存在，则不创建，反之，不创建user表
Product.sync({force: config.mysqlOptions.forceVal});

module.exports = Product;