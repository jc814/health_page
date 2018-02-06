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
  mounted: function () {
    if (this.$router.query) {
      this.$message({
        type: 'error',
        message: this.$route.query.code
      })
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
          this.$store.commit('SET_ID', res.data.id)
          this.$store.commit('SET_NAME', res.data.name)
          this.$store.commit('SET_TOKEN', res.token)
          this.$store.commit('SET_TYPE', res.data.type)
          if (window.sessionStorage) {
            var storage = window.sessionStorage
            storage.setItem('id', res.data.id)
            storage.setItem('hid', res.data.hid === null ? '' : res.data.hid)
            storage.setItem('name', res.data.name)
            storage.setItem('token', res.token)
            storage.setItem('type', res.data.type)
          }
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
