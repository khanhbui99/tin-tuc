import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { useHistory } from "react-router-dom";

function LoginScreen(props) {
  const history = useHistory();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = () => {
    const param = {
      matKhau: password,
      taiKhoan: username.trim(),
    };

    props.onLogin(param).then((s) => {
      props.updateData({
        auth: s.data,
      });
      history.replace("/admin/Dashboard");
    });
  };
  useEffect(() => {
    if (!(props.auth || {}).token) {
      history.replace("/admin/login");
    } else {
      history.replace("/admin/Dashboard");
    }

  }, []);

  const onKeyDown = (e) => {
    if (e.nativeEvent.code === "Enter") {
      onLogin();
    }
  };

  return (
    <Main>
      <div
        className="container-login100"
        style={{
          backgroundImage: `url(${require("resources/images/bg_login.jpg")})`,
        }}
      >
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65p-t-65 p-b-54">
          <div className="login100-form validate-form">
            <span className="login100-form-title p-b-49">
              <img
                src={require("resources/images/logo.png")}
                alt=""
                style={{ paddingBottom: 20, width: '100%' }}
              />
              <br />
              ĐĂNG NHẬP
            </span>
            <div
              className="wrap-input100 validate-input m-b-23"
              data-validate="Username is reauired"
            >
              <span className="label-input100">Tài khoản</span>
              <input
                className="input100"
                type="text"
                name="username"
                value={username}
                placeholder="Nhập tài khoản"
                onKeyDown={onKeyDown}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </div>

            <div
              className="wrap-input100 validate-input"
              data-validate="Password is required"
            >
              <span className="label-input100">Mật khẩu</span>
              <input
                className="input100"
                type="password"
                name="pass"
                value={password}
                placeholder="Nhập mật khẩu"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onKeyDown={onKeyDown}
              />
            </div>

            <div className="text-right p-t-8 p-b-31"></div>
            <div className="container-login100-form-btn">
              <div className="wrap-login100-form-btn">
                <div className="login100-form-bgbtn"></div>
                <button onClick={onLogin} className="login100-form-btn">
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default connect(
  (state) => ({
    auth: state.auth.auth,
  }),
  ({ auth: { onLogin, updateData } }) => {
    return {
      onLogin,
      updateData,
    };
  }
)(LoginScreen);
