<template>
  <div class="content">
    <div class="header">
      <el-row>
        <el-col :span="5">
          <el-input placeholder="请输入内容" >
            <el-button slot="append" @click="">搜索</el-button>
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
        <el-table-column prop="HospitalName" label="所属医院">
        </el-table-column>
        <el-table-column prop="name" label="科室名称">
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
        :page-sizes="[1, 2, 3, 4]"
        :page-size="search.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="search.totalCount">
      </el-pagination>
      <el-dialog :title="dialogTitle[dialogStatus]" :visible.sync="dialogVisible" width="40%" center>
        <el-form :model="form" label-width="100px">
          <el-form-item label="id：" v-if="dialogStatus === 'update'" >
            <el-input v-model="form.id" :disabled="true"/>
          </el-form-item>
          <el-form-item label="所属医院：">
            <el-input v-model="form.hospitalName"/>
          </el-form-item>
          <el-form-item label="科室名称：">
            <el-input v-model="form.name"/>
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
      tableDate: [],
      hospitalNames: [],
      form: {
        id: '',
        hid: '',
        hospitalName: '',
        name: ''
      },
      search: {
        name: '', // 名称查询
        currentPage: 1, // 当前页码
        totalCount: 1000, // 默认数据总数
        pageSize: 2 // 默认每页数据量
      },
    }
  },
  created () {
    this.getHospitalName()
  },
  methods: {
    getHospitalName () {
      this.$store.dispatch('selectHospitals', null).then(res => {
        this.hospitalNames = res.data;
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
