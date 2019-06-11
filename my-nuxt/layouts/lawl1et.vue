<template>
  <div id="app">
    <no-ssr>
      <v-header></v-header>
      <v-breadcrumb></v-breadcrumb>
    </no-ssr>
    <nuxt />
    <v-footer></v-footer>
  </div>
</template>
<script>
const VHeader = () => import('~/components/Header')
const VBreadcrumb = () => import('~/components/Breadcrumb')
const VFooter = () => import('~/components/Footer')
export default {
  name: 'Lawl1et',
  components: {
    VHeader,
    VBreadcrumb,
    VFooter
  }
}
</script>
<style lang="scss">
@import './style/reset.scss';
#app{
  height: 100%;
  width: 100%;
}
</style>


