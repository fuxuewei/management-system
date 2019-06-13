<template>
        <el-input 
        v-model="form.value" 
        autocomplete="off" 
        :disabled="formmsg.isEditable==0" 
        :type="type" 
        >
        </el-input>
</template>
<script>
export default {
    name:"OInput",
    data(){
        return {
            form:{
                value:this.formmsg.value?this.formmsg.value:null
            },
        }
    },
    props: {
        formmsg:{
            type:[Array, Object],
            required: true
        },
        type:{
            default: 'text'
        },
        formLabelWidth:{
            default : '120px'
        }
    },
}
</script>