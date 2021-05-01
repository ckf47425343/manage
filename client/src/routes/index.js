import Login from '../views/Login.js'
import Main from  '../views/Main.js'
import Register from '../views/Register.js'

export const routes=[
    {
        path:'/login',
        name:'Login',
        component:Login
    },
    {
        path:'/register',
        name:'Register',
        component:Register
    },
    {
        path:'/',
        name:'main',
        exact:true,
        component:Main
    },
]