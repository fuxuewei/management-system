<template>
        <el-radio-group size="small" v-if="type=='radio'">
            <el-radio-button v-for="option in formmsg.viewRule.lovChildren" :key="option.id" :label="option.text" >{{option.text}}</el-radio-button>
        </el-radio-group>
</template>
<script>
export default {
    name:"OInput",
    data(){
        return {
            form:{
                name:''
            }
        }
    },
    props:{
        formmsg:{
            type: Array,
            required: true
        },
        type:{
            default: 'radio'
        }
    }
}
</script>