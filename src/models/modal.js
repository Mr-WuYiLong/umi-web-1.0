export default {
  namespace: 'modal',
  state: {
    visible: false,
  },
  effects: {
    // *showModal() {

    // },
  },
  reducers: {
    showModal(state) {
      return {
        ...state,
        visible: true,
      };
    },
    hideModal(state) {
      return {
        ...state,
        visible: false,
      }
    },
  },
}
