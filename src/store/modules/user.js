import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  // state是用来提供数据的
  state () {
    return {
      userInfo: getInfo()
    }
  },
  // mutations 是用来提供修改数据的方法的
  mutations: {
    setUserInfo (state, obj) {
      state.useInfo = obj
      setInfo(obj)
    }
  },
  // actions 是用来提供异步操作的
  actions: {
    logout (context) {
      // 个人信息要重置
      context.commit('setUserInfo', {})
      // 购物车信息要重置(跨模块调用mutations)
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  // getters 是用来提供基于state所派生出来的一些属性的
  getters: {}
}
