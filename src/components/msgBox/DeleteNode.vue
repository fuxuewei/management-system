<script>
import CommonBox from './CommonBox'

export default CommonBox.extend({
    methods: {
        onOk(id){
            console.log(id)
            var _this=this
            _this.$http({
                url:"/i2connect/supplierClassTag/"+id,
                method:"DELETE"
            }).then((res)=>{
                this.$message({
                    message: '节点删除成功',
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