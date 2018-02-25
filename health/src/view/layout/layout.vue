<template>
  <div>
    <el-container width="100%">
      <el-header height="100px" >
        <div class="logo">后台管理系统</div>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router>
            <template v-for="item in items">
              <template v-if="item.subs">
                <el-submenu :index="item.index">
                  <span slot="title">{{ item.name }}</span>
                  <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" >
                    {{ subItem.name }}
                  </el-menu-item>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item :index="item.index">
                  <span slot="title">{{ item.name }}</span>
                </el-menu-item>
              </template>
            </template>
          </el-menu>
        </el-aside>
        <el-main>
          <div><transition name="fade"><router-view/></transition></div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          index: 'report',
          name: '报告'
        }, {
          index: 'admin',
          name: '管理员'
        }, {
          index: 'hospital',
          name: '医院管理'
        }, {
          index: 'bespeakLook',
          name: '预约查看'
        }, {
          index: 'doctor',
          name: '医生管理'
        }, {
          index: 'office',
          name: '科室管理'
        }, {
          index: '1',
          name: '作息管理',
          subs: [
            {
              index: 'workShift',
              name: '班次管理'
            }, {
              index: 'manage',
              name: '排班管理'
            }
          ]
        }, {
          index: '2',
          name: 'demo',
          subs: [
            {
              index: 'table',
              name: '表格'
            },
            {
              index: 'comment',
              name: '评论'
            },
            {
              index: 'map',
              name: '地图'
            }
          ]
        }
      ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .logo{
    float: left;
    line-height: 100px;
    font-size: 25px;
    margin-left: 50px;
  }
  .el-header{
    background-color: #de7b7b;
    color: #fff;
  }
</style>
