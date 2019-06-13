<template>
      <el-submenu  :index="subList.id">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>{{ subList.displayNameCn }}</span>
        </template>
        <template v-for="option in subList.children">
            <template v-if="option.children.length">
                <Submenu :subdata="option" :key="option.id"/>
            </template>
            <template v-else>
                <el-menu-item @click="asideChange(option.id)" :key="option.id">
                    {{option.displayNameCn}}
                </el-menu-item>
            </template>
        </template>
      </el-submenu>
</template>

<script>
export default {
    name:'Submenu',
    data(){
        return {
            subList:{}
        }
    },
    props:{
        subdata:Object
    },
    created(){
        var _this=this
        _this.subList=_this.subdata
        _this.menuId=_this.$route.params.menuid
    },
    methods:{
        asideChange:function(optionId){
             var _this=this
            _this.$router.push({path:'/home/2009000000IDRECO0A3H/menu/'+_this.menuId +'/'+optionId})
        },
        getData:function(api){
            var _this=this
            var xx=[]
            _this.$http({
                url:api.url,
                params:api.params
            }).then((res)=>{
                xx=res.data.data
            })
            return xx
        }
    },
}
</script>
