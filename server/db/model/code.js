let {DataTypes, Model} = require('sequelize');

class Code extends Model {}

// console.log("定义模型")
//定义模型结构, 数据表结构
Code.init({
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

  codeId: {
    type: DataTypes.STRING(30),
    allowNull: false,
    //默认值
    defaultValue:'',
    comment: '验证码id'
  },
  email: {
    type:DataTypes.STRING(40),
    allowNull: false,
    defaultValue: '',
    comment: '邮箱'
  },

  text: {
    type: DataTypes.STRING(6),
    allowNull: false,
    defaultValue:'',
    comment: '验证码'
  },

 
}, {

  //指定连接实例，这样才知道在指定数据库创建user表
  sequelize,

  //模型名称, 当没有指定表名时，sequelize推断名称为模型名称的复数 ==> users作为表名
  modelName: 'code',

  //不推断，直接使用模型作为表名 ==> user作为表名
  freezeTableName: true,

  //指定表名
  tableName: 'code'
})

//同步数据库表
//force: true ==> 删除原有user表，新建user表
//force: false ==> 如果user存在，则不创建，反之，不创建user表
Code.sync({force: config.mysqlOptions.forceVal});

module.exports =Code;