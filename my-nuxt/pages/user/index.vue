<template>
  <div class="wrap">
    <div class="widge">
      User Index ss
      <el-row>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  layout: 'lawl1et'
}
</script>

<style lang="scss" scoped>
.wrap{
  border: 1px solid black;
  .widge{
    color: red
  }
}
</style>