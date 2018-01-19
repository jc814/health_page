<template>
  <div class="content">
    <el-row>
      <el-col :span="4" :offset="10">
        <div class="loginPanel">
          <el-form :ref="form" :model="form">
            <el-form-item label="姓名"  label-width="40px">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="密码"  label-width="40px">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="signIn">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        password: ''
      }
    }
  },
  methods: {
    signIn () {
      if (this.form.name === '' || this.form.password === '') {
        this.$message({
          type: 'warning',
          message: '请填写完整信息!'
        })
        return
      }
      this.$store.dispatch('admin/adminSignIn', this.form).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '登录成功!'
          })
          this.$store.dispatch('admin/adminIn', res.data)
         // this.$store.getters['admin/id']
          this.$router.push('/')
        } else {
          this.$message({
            type: 'error',
            message: '密码或用户名错误!'
          })
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content{
    height: 100%;
    padding-top: 200px;
  }
  .loginPanel{
    height: 200px;
    padding: 60px 30px 0px 30px;
    background-color: lavender;
  }
</style>
