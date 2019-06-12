export const state = () => ({
  prdIds: []
})

export const mutations = {
  increment (state, payload) {
    state.prdIds.push(payload)
  }
}