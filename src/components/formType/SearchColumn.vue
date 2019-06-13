<template>
    <div v-if="formviewName == ''">
        <el-row><div>关键字:
        <el-input size="small" v-model="findby" ></el-input></div>
        </el-row>
    </div>
    <div v-else>
        <el-form  :inline="true">
            <el-form-item v-for="item in formdata" :label="item.titleZhCn" :key="item.id">
                <el-input v-model="form[item.field]"></el-input>
            </el-form-item>
             <el-form-item>
                <el-button type="primary">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';

export default {
    data(){
        return {
            findby : '',
            formdata: [],
            form:{

            }
        }
    },
    props : ['formviewName'],
    updated() {
        var _this = this
        console.log(_this.findby)
        _this.getData(_this.findby)
    },
    created(){
        var _this=this
        var date = new Date().getTime()
        _this.$http({
            url:'/i2connect/view/getFormViewDetails',
            params: {
                viewName : this.formviewName,
                _: date
            }
        }).then((res)=>{
            _this.formdata = res.data.data.fields
            console.log(_this.formdata)
        })
    },
    methods : {
        ...mapMutations(['getData']),
    }
}
</script>

