<template>
  <header>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true">
        <el-menu-item
          v-for="(item, index) in menuList"
          :key="index"
          :index="item.name"
          :route="{path: item.path}"
        >{{ item.name }}</el-menu-item>
        <el-menu-item>
          <div class="login-status">
            <div class="status-sign-in" v-if="!isLogin" @click="routerToLoginPage">登录</div>
            <div class="status-sign-in" v-if="isLogin" @click="handleSignOut">{{ user.userName }} 退出登录</div>
          </div>
        </el-menu-item>
    </el-menu>
  </header>
</template>

<script>
const MENU_LIST_REG = ['goods', 'cart', 'orderconfirm-address']
export default {
  name: 'Header',
  data () {
    return {
      user: this.$cookie.get('user'),
      activeIndex: '',
      menuList: [],
      menuListReg: MENU_LIST_REG // 菜单排序规则
    }
  },
  computed: {
    isLogin () {
      return !!this.user
    }
  },
  methods: {
    handleSignOut () {
      this.user = ''
      this.$cookie.remove('user')
    },
    routerToLoginPage () {
      this.$router.push({ path: '/login' })
    }
  },
  created () {
    // 全部路由数据
    let menuList = this.$router.options.routes
    console.log('menuList', menuList)
    if(Array.isArray(menuList) && menuList.length > 0) {
      let newList = menuList.filter(item => {
        return ~this.menuListReg.findIndex(reg => reg === item.name.toLowerCase())
      })
      this.menuList = newList
      // 当前路由数据
      let route = this.$route
      this.activeIndex = route.name
    }
  }
}
</script>

<style lang="scss" scoped>
header{
  width: 100%;
  min-height: 60px;
  .login-status{
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
}
</style>
