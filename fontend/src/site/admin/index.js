import React, { useEffect } from "react";
import Loadable from "react-loadable";
import { Switch } from "react-router-dom";
import RouterWithPaths from "components/RouterWithPaths";
import {
  SideBar,
  Header,
  Breadcrumbs,
  Footer,
  SettingLayout,
} from "site/admin/components/admin";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "antd/dist/antd.css";
import { Loading } from "site/admin/components/admin";


const Admin = (props) => {
  useEffect(() => {
    window.registerEvent();
  });
  const history = useHistory();

  const routers = [
    {
      roles: [],
      path: ["/admin/Dashboard"],
      component: Loadable({
        loader: () => import("site/admin/containers/dashboard"),
        loading: Loading,
      }),
    },
    {
      roles: [],
      path: ["/admin/covid-19"],
      component: Loadable({
        loader: () => import("site/admin/containers/covid19"),
        loading: Loading,
      }),
    },
    {
      roles: [],
      path: ["/admin/danh-sach-the-loai"],
      component: Loadable({
        loader: () => import("site/admin/containers/types"),
        loading: Loading,
      }),
    },
    {
      roles: [],
      path: ["/admin/danh-sach-bai-viet"],
      component: Loadable({
        loader: () => import("site/admin/containers/news"),
        loading: Loading,
      }),
    },
    {
      roles: [],
      path: ["/admin/bai-viet/them-moi","/admin/bai-viet/chinh-sua/:id"],
      component: Loadable({
        loader: () => import("site/admin/containers/news/create"),
        loading: Loading,
      }),
    },
  ];
  if (!props.auth || !props.auth.token) {
    localStorage.clear();
    history.push("/admin/login");
    return null;
  }
  return (
    <div>
      <div className="page-wrapper">
        <div className="page-inner">
          <SideBar />
          <div className="page-content-wrapper">
            <Header />
            <main id="js-page-content" role="main" className="page-content">
              <Breadcrumbs />
              <Switch>
                {routers.map((route, key) => {
                  if (route.component)
                    return (
                      <RouterWithPaths
                        exact
                        key={key}
                        roles={route.roles}
                        path={route.path}
                        render={(props) => {
                          return <route.component {...props} />;
                        }}
                      />
                    );
                  return null;
                })}
              </Switch>
            </main>
            <div
              className="page-content-overlay"
              data-action="toggle"
              data-class="mobile-nav-on"
            ></div>
            <Footer />
            <div
              className="modal fade modal-backdrop-transparent"
              id="modal-shortcut"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="modal-shortcut"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-top modal-transparent"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body">
                    <ul className="app-list w-auto h-auto p-0 text-left">
                      <li>
                        <a
                          href="intel_introduction.html"
                          className="app-list-item text-white border-0 m-0"
                        >
                          <div className="icon-stack">
                            <i className="base base-7 icon-stack-3x opacity-100 color-primary-500 "></i>
                            <i className="base base-7 icon-stack-2x opacity-100 color-primary-300 "></i>
                            <i className="fal fa-home icon-stack-1x opacity-100 color-white"></i>
                          </div>
                          <span className="app-list-name">Home</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="page_inbox_general.html"
                          className="app-list-item text-white border-0 m-0"
                        >
                          <div className="icon-stack">
                            <i className="base base-7 icon-stack-3x opacity-100 color-success-500 "></i>
                            <i className="base base-7 icon-stack-2x opacity-100 color-success-300 "></i>
                            <i className="ni ni-envelope icon-stack-1x text-white"></i>
                          </div>
                          <span className="app-list-name">Inbox</span>
                        </a>
                      </li>
                      <li>
                        <a
                          href="intel_introduction.html"
                          className="app-list-item text-white border-0 m-0"
                        >
                          <div className="icon-stack">
                            <i className="base base-7 icon-stack-2x opacity-100 color-primary-300 "></i>
                            <i className="fal fa-plus icon-stack-1x opacity-100 color-white"></i>
                          </div>
                          <span className="app-list-name">Add More</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <p id="js-color-profile" className="d-none">
              <span className="color-primary-50"></span>
              <span className="color-primary-100"></span>
              <span className="color-primary-200"></span>
              <span className="color-primary-300"></span>
              <span className="color-primary-400"></span>
              <span className="color-primary-500"></span>
              <span className="color-primary-600"></span>
              <span className="color-primary-700"></span>
              <span className="color-primary-800"></span>
              <span className="color-primary-900"></span>
              <span className="color-info-50"></span>
              <span className="color-info-100"></span>
              <span className="color-info-200"></span>
              <span className="color-info-300"></span>
              <span className="color-info-400"></span>
              <span className="color-info-500"></span>
              <span className="color-info-600"></span>
              <span className="color-info-700"></span>
              <span className="color-info-800"></span>
              <span className="color-info-900"></span>
              <span className="color-danger-50"></span>
              <span className="color-danger-100"></span>
              <span className="color-danger-200"></span>
              <span className="color-danger-300"></span>
              <span className="color-danger-400"></span>
              <span className="color-danger-500"></span>
              <span className="color-danger-600"></span>
              <span className="color-danger-700"></span>
              <span className="color-danger-800"></span>
              <span className="color-danger-900"></span>
              <span className="color-warning-50"></span>
              <span className="color-warning-100"></span>
              <span className="color-warning-200"></span>
              <span className="color-warning-300"></span>
              <span className="color-warning-400"></span>
              <span className="color-warning-500"></span>
              <span className="color-warning-600"></span>
              <span className="color-warning-700"></span>
              <span className="color-warning-800"></span>
              <span className="color-warning-900"></span>
              <span className="color-success-50"></span>
              <span className="color-success-100"></span>
              <span className="color-success-200"></span>
              <span className="color-success-300"></span>
              <span className="color-success-400"></span>
              <span className="color-success-500"></span>
              <span className="color-success-600"></span>
              <span className="color-success-700"></span>
              <span className="color-success-800"></span>
              <span className="color-success-900"></span>
              <span className="color-fusion-50"></span>
              <span className="color-fusion-100"></span>
              <span className="color-fusion-200"></span>
              <span className="color-fusion-300"></span>
              <span className="color-fusion-400"></span>
              <span className="color-fusion-500"></span>
              <span className="color-fusion-600"></span>
              <span className="color-fusion-700"></span>
              <span className="color-fusion-800"></span>
              <span className="color-fusion-900"></span>
            </p>
          </div>
        </div>
      </div>
      <SettingLayout />
    </div>
  );
}

export default connect((state) => {
  return {
    auth: state.auth.auth,
  };
})(Admin);
