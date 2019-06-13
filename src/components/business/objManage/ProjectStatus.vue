<template>
    <div>
        <el-steps :space="200" :active="currentStep" finish-status="success">
            <el-step v-for="item in statuslist" :key="item.id" :title="item.name_zh"></el-step>
        </el-steps>
    </div>
</template>

<script>
export default {
    data(){
        return {
            statuslist:[],
            statuslog:[],
            tableview:[],
            currentStep: 0
        }
    },
    props:['userdata'],
    created(){
        this.getStatusList()
        this.getStatusLog()
        this.getTableView()
    },
    methods:{
        getStatusList(){
            var _this=this
            var date = new Date().getTime()
            _this.$http({
                url:'/i2connect/base/status/list/'+_this.userdata.id,
                params:{
                    _:date
                }
            }).then((res)=>{
                res.data.data.map((item)=>{
                    if(item.isCurrent==1){
                        _this.currentStep=parseInt(item.index)
                    }
                })
                _this.statuslist = res.data.data
            })
        },
        getStatusLog(){
            var _this=this
            var date = new Date().getTime()
            _this.$http({
                url:'/i2connect/base/log/status/'+_this.userdata.id,
                params:{
                    _:date
                }
            }).then((res)=>{
                _this.statuslog = res.data.data
            })
        },
        getTableView(){
            var _this=this
            var date = new Date().getTime()
            _this.$http({
                url:'/i2connect/view/getSystemTableViewDetails',
                params:{
                    viewName: 'col_status_log_list',
                    _:date
                }
            }).then((res)=>{
                _this.tableview = res.data.data.containColumns
            })
        }
    }
}
</script>
