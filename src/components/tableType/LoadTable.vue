<template>
       <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    row-key="id"
    lazy
    :load="load"
    @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <template v-for="item in mainView">
        <template v-if="item.index==1">
            <el-table-column
                :label="item.titleCurrentMsg"
                width="120">
                <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
        </template>
        <template v-else>
            <el-table-column
            :prop="item.field"
            :label="item.titleCurrentMsg"
            width="120">
            </el-table-column>
        </template>
    </template>
  </el-table>
</template>

<script>
import getdata from '../../api'

export default {
    
    name:'LoadTable',
    data(){
        return {
            tableData:[
            ],
            mainView:[]
        }
    },
    created(){
        var urldata = getdata[this.$route.params.listid]
        console.log(urldata)
        var date= new Date()
        var params={
            _:date
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
                var i
                for(i in _this.tableData){
                    _this.tableData[i].hasChildren = true
                }
            })
        },
        getTableView(){
            var _this=this
            var urldata = getdata[_this.$route.params.listid]
            var date= new Date()
            _this.$http({
                url:'/i2connect/view/getSystemTableViewDetails',
                params:{
                    viewName:urldata.viewName,
                    _:_this.date
                }
            }).then((res)=>{
                _this.mainView = res.data.data.containColumns
            })
        },
        load(tree, treeNode, resolve) {
            var _this=this
            var urldata = getdata[_this.$route.params.listid]
          _this.$http({
              url:urldata.url,
              params:{
                  parentTag: tree.id,
                  typeId: tree.typeId,
                  _: _this.date
              } 
          }).then((res)=>{
              if(!res.data.data){
                  return
              }
              res.data.data.map(item=>{
                  item.hasChildren = true
                  return item
              })
              resolve(res.data.data)
          })
        },

    }
}
</script>

