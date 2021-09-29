import React, { useEffect, useState } from "react";
import { AdminPage, Panel } from "site/admin/components/admin";
import {
  Table,
  SelectSize,
  Pagination,
  FilterSelect,
} from "site/admin/components/common";
import { Button, Tooltip, DatePicker } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import "./style.scss"

const News = ({
  allNew,
  getMenuBar,
  getNewPost,
  nameMenu,
  history,
  onDelete
}) => {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [showDataFollowPage, setDataFollowPage] = useState([]);
  const [isLoadData, setLoading] = useState(true);


  useEffect(() => {
    getMenuBar();
    getNewPost()
  }, []);

  useEffect(() => {

    if (allNew.length) {
      setLoading(true)

      setDataFollowPage([])
      allNew.sort(function (a, b) {
        return new Date(b.created_at) - new Date(a.created_at);
      });



      let arr = []
      allNew.map((item, ind) => {
        if (ind >= ((page - 1) * size) && ind < (page * size)) {
          arr.push(item)
        }

      })
      setDataFollowPage([...arr]);
      setLoading(false)

    }

  }, [page, allNew, size])

  let listData = showDataFollowPage.map((item, index) => {
    return {
      key: index,
      col1: (page - 1) * size + index + 1,
      col2: item.image || "",
      col3: item.title || "",
      col4: nameMenu[item.loai_tin_id || 0] || "",
      col5: item.short_content || "",
      col6: (item || {}).author || "",
      col7:
        item.created_at &&
        moment(item.created_at).format("DD/MM/YYYY"),
      col8: item.view || 0,
      col9: item,
    };
  });
  const editItem = (item) => {
    history.push({
      pathname: `/admin/bai-viet/chinh-sua/${item.id}`
    });
  };
  const addItem = () => {
    history.push({
      pathname: `/admin/bai-viet/them-moi`,
      state: {
        nameMenu,
        // listSpecialize: listSpecialize,
      },
    });
  };
  const onSearch = (e, item) => {
    // updateData({
    //   [item]: e,
    //   page: 1,
    //   size: 10,
    // });
    // if (requestTimeout) {
    //   try {
    //     clearTimeout(requestTimeout);
    //   } catch (error) { }
    // }
    // let data = setTimeout(() => loadEmployee(1), 500);
    // updateData({
    //   requestTimeout: data,
    // });
  };
  return (
    <AdminPage
      icon="subheader-icon fal fa-window"
      header="Danh sách bài viết"
      subheader="Danh sách bài viết"
    >
      <Panel
        id="panel-list-site"
        title="Danh sách bài viết"
        icon={[<i className="fal fa-newspaper"></i>]}
        toolbar={
          <div className="toolbar">
            <Button className="button" onClick={() => addItem()}>
              Thêm mới
            </Button>
          </div>
        }
      >
        <Table
          loading={isLoadData}
          scroll={{ x: 800, y: 500 }}
          style={{ marginLeft: -10, marginRight: -10 }}
          className="custom"
          columns={[
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">STT</div>
                  <div className="addition-box"></div>
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
                  <div className="title-box">Ảnh</div>
                  <div className="addition-box"></div>
                </div>
              ),
              width: 150,
              dataIndex: "col2",
              key: "col2",
              align: "center",
              render: (item) => {
                return item ? (
                  <img
                    src={item.absoluteFileUrl()}
                    alt=" "
                    style={{ maxWidth: 85 }}
                  />
                ) : (
                  <img
                    src={require("resources/images/nhanvien/anhdaidien.png")}
                    alt=" "
                  />
                );
              },
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Tiêu đề</div>
                  <div className="addition-box">
                    <div className="search-box">
                      <img src={require("resources/images/icon/ic_search.png")} alt="" />
                      <input
                        // value={hoVaTenSearch}
                        onChange={(e) => {
                          onSearch(e.target.value, "hoVaTenSearch");
                        }}
                        placeholder="Tìm theo tiêu đề"
                      />
                    </div>
                  </div>
                </div>
              ),
              width: 200,
              dataIndex: "col3",
              key: "col3",
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Thể loại</div>
                  <div className="addition-box"></div>
                </div>
              ),
              width: 200,
              dataIndex: "col4",
              key: "col4",
              align: "center",
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Mô tả</div>
                  <div className="addition-box"></div>
                </div>
              ),
              width: 300,
              dataIndex: "col5",
              key: "col5",
              render: (item) => {
                return (
                  <div className="line-clamp-4">
                    {item}
                  </div>
                );
              },
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Tác giả</div>
                  <div className="addition-box"></div>
                </div>
              ),
              width: 200,
              dataIndex: "col6",
              align: "center",
              key: "col6",
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Ngày viết</div>
                  <div className="addition-box"></div>
                </div>
              ),
              width: 200,
              dataIndex: "col7",
              key: "col7",
              align: "center",
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Lượt đọc</div>
                  <div className="addition-box"></div>
                </div>
              ),
              width: 200,
              dataIndex: "col8",
              key: "col8",
              align: "center",
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Tiện ích</div>
                  <div className="addition-box"></div>
                </div>
              ),
              width: 170,
              dataIndex: "col9",
              key: "col9",
              align: "center",
              fixed: "right",
              render: (item) => {
                return (
                  <div className="col-action">
                    <Tooltip placement="topLeft" title={"Sửa"}>
                      <div>
                        <button
                          className="btn btn-info btn-icon waves-effect waves-themed btn-edit"
                          onClick={() => editItem(item)}
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
          dataSource={listData}
        ></Table>
        <div className="footer">
          <SelectSize value={size} selectItem={val => setSize(val)} />
          <Pagination
            onPageChange={val => setPage(val)}
            page={page}
            size={size}
            total={allNew.length}
            style={{ flex: 1, justifyContent: "flex-end" }}
          />
        </div>
      </Panel>
      {/* {modalAssignProject && <ModalAssignProject />} */}
    </AdminPage>
  );
}
export default connect(
  (state) => {
    const {
      allNews: {
        allNew = [],
      },
      menu: {
        nameMenu = []
      }
    } = state;
    return {
      allNew,
      nameMenu
    };
  },

  ({
    allNews: { getMenuBar, getNewPost, onDelete },
  }) => {
    return {
      getMenuBar,
      getNewPost,
      onDelete
    };
  }
)(News);
