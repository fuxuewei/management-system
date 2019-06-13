<template>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo">
        <template v-for="item in asideList" >
            <Submenu :subdata="item" v-bind:key="item.id"/>
        </template>
    </el-menu>
</template>

<script>
import Submenu from "./tableType/Submenu";

export default {
    name:'Aside',
    components:{
        Submenu,
    },
    data(){
        return {
            asideList:[
            
            ]
        }
    },
    props:['menuId'],
    created(){
        var _this=this
        var date = new Date().getTime()
        _this.$http({
            url:'/i2connect/menus/getChildMenus.do',
            methods:'get',
            params:{
                menuId: _this.menuId,
                position:'DIS',
                _:date
            }
        }).then((res)=>{
            _this.asideList=res.data.data.children
        })
    }
}
</script>
