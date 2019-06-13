<template>
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        v-for="item in header"
        :key="item.id"
        :label="item.titleCurrentMsg"
        width="120" />
  </el-table>
</template>
<script>
export default {
    data(){
        return {
            header:[],
            tableData:[]
        }
    },
    created(){
        this.getHeader()
    },
    props:['userdata'],
    methods:{
        getHeader(){
            var _this=this
            var date=new Date().getTime()
            _this.$http({
                url:'/i2connect/view/getSystemTableViewDetails',
                params: {
                    viewName: 'col_project_workingHours_type',
                    _: date
                }
            }).then((res)=>{
                _this.header = res.data.data.containColumns
            })
        },
        getDate(){
            var _this=this
            var date=new Date().getTime()
            _this.$http({
                url:'/i2connect/workHoursType',
                params: {
                    projectId: _this.userdata.id,
                    page: 1,
                    rows: 10,
                    _: date,
                }
            }).then((res)=>{
                _this.tableData = res.data.data
            })
        },
        handleSelectionChange(){
            console.log(this)
        }
    }
}
</script>

