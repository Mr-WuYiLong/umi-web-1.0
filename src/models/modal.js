export default {
  namespace: 'modal',
  state: {
    visible: false,
    modalShow: null,
  },
  effects: {
    // *showModal() {

    // },
  },
  reducers: {
    showModal(state, { key }) {
      return {
        ...state,
        modalShow: {
          [key]: true,
        },
      };
    },
    hideModal(state) {
      return {
        ...state,
        modalShow: null,
      }
    },
  },
}
