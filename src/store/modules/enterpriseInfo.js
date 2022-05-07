const state = {
  enterpriseType: '' // 1服务商企业
}

const mutations = {
  CHANGE_ENTERPRISE_TPYE: (state, val) => {
    state.enterpriseType = val
  }
}
const actions = {
  async getEnterpriseType ({commit},val) {
    commit('CHANGE_ENTERPRISE_TPYE',val)
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}