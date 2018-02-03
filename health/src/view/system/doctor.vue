<template>
  <div class="content">
    <div class="header">
      <el-row>
        <el-col :span="3">
          <el-select v-model="search.hid" filterable placeholder="请选择医院" v-if="type === '1'" clearable
                     @change="getOfficeNameByHospitalId"
                     @clear="clearHId">
            <el-option
              v-for="item in hospitalNames"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="search.oid" filterable placeholder="请选择科室" clearable :disabled="search.hid === ''"
                     @clear="clearOId"
                     @focus="checkforOffice">
            <el-option
              v-for="item in officeNames"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入医生姓名" clearable>
            <el-button slot="append" @click="searchDotors">搜索</el-button>
          </el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary" @click="addDialog()">添加</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="tableData" border stripe>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="id" sortable >
        </el-table-column>
        <el-table-column prop="officeName" label="所属科室">
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="sex" label="性别">
        </el-table-column>
        <el-table-column prop="age" label="年龄">
        </el-table-column>
        <el-table-column prop="brief" label="简介">
        </el-table-column>
        <el-table-column prop="phone" label="电话">
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="small"
                       @click="editDialog(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="search.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="search.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="search.totalCount">
      </el-pagination>
      <el-dialog :title="dialogTitle[dialogStatus]" :visible.sync="dialogVisible" width="25%" center>
        <el-form :model="form" label-width="100px" label-position="left">
          <el-form-item label="id：" v-if="dialogStatus === 'update'" >
            <el-input v-model="form.id" :disabled="true"/>
          </el-form-item>
          <el-form-item label="所属科室：">
            <el-select v-model="form.oid" filterable placeholder="请选择科室">
              <el-option
                v-for="item in officeNames"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称：">
            <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-model="form.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄：">
            <el-input v-model="form.age"/>
          </el-form-item>
          <el-form-item label="简介：">
            <el-input type="textarea"
                      :autosize="{ minRows: 2, maxRows: 9}"
                      v-model="form.brief">
            </el-input>
          </el-form-item>
          <el-form-item label="电话：">
            <el-input v-model="form.phone"/>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button v-if="this.dialogStatus === 'update'" type="primary" @click="handleEdit()">确 定</el-button>
          <el-button v-else type="primary" @click="handleAdd()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialogStatus: '',
        dialogVisible: false,
        dialogTitle: {
          update: '编辑面板',
          create: '新增面板'
        },
        tableData: [],
        hospitalNames: [],
        officeNames: [],
        form: {
          id: '',
          oid: '',
          name: '',
          sex: '',
          age: '',
          brief: '',
          phone: ''
        },
        search: {
          name: '', // 名称查询
          hid: '', // 医院id
          oid: '', // 科室id
          currentPage: 1, // 当前页码
          totalCount: 10, // 默认数据总数
          pageSize: 10 // 默认每页数据量
        },
        type: '',
        options: []
      }
    },
    mounted () {
      this.type = window.sessionStorage.getItem('type')
      if (this.type === '1') {
        this.getHospitalName()
      } else {
        this.search.hid = window.sessionStorage.getItem('hid')
        this.getOfficeNameByHospitalId()
      }
    },
    methods: {
      getHospitalName () {
        const tempSearch = {
          name: '', // 名称查询
          hid: '', // 医院id
          currentPage: 0, // 当前页码
          totalCount: 0, // 默认数据总数
          pageSize: 0 // 默认每页数据量
        }
        this.$store.dispatch('hospital/selectHospitals', tempSearch).then(res => {
          this.hospitalNames = res.data
        })
      },
      getOfficeNameByHospitalId () {
        var tempHid
        this.search.oid = ''
        if (window.sessionStorage.getItem('type') === '1') {
          tempHid = this.search.hid
        } else {
          tempHid = window.sessionStorage.getItem('type')
        }
        const tempSearch = {
          hid: tempHid, // 医院id
          currentPage: 0, // 当前页码
          pageSize: 0 // 默认每页数据量
        }
        this.$store.dispatch('office/selectOfficeHospitalId', tempSearch).then(res => {
          this.officeNames = res.data
        })
      },
      searchDotors () {
        this.$store.dispatch('doctor/selectDoctors', this.search).then(res => {
          this.tableData = res.data
          this.search.totalCount = res.tatalNum
        })
      },
      clearHId () {
        this.officeNames = []
        this.tableData = []
        this.search.oid = ''
      },
      clearOId () {
        this.tableData = []
      },
      checkforOffice () {
        if (!this.search.hid) {
          this.$message({
            type: 'warning',
            message: '请先选择医院!'
          })
        }
      },
      editDialog (index, row) {
        this.form = Object.assign({}, row)
        this.dialogStatus = 'update'
        this.dialogVisible = true
      },
      addDialog () {
        this.dialogStatus = 'create'
        this.form = {}
        this.dialogVisible = true
      },
      handleEdit () {
        console.log(this.form)
        this.$store.dispatch('doctor/updateDoctor', this.form).then(res => {
          if (res === 1) {
            this.dialogVisible = false
            this.searchDotors()
            this.$message({
              type: 'success',
              message: '编辑成功!'
            })
          } else {
            this.$message({
              type: 'error',
              message: '编辑失败!'
            })
          }
        })
      },
      handleAdd () {
        this.$store.dispatch('doctor/insertDoctor', this.form).then(res => {
          if (res === 1) {
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.searchDotors()
          } else {
            this.$message({
              type: 'success',
              message: '添加失败!'
            })
          }
        })
      },
      handleDelete (index, row) {
        this.$confirm('此操作将永久删除该医院, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var param = {
            id: ''
          }
          param.id = row.id
          this.$store.dispatch('doctor/deleteDoctor', param).then(res => {
            if (res === 1) {
              this.tableData.splice(index, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.searchDotors()
            } else {
              this.$message({
                type: 'error',
                message: '删除失败!'
              })
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleSizeChange (val) {
        this.search.pageSize = val
        this.searchDotors()
      },
      handleCurrentChange (val) {
        this.search.currentPage = val
        this.searchDotors()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content{
    padding: 20px;
  }
  .header{
    margin-bottom: 30px;
  }
</style>

