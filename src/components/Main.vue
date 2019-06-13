<template>
<el-container>
  <el-header>
    <el-col :span="24"><div class="grid-content bg-purple-dark">{{ mainTitle }}</div></el-col>
  </el-header>
  <el-main>
      <el-row>
        <template v-for="btn in mainFuc" >
          <el-tooltip :content="btn.tips" placement="bottom" :key="btn.id" :disabled="getBtnState(btn.displayNameCn) ? false : true">
            <label><el-button :key="btn.id" @click="open(btn.operate,btn.displayNameCn,btn.displayNameEn)" :disabled="getBtnState(btn.displayNameCn)">{{btn.displayNameCn}}</el-button>
            </label>
          </el-tooltip>
        </template>
        <component :is="currentBox" 
        :popViewName="popViewName" 
        :popView="popView" 
        :showMtd="showMtd" 
        :selectOpt="selectOpt" 
        :dialogFormVisible="dialogFormVisible" />
      </el-row>
      <component :is="tableType" v-on:listenToSelectOpt="getSelectOpt"/>
  </el-main>
</el-container>
</template>

<script>
import LoadTable from "./tableType/LoadTable";
import Table from "./tableType/Table"
import ObjTable from "./tableType/ObjTable"
import getdata from '../api'
import OInput from './formType/OInput'
import DeleteNode from './msgBox/DeleteNode'
import CreateNode from './msgBox/CreateNode'
import EditNode from './msgBox/EditNode'
import Vue from 'vue'
import {formatStr} from "../utils/StringUtil";

export default {
    name:'Main',
    components:{
        LoadTable,
        Table,
        OInput,
        DeleteNode,
        CreateNode,
        EditNode,
        ObjTable
    },
    data(){
        return {
            mainFuc:[
            ],
            mainTitle:'',
            mainId:'',
            mainTable:[
            ],
            tableType: getdata[this.$route.params.listid].tableType?getdata[this.$route.params.listid].tableType:'',
            dialogFormVisible: false,
            popView:[],
            popViewName:'',
            showMtd:'',
            selectOpt:'',
            currentBox:''
        }
    },
    props:['listId'],
    created(){
        var _this=this
        var date= new Date()
        _this.$http({
            url:'/i2connect/menus/getChildMenus.do',
            params:{
                menuId:_this.listId,
                _:date
            }
        }).then((res)=>{
            _this.mainFuc = res.data.data.children
            if(_this.mainFuc.length){
              _this.mainFuc.map((item)=>{
                item.tips="只能选择一行数据"
              })
            }
            _this.mainTitle = res.data.data.displayNameCn
            _this.mainId = res.data.data.id
        })
    },
    methods:{
      changeOperate(operate){
        let flowReg = /([^\.])\.([^\,\(]+)(\(([^\)]*)\))?(\s*\,\s*)?/g;
        // 操作流程字符串  格式化其中的模板字符串 只替换ds.开头的变量
        let operStr = formatStr(operate, {ds: {}}, /\$\{(ds\.[^\}]*)\}/g),
        // 所有流程执行对象
        allFlow = [];
        // 不分组，按照文本中的顺序执行
        // 分组后的流程字符串 g:获取数据流程， v:验证流程， f:逻辑流程, c:回调流程  p: 属性表格每次修改时触发， i: 属性表格初始化触发
        // groupOper = typeIsMenu ? {g: [], v: [], f: [], c: []} : {p: [], i: []};
        // 解析操作字符串
        let arr = null;
        do{
        arr = flowReg.exec(operStr);
        if(arr != null){
            // 正则匹配之后是类似这样的数组
            // ["f.edit('baidu', '12')", "f", "edit", "('baidu', '12')", "'baidu', '12'"]
            // 加入到所有执行对象中
            allFlow.push({
                // 名称
                name: arr[2],
                // 参数数组
                params: arr[4] ? eval("[" + arr[4] + "]") : [],
                // 标识
                tag: arr[1]
            });
        }
        }while(arr != null);
        return allFlow
      },
      open(operate,title,tempname) {
        var _this=this
        var xx =_this.changeOperate(operate)
        _this.popViewName = title
        for ( var i in xx){
          let item = xx[i]
            if(item.tag == 'f' && item.name == 'show'){
                var showFuc = item.params[1]
            }
        }
        // 去除英文名空格作为组件名
        _this.currentBox = tempname.replace(/\s*/g,"")
        _this.dialogFormVisible = true
        var date = new Date()
        if(showFuc.view){
          _this.showMtd =''
          var params = {
              viewName:showFuc.view,
              _:date
          }
          //弹窗list
          _this.$http({
              url:'/i2connect/view/getFormViewDetails',
              params: params
          }).then((res)=>{
              _this.popView=res.data.data.fields
          })
        }else{
          _this.popView = []
          _this.showMtd = showFuc.method
        }
      },
      getSelectOpt(data){
        this.selectOpt = data
      },
      getBtnState(btnname){
        var _this=this
        var btnState = false
          if(btnname == '删除节点' || btnname == '编辑节点' ||  btnname == '创建节点'){
            btnState = _this.selectOpt.length == 1 ? false : true
          }
          return btnState
      },
      
    }
}
</script>