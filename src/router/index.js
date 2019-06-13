import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/Login'
import home from '@/components/Home'
import test from '@/components/Test'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes:[
        {
            path:'/',
            redirect:'/home/2009000000IDRECO0A3H/menu/2009000000IDRECO0A10',
            component:home
        },{
            path:'/home',
            redirect:'/home/2009000000IDRECO0A3H/menu/2009000000IDRECO0A10',
            component:home
        },
        {
            path:'/login',
            name:'login',
            component:login
        },
        {
            path:'/home/:pid/menu/:menuid/:listid',
            name:'home',
            component:home
        }, 
        {
            path:'/home/:pid/menu/:menuid',
            name:'home',
            component:home
        },
        {
            path:'/test',
            name:'test',
            component:test
        },
    ]
})

router.beforeEach((to,from,next)=>{
    let token = localStorage.getItem('Authorization')
    if(to.path=='/login'){
        if(token){
            next('/home')
        }else{
            next()
        }
    }else{
        if(token == null || token == ''){
            next('/login')
        }else{
            next()
        }
    }
})

export default router