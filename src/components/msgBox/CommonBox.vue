<template>
    <el-dialog :title="popViewName" :visible.sync="dialogFormVisible">
        <MsgBoxList v-if="popView.length" :popView="popView" :popViewName="popViewName" :formid="selectOpt[0].id" :formname="selectOpt[0].name" :formmsg="selectOpt[0]"/>
        <OInput v-if="showMtd == 'DELETE'" :formmsg="{value:selectOpt[0].name}" />
        <div slot="footer" class="dialog-footer">
        <el-button @click="onCancel">取 消</el-button>
        <el-button type="primary" @click="onOk(selectOpt[0].id ? selectOpt[0].id : null)">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import Vue from 'vue'
import MsgBoxList from '../MsgBoxList'
import OInput from '../formType/OInput'

export default Vue.extend({
    name: 'CommonBox',
    components : {
        MsgBoxList,
        OInput
    },
    created(){
console.log(this.popView)
    },
    props: {
        popViewName:{
            type:String
        },
        popView:{
            type:[Array,Object]
        },
        selectOpt:{
        },
        showMtd:String,
        dialogFormVisible:Boolean
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
