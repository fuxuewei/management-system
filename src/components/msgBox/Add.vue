
<template>
    <el-dialog :title="popViewName" :visible.sync="dialogFormVisible">
        <el-form ref="form" :model="form" label-width="80px" :inline="true">
            <el-form-item v-for="item in list" :label="item.titleCurrentMsg" :key="item.id">
                <el-input v-model="form[item.field]"></el-input>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onOk()">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
    data(){
        return {
            list:[],
            form:{}
        }
    },
    props: {
        popViewName:{
            type:String
        },
        dialogFormVisible:Boolean
    },
    created(){
        var _this =this 
        _this.$http({
            url:'/i2connect/view/getFormViewDetails',
            params:{
                viewName: 'form_work_hours_type_create',
                _: 0.9108035497794236
            }
        }).then((res)=>{
            this.list = res.data.data.fields
        })
    },
    updated(){
        console.log(this.form)
    },
    methods: { 
        onCancel(){
          this.dialogFormVisible = false
        },
        onOk(){
            this.dialogFormVisible = false
        }
    }
})
</script>