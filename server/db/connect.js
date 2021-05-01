let {Sequelize}=require('sequelize')

//连接mysql数据库
let sequelize = new Sequelize(config.mysqlOptions.database,config.mysqlOptions.username,config.mysqlOptions.password, {
    //数据库地址
    host:config.mysqlOptions.host,
    //数据库类型
    dialect:config.mysqlOptions.dialect,
    //时区
    timezone:config.mysqlOptions.timezone,
  
    //字段命名 以 _ 分隔
    define: {
      underscored: true
    }
  })
  async function fn() {
    try {
      await sequelize.authenticate();
      console.log('connect to mysql successfully.');
    } catch (err) {
      console.log('connect to mysql failed');
      console.log('err ==> ', err);
    }
  }
  fn()
  module.exports=sequelize

  