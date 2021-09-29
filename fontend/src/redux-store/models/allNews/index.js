import featuredNewsProvider from "data-access/featured-news-provider";
import { Modal } from "antd";
import snackbar from "utils/snackbar-utils";
const { confirm } = Modal;
export default {
  state: {
    highlights: [],
    seeMore: [],
    allNew: [],
    newPost: [],
    covid19: [],
    itemActive: {},
    dataKindOfNews: [],
    searchData: [],
    dateUpdateCovid: null
  },

  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    getMenuBar: async () => {
      let res = await featuredNewsProvider.getFeaturedNews();

      let { data = {}, success = false } = res || {};

      if (success) {

        dispatch.allNews.updateData({
          highlights: [...(data.noibat || [])],
          seeMore: [...(data.xemnhieu || [])],
          allNew: [...(data.all || [])],
        });
      }
    },
    getNewPost: async () => {
      let res = await featuredNewsProvider.getNewPost();

      let { data = [], success = false } = res || {};

      if (success) {
        
        dispatch.allNews.updateData({
          newPost: data || [],
        });
      }
    },
    getCovid19: async () => {
      let res = await featuredNewsProvider.getCovid19();

      let { data = [], success = false } = res || {};

      if (success) {

        dispatch.allNews.updateData({
          covid19: data || [],
        });
      }
    },
    updateViewForNews: async (id = undefined) => {
      let res = await featuredNewsProvider.getViewForNews(id);

      let { data = {}, success = false } = res || {};

      if (success) {

        dispatch.allNews.updateData({
          itemActive: { ...data },
        });
      }
    },
    getKindOfNewsFollowType: async (id) => {
      dispatch.menu.changeActiveMenu({
        index: id + '',
      });
      let res = await featuredNewsProvider.getKindOfNewsFollowType(id);

      let { data = [], success = false } = res || {};

      if (success) {

        dispatch.allNews.updateData({
          dataKindOfNews: data || [],
        });
      }

    },
    searchDataFollowTitle: async (key) => {
      let res = await featuredNewsProvider.searchDataFollowTitle(key);

      let { data = [], success = false } = res || {};

      if (success) {

        dispatch.allNews.updateData({
          searchData: data || [],
        });
      }
    },
    createOrEdit: (body = {}) => {
      return new Promise(async (resolve, reject) => {
        if (body.id) {
          let res = await featuredNewsProvider.updatePosts(body.id, body);

          const { success = false, message = "" } = res || {};
          if (success) {
            snackbar.show(message, "success");
            resolve(true)
          } else {
            snackbar.show(message, "danger");
            resolve(false)
          }
        } else {
          let res = await featuredNewsProvider.createPosts(body);

          const { success = false, message = "" } = res || {};
          if (success) {
            snackbar.show(message, "success");
            resolve(true)
          } else {
            snackbar.show(message, "danger");
            resolve(false)
          }

        }

      })

    },
    onDelete: (item) => {
      confirm({
        okType: "danger",
        title: "Xác nhận",
        content: `Bạn có muốn xóa ${item.title || ""}?`,
        cancelText: "Hủy",
        okText: "Xóa",
        async onOk() {
          let res = await featuredNewsProvider.onDeleteType(item.id);

          const { success = false, message = "" } = res || {};
          if (success) {
            dispatch.allNews.getMenuBar();
            snackbar.show(message || "Xóa bài viết thành công", "success");
          } else {
            snackbar.show(message, "danger");
          }
        },
        onCancel() {
        },
      });

    },
    onResetCovid19: async (key) => {

      dispatch.allNews.updateData({
        covid19: [],
      });
      let res = await featuredNewsProvider.resetCovid19();

      let { success = false } = res || {};

      if (success) {
        dispatch.allNews.getCovid19();
      }
    }


  }),
};
