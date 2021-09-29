import axios from "axios";
import { combineUrlParams } from "utils";
import { getState } from "redux-store/stores";
const REACT_APP_URL = process.env.REACT_APP_URL;
const REACT_APP_URL_PUBLIC = process.env.REACT_APP_URL_PUBLIC;
const REACT_APP_URL_DOMAIN = process.env.REACT_APP_URL_DOMAIN;
const REACT_APP_URL_PRODUCTION = process.env.REACT_APP_URL_PRODUCTION;

export const authPath = "/auth/oauth";
export const originUrl = window.location.origin;
const search = window.location.search;

export const HOST = (() => {
  return window.location.host === REACT_APP_URL // test
    ? process.env.REACT_APP_HOST
    : window.location.host === REACT_APP_URL_PRODUCTION //production
      ? process.env.REACT_APP_HOST_PRODUCTION
      : window.location.host === REACT_APP_URL_DOMAIN //production
        ? process.env.REACT_APP_HOST_DOMAIN
        : window.location.host === REACT_APP_URL_PUBLIC //production public
          ? process.env.REACT_APP_HOST_PUBLIC
          : process.env.REACT_APP_HOST;
})();

const getRedirect = () => {
  return window.location.origin;
};
export const accountUrl = combineUrlParams(`${HOST}${authPath}/authorize`, {
  client_id: "isofh",
  response_type: "code",
  redirect_uri: getRedirect(),
  state: (() => {
    const queryString = decodeURIComponent(search);
    let urlParams = Object.fromEntries(new URLSearchParams(queryString));
    delete urlParams.access_token;
    let url = combineUrlParams(`${window.location.pathname}`, {
      ...urlParams,
    });
    url = encodeURIComponent(url);
    return url;
  })(),
});

const client = axios.create({
  baseURL: `${HOST}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use(async (config) => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const access_token = urlParams.get("token");
  if (config.url?.indexOf("blob:") == 0) config.baseURL = "";
  try {
    let state = getState();
    let token = state.auth?.token;

    if (access_token !== undefined && access_token !== null) {
      token = access_token;
    }

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: "Bearer " + token,
      };
    }

    return config;
  } catch (error) {
    console.log('error: ', error);
    return Promise.reject(error);
  }
});

client.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {
      window.location.href = "/admin/logout?redirect=";
      return Promise.reject();
    }
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      window.location.href = "/admin/logout";
    } else {
      try {
        if (error?.response?.data?.message)
          error.message = error.response.data.message;
      } catch (error) { }
    }
    return Promise.reject(error);
  }
);

export { client };
