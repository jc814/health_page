<template>
  <div class="content">
    <div class="header">
      <el-row>
        <el-col :span="5">
          <el-input placeholder="请输入内容">
            <el-button slot="append">搜索</el-button>
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
        <el-table-column prop="id" label="工号" sortable >
        </el-table-column>
        <el-table-column prop="name" label="姓名" >
        </el-table-column>
        <el-table-column prop="sex" label="性别">
        </el-table-column>
        <el-table-column prop="phone" label="联系电话">
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
        :current-page="1"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="5"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length">
      </el-pagination>
      <el-dialog :title="dialogTitle[dialogStatus]" :visible.sync="dialogVisible" width="25%" center>
        <el-form :model="form" label-width="100px">
          <el-form-item label="工号：" v-if="dialogStatus === 'update'" >
            <el-input v-model.number="form.id" :disabled="true"/>
          </el-form-item>
          <el-form-item label="姓名：">
            <el-input v-model.number="form.name"/>
          </el-form-item>
          <el-form-item label="性别：">
            <el-radio-group v-model="form.sex">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="联系电话：" :rules="[
            { required: true, message: '电话不能为空'},
            { type: 'number', message: '电话必须为数字值'}]">
            <el-input v-model.number="form.phone"/>
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
      },
      tableData: [
        {
          id: '1',
          name: '河田',
          sex: '女',
          phone: '13275029182'
        }, {
          id: '2',
          name: '颜汗',
          sex: '男',
          phone: '13275029182'
        }, {
          id: '3',
          name: '车大吉',
          sex: '男',
          phone: '13275029182'
        }, {
          id: '4',
          name: '李艳',
          sex: '女',
          phone: '13275029182'
        }
      ]
    }
  },
  methods: {
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
      for (const v of this.tableData) {
        if (this.form.id === v.id) {
          const index = this.tableData.indexOf(v)
          this.tableData.splice(index, 1, this.form)
          break
        }
      }
      this.dialogVisible = false
      this.$message({
        type: 'success',
        message: '添加成功!'
      })
    },
    handleAdd () {
      this.form.id = 5
      this.tableData.unshift(this.form)
      this.dialogVisible = false
      this.$message({
        type: 'success',
        message: '添加成功!'
      })
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该人员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
