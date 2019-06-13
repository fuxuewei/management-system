<template>
    <el-table
    ref="multipleTable"
    :data="member"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>
        <el-table-column
        v-for="item in tableView"
        :key="item.id"
        :label="item.titleCurrentMsg"
        width="120">
        </el-table-column>
  </el-table>
</template>

<script>
export default {
    data(){
        return {
            tableView:{},
            member:[],
            multipleSelection: []
        }
    },
    created(){
        this.getTableView()
        this.getMember()
    },
    methods:{
        getTableView(){
            var _this=this
            _this.$http({
                url:'/i2connect/view/getSystemTableViewDetails',
                params:{
                    viewName: 'col_work_hours_type_member_list',
                    _: 0.11173134918691896
                }
            }).then((res)=>{
                this.tableView = res.data.data.containColumns
            })
        },
        getMember(){
            var _this=this
            _this.$http({
                url:'/i2connect/workHoursType/getMember',
                params:{
                    fromObjectId: '2027000000JUMBH9RP01',
                    page: 1,
                    rows: 10,
                    _: 0.9020332740181076,
                }
            }).then((res)=>{
                this.member = res.data.data
            })
        },
        handleSelectionChange(){
            this.multipleSelection = val;
        }
    }
}
</script>
