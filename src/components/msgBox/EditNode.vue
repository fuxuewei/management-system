<script>
import CommonBox from './CommonBox'
import {mapGetters} from 'vuex'

export default CommonBox.extend({
    computed: {
    //获取state里面的createuserform对象
        ...mapGetters(['get_createuserform'])
    },
    methods: {
        onOk(id){
            var _this = this
            _this.popView
            const userform = JSON.parse(JSON.stringify(_this.get_createuserform))
            userform.typeName = userform.typeName=='存储节点' ? "GXVirtualNode" : (userform.typeName=='虚拟节点' ? "GXVirtualNode" : '')
            _this.popView.map((item)=>{
                if(item.isNullable == 0){
                    if(userform[item.field] == ''){
                        this.$message({
                            message: '请填写必要信息',
                            type: 'warning'
                        });
                        return 
                    }
                }
            })
            _this.$http({
                url:"/i2connect/supplierClassTag",
                data: userform,
                method:"PUT"
            }).then((res)=>{
                this.$message({
                    message: "编辑成功",
                    type: 'success'
                });
                this.dialogFormVisible = false
            }).catch((error)=>{
                alert(error)
            })
        }
    }
})
</script>
