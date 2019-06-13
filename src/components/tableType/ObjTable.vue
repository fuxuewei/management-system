<template>
<el-container>
  <el-header>
    <SearchColumn  :formviewName = "formviewName"/>
    <el-row>
      <el-button type="primary" @click="search()">搜索</el-button>
       <el-button @click="clear()">重置</el-button>
    </el-row>
  </el-header>
  <el-main>
  <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange"
    highlight-current-row
    @current-change="handleCurrentChange"
    >
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <template v-for="item in mainView">
        <el-table-column
        :prop="item.field"
        :label="item.titleCurrentMsg"
        width="120"
        >
        </el-table-column>
    </template>
  </el-table>
  <Drawer :openstate="openstate" :userid="userid" :key="userid" :drawer="drawer"/>
</el-main>
</el-container>
</template>

<script>
import getdata from '../../api'
import SearchColumn from '../formType/SearchColumn'
import {mapGetters} from 'vuex'
import Drawer from './Drawer'

export default {
    name:"Table",
    data(){
        return {
            tableData:[],
            mainView:[],
            findby:'',
            formviewName:'',
            openstate:false,
            userid : '',
            drawer:{}
        }
    },
    components : {
        SearchColumn,
        Drawer
    },
    computed: {
    //获取state里面的createuserform对象
        ...mapGetters(['get_findby'])
    },
    created(){
        var urldata = getdata[this.$route.params.listid]
        this.drawer = urldata.drawer ? urldata.drawer : ''
        var date=new Date()
        var params = {}
        if(urldata.params){
            params = urldata.params
        }else{
            params = {
                page: 1,
                rows: 10,
                _: this.date
            }
        }
        this.getTableData(urldata.url,params)
        this.getTableView()
    },
    methods:{
        handleSelectionChange(val) {
            this.$emit('listenToSelectOpt',val)
        },
        getTableData(url,params){
            var _this=this
            _this.$http({
                url:url,
                params:params
            }).then((res)=>{
                _this.tableData=res.data.data
            })
        },
        getTableView(){
            var _this=this
            var urldata = getdata[_this.$route.params.listid]
            _this.formviewName = urldata.formviewName ?  urldata.formviewName  : ''
            var date= new Date()
            _this.$http({
                url:'/i2connect/view/getSystemTableViewDetails',
                params:{
                    viewName:urldata.viewName,
                    _:date
                }
            }).then((res)=>{
                _this.mainView = res.data.data.containColumns
            })
        },
        search(){
            var urldata = getdata[this.$route.params.listid]
            var date = new Date().getTime()
            var _this=this
            var params = {}
            if(urldata.params){
                params = {
                    page: 1,
                    name: _this.get_findby,
                    objectTypeName: urldata.params.objectTypeName,
                    _: date
                }
            }else {
                params = {
                page: 1,
                rows: 10,
                keyword: _this.get_findby,
                _: date
                }
            }
            this.getTableData(urldata.url,params)
        },
        clear(){
            this.findby =''
            var urldata = getdata[this.$route.params.listid]
            var date=new Date()
            var params = {}
            if(urldata.params){
                params = urldata.params
            }else{
                params = {
                    page: 1,
                    rows: 10,
                    _: this.date
                }
            }
            this.getTableData(urldata.url,params)
        },
        handleCurrentChange(item){
            console.log(item.id)
            this.userid = item.id
            this.openstate=true
        }
    }
}
</script>