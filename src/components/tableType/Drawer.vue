<template>
  <div class="drawer">
    <div :class="open?(toright?'opright':'open'):'close'">
        <i class="el-icon-close" @click="close" style="float:right;margin: 0 10px"></i>
        <i class="el-icon-refresh" @click="refresh" style="float:right;margin: 0 10px"></i>
        <i class="el-icon-arrow-right" @click="goright" style="float:right;margin: 0 10px" v-if="toright == false"></i>
          <i class="el-icon-arrow-down" @click="godown" style="float:right;margin: 0 10px" v-if="toright == true"></i>
      <div class="header">
        <p class="fl">{{userdata.name+'('+userdata.statusDisplayNameCn + ')'}}</p>
      </div >

        <div style="margin: 0 20px;">
            <template > 
            <el-tabs v-model="activeName" @tab-click="handleClick" :key="i">
                <el-tab-pane v-for="item in childmenu" :label="item.displayNameCn" :name="item.displayNameEn" :key="item.id">
                    <div>
                        <el-tabs @tab-click="editClick"  v-model="edit" v-if="currentFuc=='Edit'">
                            <el-tab-pane label="保存" name="save"></el-tab-pane>
                            <el-tab-pane label="取消" name="cancel"></el-tab-pane>
                        </el-tabs>

                        <el-tabs @tab-click="fucClick"  v-model="activeFuc" v-else>
                            <el-tab-pane v-for="opt in item.children" :label="opt.displayNameCn" :name="opt.displayNameEn" :key="opt.id">
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                    <component :is="currentCom" :userdata="userdata" :isedit="currentFuc=='Edit'?true:false" :key="userdata.id" :viewName="drawer.viewName"/>
                    <component :is="currentFuc" 
                        :popViewName="popViewName" 
                        :dialogFormVisible="dialogFormVisible" />

                </el-tab-pane>
            </el-tabs>
            </template>
        </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import BasicInformation from '../business/objManage/BasicInformation'
import WorkHours from '../business/objManage/WorkHours'
import ProjectStatus from '../business/objManage/ProjectStatus'
import MemberAssign from '../business/objManage/MemberAssign'
import {mapGetters} from 'vuex'
import getdata from '../../api'
import Add from '../msgBox/Add'

export default {
    data() {
        return {
            open: this.openstate ? this.openstate : false,
            userdata : {},
            childmenu : [],
            activeName: 'Basic Information',
            currentCom : 'BasicInformation',
            activeFuc: '',
            currentFuc: '',
            toright : false,
            i:0,
            edit:'',
            dialogFormVisible:false,
            popViewName:'添加',
            showMtd:'',
            selectOpt:'',
        }
    },
    computed: {
    //获取state里面的createuserform对象
        ...mapGetters(['get_userdata'])
    },
    props:{
        openstate : Boolean,
        userid : String,
        drawer : Object
    },
    components:{
        BasicInformation,
        WorkHours,
        ProjectStatus,
        Add,
        MemberAssign
    },
    created(){
        this.getUserData()
        this.getChildMenu()
    },
    methods: {
        close() {
            this.open = false
        },
        getUserData(){
            var _this=this
            var date = new Date().getTime()

            _this.$http({
                url:_this.drawer.url+_this.userid,
                params:{
                    _:date
                }
            }).then((res)=>{
                _this.userdata = res.data.data
                console.log(_this.userdata)
            })
        },
        getChildMenu(){
            var _this=this
            _this.$http({
                url:"/i2connect/menus/getChildMenus.do",
                params :{
                    model: 'Host_Root_Menu',
                    objectTypeId: _this.drawer.id,
                    statusId: 0,
                    _: 0.908870591881044
                }
            }).then((res)=>{
                console.log(res.data.data.children)
                _this.childmenu = res.data.data.children
            })
        },
        handleClick() {
            this.currentCom = this.activeName.replace(/\s*/g,"")
            console.log(this.currentCom)
        },
        goright(){
            this.toright = true
        },
        godown(){
            this.toright = false
        },
        refresh(){
            this.i++
        },
        fucClick(){
            this.currentFuc = this.activeFuc.replace(/\s*/g,"")
            if(this.currentFuc!='Edit'){
                this.dialogFormVisible=true
            }
        },
        editClick(){
            if(this.edit == 'save'){
                var _this = this
                _this.$http({
                    url:'/i2connect/workHour/projects',
                    params: _this.get_userdata
                }).then((res)=>{
                    this.currentFuc = ''
                })
            }else {
                this.currentFuc = ''
            }
        }
    }
}
</script>
<style lang="scss" scoped>
  .drawer {
    .close {
      position: absolute;
      z-index: 10;
      left: 0;
      bottom: -375px;
      width: 100%;
      height: 375px;
      background: #fff;
      transition: left linear 1s;
    }
    .open {
        box-shadow: 0px -2px 1px #888888;
      position: absolute;
      z-index: 10;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 375px;
      background: #fff;
      transition: left linear 1s;
      .header {
        margin: 0 20px;
        height: 56px;
        border-bottom: 1px solid #dddddd;
        p {
          margin-top: 18px;
        }
      }
    }
    .opright {
        box-shadow: 0px -2px 1px #888888;
      position: absolute;
      z-index: 10;
      right: 0;
      bottom: 0;
      width: 302px;
      height: 100%;
      background: #fff;
      transition: left linear 1s;
      .header {
        margin: 0 20px;
        height: 56px;
        border-bottom: 1px solid #dddddd;
        p {
          margin-top: 18px;
        }
      }
    }
  }
</style>
