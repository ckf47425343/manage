//导入express
let express=require('express')
//创建exrpess实例
let app=express()
//导入ejs
let ejs=require('ejs')
//导入处理路径模块
let path=require('path')


//path.resolve()可以根据系统处理路径
//windows:\a\b\c
//linux:/a/a/a
//当前文件路径
console.log("__dirname==>",path.resolve(__dirname,'views'))
console.log("ejs==>",ejs)

app.set('views',path.resolve(__dirname,'views'))

//设置模板位html类型
app.set('view engine','html')
app.engine('.html',ejs.__express);

//设置静态目录，此时可以访问public文件夹中的任何静态文件
//可以在浏览器中访问测试
app.use(express.static(path.resolve(__dirname,'public')));

//路由
app.get('/',(req,res)=>{
    //渲染页面
    res.render('index')
})
// //关于我的yemian
// app.get('/about',(req,res)=>{
//     res.render('about')
// })
// //登录
// app.get('/login',(req,res)=>{
//     res.render('login')
// })
// //
// app.get('/product',(req,res)=>{
//     let data=[
//               {'title':'衣服','type':'clothes'},
//               {'title':'鞋子','price':'shoes'}
//              ]
//      res.send(
//         {   
//             code:100,
//             msg:'请求成功',
//             data
//         }
//      )
// })
//监听端口
app.listen(8081,()=>{
    console.log("服务器运行于http://119.23.66.217")
})
