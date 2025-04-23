export default {
  // 此处编写的就是 Vue 组件实例的配置项 ，通过一定语法可以直接混入到组件内部
  // data methods computed 生命周期函数 ...
  // 注意点： 如果此处 和 组件内， 提供了同名的data和methods，则组件内优先级更高
  methods: {
    // 根据登录状态，判断是否需要登录确认框 如果弹了返回true 如果没弹返回false
    loginConfirm () {
      if (!this.$store.getters.token) {
        // 弹确认框
        this.$dialog.confirm({
          title: '温馨提示',
          message: '此时需要登录才能继续操作',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛'
        })
          .then(() => {
            // 如果希望跳转到登录 =》 登录后能回跳回来，需要在跳转前携带参数（当前的路径地址）
            // this.$route.fullpath(包含查询参数)
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => { })
        return true
      }
      return false
    }
  }
}
