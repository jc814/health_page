<template>
  <div class="content">
    <div class="header">
      <el-row>
        <el-col :span="3">
          <el-select v-model="search.hid" filterable placeholder="请选择医院" v-if="type === '1'" clearable
                     @change=""
                     @clear="">
            <el-option
              v-for="item in hospitalNames"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input placeholder="请输入班次名称" clearable>
            <el-button slot="append" @click="searchWorkShift()">搜索</el-button>
          </el-input>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary" @click="addDialog()" v-if="type === '0'">添加</el-button>
        </el-col>
        <el-col :span="2" :offset="1">
          <el-button type="primary" @click="manageCreate()" v-if="type === '0'">生成排班</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-table :data="tableData" border stripe>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="id" label="id" sortable >
        </el-table-column>
        <el-table-column prop="hispotalName" label="所属医院"  v-if="type === '1'">
        </el-table-column>
        <el-table-column prop="name" label="班次名称">
        </el-table-column>
        <el-table-column prop="scheduleCount" label="时间段个数">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" width="250">
              <p v-for="schedule in scope.row.schedules">{{ timeFormat(schedule.startTime) }}&nbsp;&nbsp;至&nbsp;&nbsp;{{ timeFormat(schedule.endTime) }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.scheduleCount }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="inUsed" label="是否被使用">

        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="small"
                       @click="editDialog(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            <el-button size="small" type="warning"
                       @click="manageDialog(scope.$index, scope.row)">安排人员</el-button>
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
      <el-dialog :title="dialogTitle[dialogStatus]" :visible.sync="dialogVisible" width="30%" center>
        <el-form :model="form" label-width="100px" label-position="left" ref="formData">
          <el-form-item label="id：" v-if="dialogStatus === 'update'" prop="id">
            <el-input v-model="form.id" :disabled="true"/>
          </el-form-item>
          <el-form-item label="名称：" prop="name">
            <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item label="工作日：" prop="days">
            <el-checkbox-group v-model="form.days"  size="small">
              <el-checkbox-button label="1">周一</el-checkbox-button>
              <el-checkbox-button label="2">周二</el-checkbox-button>
              <el-checkbox-button label="3">周三</el-checkbox-button>
              <el-checkbox-button label="4">周四</el-checkbox-button>
              <el-checkbox-button label="5">周五</el-checkbox-button>
              <el-checkbox-button label="6">周六</el-checkbox-button>
              <el-checkbox-button label="7">周日</el-checkbox-button>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="时间段：" prop="selectCount">
            <el-select v-model="form.selectCount" placeholder="请选择时间段个数"
                       @change="changeCount"
                       @clear="clearTime"
                       size="small">
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
            </el-select>
            <div v-for="n in parseInt(form.selectCount)">
              <el-col :span="10">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.times[n-1].startTime" style="width: 100%;" size="small"></el-time-picker>
              </el-col>
              <el-col class="line" :span="1">&nbsp;--&nbsp;</el-col>
              <el-col :span="10">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.times[n-1].endTime" style="width: 100%;" size="small"></el-time-picker>
              </el-col>
            </div>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button v-if="this.dialogStatus === 'update'" type="primary" @click="handleEdit()">确 定</el-button>
          <el-button v-else type="primary" @click="handleAdd()">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="请选择人员" :visible.sync="personVisible" width="30%" center>
        <el-transfer
          filterable
          :filter-method="filterMethod"
          filter-placeholder="请输入医生姓名"
          v-model="checkPersons"
          :titles="['待选医生', '已选医生']"
          :data="persons">
        </el-transfer>
        <span slot="footer" class="dialog-footer">
          <el-button @click="personVisible = false">取 消</el-button>
          <el-button @click="handleManage()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import character from 'util/character'
  import dateFormat from 'util/DateFormat'
  export default {
    data () {
      return {
        dialogStatus: '',
        dialogVisible: false,
        dialogTitle: {
          update: '编辑面板',
          create: '新增面板'
        },
        currentWorkShiftId: '',
        persons: [],
        doctors: [],
        checkPersons: [],
        personVisible: false,
        tableData: [],
        hospitalNames: [],
        form: {
          id: '',
          days: [],
          name: '',
          selectCount: 1,
          times: [
            {
              starTime: '',
              endTime: ''
            }
          ]
        },
        search: {
          name: '', // 名称查询
          hid: '', // 医院id
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
      }
      this.searchWorkShift()
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
      searchWorkShift () {
        this.$store.dispatch('workShift/selectWorkShift', this.search).then(res => {
          this.tableData = res.data
          this.search.totalCount = res.tatalNum
        })
      },
      searchDoctors () {
        var result = []
        var temp = {
          hid: window.sessionStorage.getItem('hid'),
          currentPage: 0,
          pageSize: 0
        }
        this.$store.dispatch('doctor/selectDoctors', temp).then(res => {
          this.doctors = []
          this.doctors = res.data
        })
        return result
      },
      addTime () {

      },
      changeCount () {
        var count = this.form.selectCount
        this.form.times = []
        for (var i = 0; i < count; i++) {
          var tempTimes = {
            startTime: '',
            endTime: ''
          }
          this.form.times.push(tempTimes)
        }
      },
      clearTime () {

      },
      editDialog (index, row) {
        this.form.schedules = row.schedules
        this.form.id = row.id
        this.form.name = row.name
        this.form.selectCount = row.scheduleCount.toString()
        this.form.times = []
        for (var i = 0; i < this.form.schedules.length; i++) {
          var temp = {
            startTime: '',
            endTime: ''
          }
          temp.startTime = new Date(this.form.schedules[i].startTime)
          temp.endTime = new Date(this.form.schedules[i].endTime)
          this.form.times.push(temp)
        }
        this.form.days = []
        if (row.sun === 1) {
          this.form.days.push('7')
        }
        if (row.mon === 1) {
          this.form.days.push('1')
        }
        if (row.tue === 1) {
          this.form.days.push('2')
        }
        if (row.wed === 1) {
          this.form.days.push('3')
        }
        if (row.thu === 1) {
          this.form.days.push('4')
        }
        if (row.fri === 1) {
          this.form.days.push('5')
        }
        if (row.sat === 1) {
          this.form.days.push('6')
        }
        this.dialogStatus = 'update'
        this.dialogVisible = true
      },
      addDialog () {
        this.dialogStatus = 'create'
        this.$nextTick(function () {
          this.$refs.formData.resetFields()
        })
        this.dialogVisible = true
      },
      filterMethod (query, item) {
        return item.label.indexOf(query) > -1
      },
      manageDialog (index, row) {
        this.checkPersons = []
        if (row.dids != null && row.dids !== '') {
          var tempDoctors = row.dids.split(',')
          for (var i = 0; i < tempDoctors.length; i++) {
            this.checkPersons.push(parseInt(tempDoctors[i]))
          }
        }
        this.currentWorkShiftId = row.id
        this.persons = []
        this.searchDoctors()
        this.doctors.forEach((doctor, index) => {
          var temp = {
            label: doctor.name,
            key: doctor.id
          }
          this.persons.push(temp)
        })
        this.personVisible = true
      },
      handleEdit () {
        var tempForm = this.workShiftInstall()
        this.$store.dispatch('workShift/updateWorkShift', tempForm).then(res => {
          if (res === 1) {
            this.dialogVisible = false
            this.searchWorkShift()
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
        var tempForm = this.workShiftInstall()
        this.$store.dispatch('workShift/insertWorkShift', tempForm).then(res => {
          if (res === 1) {
            this.dialogVisible = false
            this.$message({
              type: 'success',
              message: '添加成功!'
            })
            this.searchWorkShift()
          } else {
            this.$message({
              type: 'success',
              message: '添加失败!'
            })
          }
        })
      },
      handleDelete (index, row) {
        this.$confirm('此操作将永久删除该班次, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var param = {
            id: ''
          }
          param.id = row.id
          this.$store.dispatch('workShift/deleteWorkShift', param).then(res => {
            if (res === 1) {
              this.tableData.splice(index, 1)
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.searchWorkShift()
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
        this.searchWorkShift()
      },
      handleCurrentChange (val) {
        this.search.currentPage = val
        this.searchWorkShift()
      },
      handleManage () {
        if (this.checkPersons.length > 0) {
          var perons = ''
          for (var i = 0; i < this.checkPersons.length; i++) {
            perons = perons + this.checkPersons[i] + ','
          }
          perons = character.commasRemove(perons)
        }
        var tempForm = {
          delDoctors: perons,
          wid: this.currentWorkShiftId
        }
        this.$store.dispatch('manage/insertManage', tempForm).then(res => {
          if (res === 1) {
            this.dialogVisible = false
            this.searchWorkShift()
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
        this.personVisible = false
      },
      manageCreate () {
        this.$confirm('该操作会生成当月排班信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('manage/manageCreate').then(res => {
            if (res === 1) {
              this.$message({
                type: 'success',
                message: '添加排班信息成功!'
              })
            } else {
              this.$message({
                type: 'error',
                message: '添加排班信息失败!'
              })
            }
          })
        })
      },
      timeFormat (target) {
        var time = new Date(target)
        return time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
      },
      workShiftInstall () {
        var tempForm = {
          id: '',
          name: '',
          times: '',
          days: ''
        }
        tempForm.id = this.form.id
        tempForm.name = this.form.name
        var times = ''
        var days = ''
        for (var i = 0; i < this.form.days.length; i++) {
          days += ',' + this.form.days[i]
        }
        for (var j = 0; j < this.form.times.length; j++) {
          times += ',' + dateFormat.hourToSecond(this.form.times[j].startTime)
          times += ',' + dateFormat.hourToSecond(this.form.times[j].endTime)
        }
        tempForm.days = character.commasRemove(days)
        tempForm.times = character.commasRemove(times)
        return tempForm
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


