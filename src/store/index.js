import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        Authorization : localStorage.getItem('Authorization')?localStorage.getItem('Authorization'):'',
        CreateUserForm : {},
        findby : '',
        userdata : ''
    },
    mutations : {
        changeLogin(state,user){
            state.Authorization=user.Authorization
            localStorage.setItem('Authorization',user.Authorization)
        },
        subForm(state,formdata){
            state.CreateUserForm = formdata
        },
        getData(state,findby){
            state.findby = findby
        },
        editUser(state,userdata){
            state.userdata = userdata
        }
    },
    getters : {
        get_createuserform: state => {
            return state.CreateUserForm
        },
        get_findby:state => {
            return state.findby
        },
        get_userdata:state=>{
            return state.userdata
        }
    }
})

export default store