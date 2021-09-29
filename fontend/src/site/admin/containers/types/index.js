import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import { Button, Tooltip, Form, Input } from "antd";
import { Table, SelectSize, Pagination, } from "site/admin/components/common";
import "react-daterange-picker/dist/css/react-calendar.css";
import moment from "moment";
import "./style.scss";

const OfferLeave = ({
  menuBar,
  createOrEdit,
  onDelete
}) => {
  const [showDataFollowPage, setDataFollowPage] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [item, setItem] = useState({});
  const [checkValidate, setCheckValidate] = useState(false)
  const [isLoadData, setLoading] = useState(true);

  useEffect(() => {

    if (menuBar.length) {
      setLoading(true)

      setDataFollowPage([])
      let valArr = (menuBar || [{}]).filter(m => m.id !== 0)
      valArr.sort(function (a, b) {
        return new Date(b.created_at) - new Date(a.created_at);
      });

      let arr = []
      valArr.map((item, ind) => {
        if (ind >= ((page - 1) * size) && ind < (page * size)) {
          arr.push(item)
        }

      })
      setDataFollowPage([...arr])
      setLoading(false)

    }

  }, [page, menuBar, size])

  let data = (showDataFollowPage || []).map((item, index) => {
    return {
      key: index,
      col1: (page - 1) * size + index + 1,
      col2: item.name || "",
      col3: item.created_at ? moment(item.created_at).format("DD/MM/YYYY") : "",
      col4: item,
    };
  });
  const onCreateOrUpdate = () => {
    if (!item.name || item.name.length <= 3) {
      setCheckValidate(true)
      return
    }

    createOrEdit({
      ...item
    }).then(s=>{
      if(s) {
        setItem({})
      }
    })

  };
  return (
    <AdminPage
      header="Danh sách thể loại"
      subheader="Danh sách thể loại"
      icon="subheader-icon fal fa-window"
    >
      <div className="row custome-news">
        <div className="col-md-8">
          <Panel
            loading={isLoadData}
            title="Danh sách thể loại"
            allowClose={false}
            allowFullScreen={false}
            icon={[<i className="fal fa-calendar-minus"></i>]}
          >
            <Table
              lo
              className="custom"
              scroll={{ x: 800, y: 500 }}
              style={{ marginLeft: -10, marginRight: -10 }}
              columns={[
                {
                  title: (
                    <div className="custome-header">
                      <div className="title-box">STT</div>
                    </div>
                  ),
                  width: 70,
                  dataIndex: "col1",
                  key: "col1",
                  align: "center",
                },
                {
                  title: (
                    <div className="custome-header">
                      <div className="title-box">Tên</div>
                    </div>
                  ),
                  key: "col2",
                  dataIndex: "col2",
                  align: "center",
                  width: 400,
                },
                {
                  title: (
                    <div className="custome-header">
                      <div className="title-box">Ngày tạo</div>
                    </div>
                  ),
                  key: "col3",
                  dataIndex: "col3",
                  align: "center",
                  width: 200,
                },
                {
                  title: (
                    <div className="custome-header">
                      <div className="title-box">Tiện ích</div>
                    </div>
                  ),
                  key: "col4",
                  dataIndex: "col4",
                  align: "center",
                  width: 170,
                  fixed: "right",
                  render: (item) => {
                    return (
                      <div className="col-action">
                        <Tooltip placement="topLeft" title={"Sửa"}>
                          <div>
                            <button
                              className="btn btn-info btn-icon waves-effect waves-themed btn-edit"
                              onClick={() => {
                                setItem(item);
                                setCheckValidate(false)
                              }}
                            >
                              <i className="fal fa-edit"></i>
                            </button>
                          </div>
                        </Tooltip>
                        <Tooltip placement="topLeft" title={"Xóa"}>
                          <div>
                            <button
                              className="btn btn-info btn-icon waves-effect waves-themed btn-delete"
                              onClick={() => {
                                onDelete(item);
                              }}
                            >
                              <i className="fal fa-trash-alt"></i>
                            </button>
                          </div>
                        </Tooltip>
                      </div>
                    );
                  },
                },
              ]}
              dataSource={data || []}
            ></Table>
            <div className="footer">
              <SelectSize value={size} selectItem={val => setSize(val)} />
              <Pagination
                onPageChange={val => setPage(val)}
                page={page}
                size={size}
                total={menuBar.length}
                style={{ flex: 1, justifyContent: "flex-end" }}
              ></Pagination>
            </div>
          </Panel>
        </div>
        <div className="col-md-4 custome-panel">
          <Panel
            toolbar={
              <div className="toolbar">
                <Button className="button" onClick={() => onCreateOrUpdate()}>
                  {item.id ? "Thay đổi" : "Thêm mới"}
                </Button>
              </div>
            }
            icon={[<i className="fal fa-calendar-minus"></i>]}
            allowClose={false}
            allowFullScreen={false}
          >
            <Form layout="vertical">
              <Form.Item label="Tên (*): ">
                <Input.TextArea
                  onChange={(e) => {
                    setItem({
                      ...item,
                      name: e.target.value
                    })
                  }}
                  value={item.name}
                  placeholder="Nhập tên"
                />
                {checkValidate && (!item.name || item.name.length <= 3) ? (
                  <div className="error">Vui lòng nhập tên (lớn hơn 3 ký tự)!</div>
                ) : null}
              </Form.Item>

            </Form>

          </Panel>
        </div>
      </div>
    </AdminPage>
  );
}
export default connect(
  (state) => {
    const {
      menu: {
        menuBar = []
      }
    } = state;
    return {
      menuBar
    };
  },
  ({
    menu: { createOrEdit, onDelete },
  }) => {
    return {
      createOrEdit,
      onDelete
    };
  }
)(OfferLeave);
