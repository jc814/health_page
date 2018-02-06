<template>
  <div class="content">
    <div class="header">
      <el-row>
        <el-col :span="5">
          <el-input placeholder="请输入内容" v-model="search.name">
            <el-button slot="append" @click="getHospitalList()">搜索</el-button>
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
        <el-table-column prop="name" label="名称" >
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" width="250">
              <p>简介: {{ scope.row.brief }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.name }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="联系电话">
        </el-table-column>
        <el-table-column prop="address" label="地址">
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
      <el-dialog :title="dialogTitle[dialogStatus]" :visible.sync="dialogVisible" width="40%" center>
        <el-form :model="form" label-width="100px">
          <el-form-item label="id：" v-if="dialogStatus === 'update'" >
            <el-input v-model="form.id" :disabled="true"/>
          </el-form-item>
          <el-form-item label="名称：">
            <el-input v-model="form.name"/>
          </el-form-item>
          <el-form-item label="联系电话：" :rules="[
            { required: true, message: '电话不能为空'},
            { type: 'number', message: '电话必须为数字值'}]">
            <el-input v-model.number="form.phone"/>
          </el-form-item>
          <el-form-item label="地址：">
            <el-input v-model="form.address"/>
          </el-form-item>
          <el-form-item label="简介：">
            <el-input type="textarea"
                      :autosize="{ minRows: 2, maxRows: 9}"
                      v-model="form.brief">
            </el-input>
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
      form: {
        id: '',
        name: '',
        phone: '',
        address: '',
        brief: ''
      },
      search: {
        name: '', // 名称查询
        currentPage: 1, // 当前页码
        totalCount: 10, // 默认数据总数
        pageSize: 10 // 默认每页数据量
      },
      tableData: []
    }
  },
  created () {
    this.getHospitalList()
  },
  methods: {
    getHospitalList (currentPage, pagesize) {
      this.$store.dispatch('hospital/selectHospitals', this.search).then(res => {
        this.tableData = res.data
        this.search.totalCount = res.number
        console.log('调用封装后的axios成功')
      })
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
      this.$store.dispatch('hospital/updateHospital', this.form).then(res => {
        if (res === 1) {
          this.dialogVisible = false
          this.getHospitalList()
          this.$message({
            type: 'success',
            message: '编辑成功!'
          })
        } else {
          this.getHospitalList()
          this.$message({
            type: 'error',
            message: '编辑失败!'
          })
        }
      })
    },
    handleAdd () {
      this.$store.dispatch('hospital/insertHospital', this.form).then(res => {
        if (res === 1) {
          this.dialogVisible = false
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.getHospitalList()
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
        this.$store.dispatch('hospital/deleteHospital', param).then(res => {
          if (res === 1) {
            this.tableData.splice(index, 1)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
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
      this.getHospitalList(this.search.currentPage, this.search.pageSize)
    },
    handleCurrentChange (val) {
      this.search.currentPage = val
      this.getHospitalList(this.search.currentPage, this.search.pageSize)
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
