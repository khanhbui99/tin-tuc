import userProvider from "data-access/user-provider";
import clientUtils from "utils/client-utils";
import snackbar from "utils/snackbar-utils";
export default {
  state: {
    auth: (() => {
      try {
        let data = localStorage.getItem("auth") || "";
        if (data) {
          data = JSON.parse(data);
          clientUtils.auth = "Bearer " + data.token;
          return data;
        }
      } catch (error) {
        console.log(error);
      }
      return null;
    })(),
  },
  reducers: {
    updateData(state, payload = {}) {
      return { ...state, ...payload };
    },
  },
  effects: (dispatch) => ({
    onLogin: (param) => {
      const { matKhau, taiKhoan } = param;
      return new Promise((resolve, reject) => {
        if (!matKhau || !taiKhoan) {
          snackbar.show("Thông tin tài khoản không đúng", "danger");
          return;
        }
        userProvider
          .login(matKhau, taiKhoan)
          .then((res) => {
            const { data = {}, message = "", success = false } = res

            if (success) {

              localStorage.setItem("auth", JSON.stringify((data || {})));
              clientUtils.auth = "Bearer " + data?.token;
              dispatch.auth.updateData({
                auth: data,
              });

              snackbar.show(message || "", "success");
              resolve(res);
            } else {
              snackbar.show(
                message || "Đăng nhập không thành công",
                "danger"
              );
              reject(message);
            }
          })
          .catch((e) => {
            snackbar.show(e.message || "Đăng nhập không thành công", "danger");
            reject(e);
          });
      });
    },
    onLogout: () => {
      dispatch.auth.updateData({
        auth: null,
        detail: null,
      });
      clientUtils.auth = null;
    },
    checkRole: (payload, state) => {
      let auth = state.auth.auth;
      if (auth && auth.id) {
        let checkRole = (auth.authorities || []).includes("ROLE_Manager");
        dispatch.auth.updateData({
          checkRole,
        });
      }
    },
  }),
};
