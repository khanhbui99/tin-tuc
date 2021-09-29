import constants from "resources/strings";
import client from "utils/client-utils";
export default {
    getFeaturedNews() {
        let url = constants.api.featured_news;
        return client.requestApi("get", url, {});
    },
    getNewPost() {
        let url = constants.api.new_post;
        return client.requestApi("get", url, {});
    },
    getCovid19() {
        let url = constants.api.covid_19;
        return client.requestApi("get", url, {});
    },
    getViewForNews(id) {
        let url = `${constants.api.news}/view/${id}`;
        return client.requestApi("get", url, {});
    },
    getKindOfNewsFollowType(id) {
        let url = `${constants.api.news}/loai-tin/${id}`;
        return client.requestApi("get", url, {});
    },
    searchDataFollowTitle(key) {
        let url = `${constants.api.news}/search/${key}`;
        return client.requestApi("get", url, {});
    },
    createPosts(body = {}) {
        let url = `${constants.api.news}`;
        return client.requestApi("post", url, { ...body });
    },
    updatePosts(id, body = {}) {
        let url = `${constants.api.news}/${id}`;
        return client.requestApi("put", url, { ...body });
    },
    onDeleteType(id) {
        let url = `${constants.api.news}/${id}`;
        return client.requestApi("delete", url, {});
    },
    resetCovid19() {

        return client.requestApi("post", "api/covid", {});
    }

};
