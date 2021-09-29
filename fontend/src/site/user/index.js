import React from "react";
import Loadable from "react-loadable";
import { Switch } from "react-router-dom";
import RouterWithPaths from "components/RouterWithPaths";
import {
  SettingLayout,
  Loading
} from "site/admin/components/admin";
import Admin from "site/admin";
import "antd/dist/antd.css";

const index = (props) => {

  const routers = [
    {
      path: ["/"],
      component: Loadable({
        loader: () => import("site/user/containers/Home"),
        loading: Loading,
      }),
    },
    {
      path: ["/chi-tiet/:id"],
      component: Loadable({
        loader: () => import("site/user/containers/DetailsNews"),
        loading: Loading,
      }),
    },
    {
      path: ["/tin-tuc/:type"],
      component: Loadable({
        loader: () => import("site/user/containers/NewsType"),
        loading: Loading,
      }),
      // component: Admin,
    },
    {
      path: ["/tim-kiem/:key"],
      component: Loadable({
        loader: () => import("site/user/containers/Seaerch"),
        loading: Loading,
      }),
    },
  ];

  return (
    <div>
      <Switch>
        {routers.map((route, key) => {
          if (route.component)
            return (
              <RouterWithPaths
                exact
                key={key}
                path={route.path}
                render={(props) => {
                  return <route.component {...props} />;
                }}
              />
            );
          return null;
        })}
      </Switch>
      <SettingLayout />
    </div>
  );
}

export default index
