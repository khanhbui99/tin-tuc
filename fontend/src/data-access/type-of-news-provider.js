import constants from "resources/strings";
import client from "utils/client-utils";
export default {
  getTypeOfNews() {
    let url = constants.api.typeOfNews;
    return client.requestApi("get", url, {});
  },
  onCreateTypeNew(body) {
    let url = constants.api.typeOfNews;
    return client.requestApi("post", url, body);
  },
  onUpdateTypeNew(id, body) {
    let url = `${constants.api.typeOfNews}/${id}`;
    return client.requestApi("put", url, body);
  },
  onDeleteType(id) {
    let url = `${constants.api.typeOfNews}/${id}`;
    return client.requestApi("delete", url, {});
  },
};
