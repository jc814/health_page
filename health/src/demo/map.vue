<template>
  <div class="amap-page-container">
    <el-amap vid="amapDemo" :zoom="12" class="amap-demo">
      <el-amap-marker :position="position" ></el-amap-marker>
    </el-amap>
  </div>
</template>
<style>
  .amap-page-container {
    width: 800px;
    height: 600px;
  }
</style>

<script>
  export default {
    data () {
      return {
        position: [118.097345, 24.471889]
      }
    }
  }
</script>
