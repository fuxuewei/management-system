<template>
    <el-form :inline="true" class="demo-form-inline" v-if="isedit">
    <el-form-item v-for="item in formview" :label="item.titleCurrentMsg" :key="item.id">
        <el-input v-model="userform[item.field]"  :disabled="item.isEditable?false:true"></el-input>
    </el-form-item>
    </el-form>

    <el-form :inline="true" :model="userdata" class="demo-form-inline" v-else>
    <el-form-item v-for="item in formview" :label="item.titleCurrentMsg" :key="item.id">
    {{ userdata[item.field] }}
    </el-form-item>
    </el-form>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
    data(){
        return {
            formview: [],
            userform:this.userdata
        }
    },
    props:['userdata','isedit','viewName'],
    created(){
        this.getFormView()
    },
    updated(){
        this.editUser(this.userform)
    },
    methods:{
        ...mapMutations(['editUser']),
        getFormView(){
            var _this=this
            var date = new Date().getTime()
            _this.$http({
                url:'/i2connect/view/getFormViewDetails',
                params :{
                    viewName:_this.viewName,
                    _:date
                }
            }).then((res)=>{
                _this.formview = res.data.data.fields
            })
        },
    }
}
</script>
