import React, { useState, useRef, useEffect } from "react";
import { Upload, Modal } from "antd";
import snackbar from "utils/snackbar-utils";
import { Icon } from "antd";
import fileProvider from "data-access/file-provider";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

export default (props) => {
  const files = useRef([]);
  const [state, _setState] = useState({
    previewVisible: false,
    previewImage: "",
    fileList: files.current,
  });
  const setState = (_state) => {
    _setState((state) => ({
      ...state,
      ...(_state || {}),
    }));
  };
  useEffect(() => {
    files.current = props.files
      ? [
        {
          status: "done",
          uid: "-1",
          name: "ảnh",
          url: props.files,
        },
      ]
      : [];
    setState({
      fileList: files.current,
      hasChange: false,
    });
  }, [props.files]);
  const handleCancel = () => setState({ previewVisible: false });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  const handleChange = ({ fileList }) => { };

  const { previewVisible, previewImage, fileList } = state;
  const uploadButton = (
    <div>
      <Icon type="plus" style={{ paddingBottom: 11 }} />
      <div className="ant-upload-text">Tải ảnh lên</div>
    </div>
  );
  // const onSave = () => {
  //   let url = files.current
  //     .filter((item) => item.status === "done")
  //     .map((item) => item.url);
  //   if (props.onSave) props.onSave(url);
  // };
  return (
    <div className="clearfix">
      <Upload
        listType="picture-card"
        fileList={fileList.map((item) => {
          let item2 = JSON.parse(JSON.stringify(item));
          if (item2.url) item2.url = item2.url.absoluteFileUrl();
          return item2;
        })}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={(file) => {
          files.current = files.current.filter((item) => item.uid !== file.uid);
          setState({
            fileList: files.current,
            hasChange: true,
          });
          props.uploadImage("");
        }}
        customRequest={({ onSuccess, onError, file }) => {
          file.status = "uploading";
          files.current.push(file);
          setState({
            fileList: files.current,
          });
          props.uploadImage(true)
          fileProvider
            .upload(file, props.provider)
            .then((s) => {
              const { success = false, message = "" } = s.data

              if (success) {
                files.current = [
                  {
                    status: "done",
                    uid: "-1",
                    name: "ảnh",
                    url: (s.data || {}).data[0],
                  },
                ]
                props.uploadImage((s.data || {}).data[0]);
                setState({
                  fileList: files.current,
                  hasChange: true,
                });
              } else {
                snackbar.show(message, "danger");
              }

              // var x = files.current.find((item) => item.uid === file.uid);
              // if (x) {
              //   if (s && s.data.code === 0 && s.data.data.length) {
              //     props.uploadImage(s.data.data);
              //     let url = s.data.data;
              //     x.status = "done";
              //     x.url = url;
              //   } else {
              //     x.status = "error";
              //   }

              // }
            })
        }}
        accept=".png,.gif,.jpg"
      >
        {fileList.length > 0 ? null : uploadButton}
      </Upload>
      {/* {state.hasChange && <Button onClick={onSave}>Lưu thay đổi</Button>} */}
      <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
};
