<template>
    <el-form >
      <template v-for="item in popView" >
          <el-form-item  v-if="item.isVisible==1" :label="item.isNullable ? item.titleZhCn : '*'+item.titleZhCn" :label-width="formLabelWidth" :key="item.id">
            <template v-if="item.viewRule==null">
              <template v-if="item.field == 'parentTag'">
                <el-input  v-model="parentName" autocomplete="off" :disabled="item.isEditable==0" ></el-input>
              </template>
              <template v-else>
                <el-input  v-model="form[item.field]" autocomplete="off" :disabled="item.isEditable==0" ></el-input>
              </template>
            </template>
            <template v-else-if="item.viewRule.otherRule == 'Radio.Group'">
              <el-radio-group size="small" v-model="form.typeName">
                <el-radio-button v-for="option in item.viewRule.lovChildren" :key="option.id" :label="option.text" ></el-radio-button>
              </el-radio-group>
            </template>
            <template v-else-if="item.viewRule.otherRule == 'Input.TextArea'">
              <el-input type="textarea" v-model="form.description"></el-input>
            </template>

            <!-- <getType(item.viewRule.otherRule) v-if="item.isVisible==1" /> -->
          </el-form-item>
      </template>
    </el-form>
</template>

<script>
import formtype from '../formtype'
import OInput from './formType/OInput'
import Oselect from './formType/Oselect'
import { mapMutations } from 'vuex';
import  store  from '../store'

export default {
  name:'MsgBoxList',
  data(){
    if(this.popViewName == '创建节点'){
      return {
        form: {
          name: '',
          typeName: '',
          parentTag:this.formid,
          description:''
        },
        parentName:this.formname ? this.formname:null
      }
    }else if(this.popViewName == '编辑节点'){
      return {
        form: {
          name: this.formname ? this.formname : '',
          id: this.formid,
          parentTag:this.formmsg.parentTag ? this.formmsg.parentTag : '',
          description: this.formmsg.description ? this.formmsg.description : ''
        },
        parentName:this.formname ? this.formname:null
      }
    }
      
  },
  components:{
    OInput,
    Oselect
  },
  props: {
    popView: {
      type: Array,
      required: true
    },
    formLabelWidth: {
      default:'120px'
    },
    formname:{
      type:String
    },
    formid:{
      type:String
    },
    formmsg:{
      type:[Array,Object]
    },
    popViewName:{
        type:String
    },
  },
  created(){
    console.log(this.popView)
    return
  },
  updated() {
    var _this = this
    console.log(_this.form)
    _this.subForm(_this.form)
  },
  methods:{
    ...mapMutations(['subForm']),
    getType(sign){
      console.log(formtype[sign])
      return formtype[sign]
    }
  }
}
</script>