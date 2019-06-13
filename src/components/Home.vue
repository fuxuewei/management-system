<template>
<el-container class="home">
  <el-header>
    <el-menu
        class="top_menu"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item  v-for="item in topList" v-bind:key="item.id" @click="topChange(item.id)">
          {{item.displayNameCn}}
        </el-menu-item>
    </el-menu>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <Aside  :menuId="menuId" :key="menuId" />
    </el-aside>
    <el-main>
      <!-- <img src="../../public/img/main.png"> -->
      <div v-if="listId" >
        <Main :listId="listId" :key="listId"/>
      </div>
      <div v-else> <img src="../../public/img/main.png"> </div>
    </el-main>
  </el-container>
</el-container> 
</template>

<script>
import Aside from './Aside'
import Main from './Main'

export default {
  components: {
    Aside,
    Main
  },
  name: 'Home',
  data() {
      return {
        topList:[
          
        ],
        menuId:'2009000000IDRECO0A10',
        listId:''
      }
  },
    created:function(){
      var _this=this
      var date = new Date().getTime()
      _this.pid=_this.$route.params.pid
      _this.menuId=_this.$route.params.menuid
      _this.listId=_this.$route.params.listid?_this.$route.params.listid:''
      _this.$http({
        url:'/i2connect/menus/getChildMenus.do',
        methods:'get',
        params:{
          menuId:_this.pid,
          menuType:'MODULE',
          position:'DIS',
          _:date
        }
      }).then((res)=>{
        _this.topList=res.data.data.children
      })
    },
    methods:{
      topChange:function(menuId){
        var _this=this
        _this.menuId = menuId
        _this.$router.push({path:'/home/2009000000IDRECO0A3H/menu/'+_this.menuId})
      }
    },
    computed:{
      getlistId(){
        return this.$route.params.listid
      }
    },
    watch:{
      getlistId(val){
        this.listId=val
      }
    }
  }
</script>
