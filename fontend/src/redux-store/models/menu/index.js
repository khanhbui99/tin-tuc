import typeOfNewsProvider from "data-access/type-of-news-provider";
import { Modal } from "antd";
import snackbar from "utils/snackbar-utils";
const { confirm } = Modal;
export default {
  state: {
    menuBar: [],
    activeMenu: {},
    nameMenu: [],
    indexAvtive: '0',
  },

  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getMenuBar: async () => {
      let res = await typeOfNewsProvider.getTypeOfNews();

      let { data = [], success = false } = res || {};

      if (success) {
        const arr = data.map(item => item.name)
        let arrMenu = [{
          id: 0,
          name: "Trang chủ",
          slug: "",
        }]

        dispatch.menu.updateData({
          menuBar: arrMenu.concat(data),
        });
        dispatch.menu.updateData({
          nameMenu: ([""]).concat(arr),
        });
      }
    },
    changeActiveMenu: async (payload,) => {
      const { index = 1, active = {} } = payload

      dispatch.menu.updateData({
        indexAvtive: index + '',
        activeMenu: { ...active }
      });
    },
    createOrEdit: (body = {}) => {
      return new Promise(async (resolve, reject) => {
        if (body.id) {
          let res = await typeOfNewsProvider.onUpdateTypeNew(body.id, body);

          const { success = false, message = "" } = res || {};
          if (success) {
            dispatch.menu.getMenuBar();
            resolve(true)
            snackbar.show(message || "Thay đổi thành công", "success");
          } else {
            snackbar.show(message, "danger");
          }
        } else {
          let res = await typeOfNewsProvider.onCreateTypeNew(body);

          const { success = false, message = "" } = res || {};
          if (success) {
            dispatch.menu.getMenuBar();
            resolve(true)
            snackbar.show(message || "Tạo mới thành công", "success");
          } else {
            snackbar.show(message, "danger");
          }
        }

      })

    },
    onDelete: (item) => {

      confirm({
        okType: "danger",
        title: "Xác nhận",
        content: `Bạn có muốn xóa ${item.name || ""}?`,
        cancelText: "Hủy",
        okText: "Xóa",
        async onOk() {
          let res = await typeOfNewsProvider.onDeleteType(item.id);

          const { success = false, message = "" } = res || {};
          if (success) {
            dispatch.menu.getMenuBar();
            snackbar.show(message || "Xóa thể loại thành công", "success");
          } else {
            snackbar.show(message, "danger");
          }
        },
        onCancel() {
        },
      });

    }


  }),
};
