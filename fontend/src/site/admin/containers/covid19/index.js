import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import Table from "site/admin/components/common/Table";
import SelectSize from "site/admin/components/common/SelectSize";
import Pagination from "site/admin/components/common/Pagination";
import moment from "moment";
import { Button } from "antd";

const Covid19 = ({
  covid19,
  getCovid19,
  onResetCovid19
}) => {
  const [showDataFollowPage, setDataFollowPage] = useState([]);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [isLoadData, setLoading] = useState(true);
  const [loadingBnt, setLoadingBnt] = useState(false);

  useEffect(() => {
    getCovid19()
  }, [])

  useEffect(() => {

    if (covid19.length) {
      setLoading(true)

      setDataFollowPage([])

      let arr = []
      covid19.map((item, ind) => {
        if (ind >= ((page - 1) * size) && ind < (page * size)) {
          arr.push(item)
        }

      })
      setDataFollowPage([...arr])
      setLoading(false)

    }

  }, [page, covid19, size])


  let data = (showDataFollowPage || []).map((item, index) => {

    return {
      key: index,
      col1: (page - 1) * size + index + 1,
      col2: item.country || '',
      col3: item.image || '',
      col4: item.todayCases || 0,
      col5: item.recovered || 0,
      col6: item.todayDeaths || 0,
      col7: item.cases || 0,
      col8: item.recovered || 0,
      col9: item.deaths || 0,
      col10: item.updated_at ? moment(item.updated_at).format("DD/MM/YYYY hh:ss:mm") : '',
    };
  });
  return (
    <AdminPage
      header="Covid 19"
      subheader="Covid 19"
      icon="subheader-icon fal fa-window"
    >
      <Panel
        title="Covid 19"
        icon={[<i className="fal fa-user-check"></i>]}
        allowClose={false}
      >
        <div className="toolbar" style={{ marginBottom: '1rem', marginTop: '3rem', textAlign: "right" }}>
          <Button type="primary" onClick={async () => {
            setLoadingBnt(true)
            setLoading(true)
            setDataFollowPage([])
            await onResetCovid19();
            setLoading(false)
            setLoadingBnt(false)
          }} disabled={loadingBnt}>
            Cập nhập
          </Button>
        </div>
        <Table
          loading={isLoadData}
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
              key: "col1",
              dataIndex: "col1",
              width: 70,
              align: "center",
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Quốc gia</div>
                </div>
              ),
              key: "col2",
              dataIndex: "col2",
              align: "center",
              width: 200,
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Cờ</div>
                </div>
              ),
              key: "col3",
              dataIndex: "col3",
              width: 150,
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
                  <div className="title-box"> Số ca mắc bệnh hôm nay </div>
                </div>
              ),
              key: "col4",
              dataIndex: "col4",
              align: "center",
              width: 150,
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Số ca hồi phục hôm nay</div>
                </div>
              ),
              key: "col5",
              dataIndex: "col5",
              align: "center",
              width: 170,
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Số ca tử vong hôm nay</div>
                </div>
              ),
              key: "col6",
              dataIndex: "col6",
              align: "center",
              width: 200,
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Tổng số ca</div>
                </div>
              ),
              key: "col7",
              dataIndex: "col7",
              align: "center",
              width: 200,
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Tổng số ca hồi phục</div>
                </div>
              ),
              key: "col8",
              dataIndex: "col8",
              align: "center",
              width: 150,
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Tổng số ca tử vong</div>
                </div>
              ),
              key: "col9",
              dataIndex: "col9",
              align: "center",
              width: 150,
            },
            {
              title: (
                <div className="custome-header">
                  <div className="title-box">Cập nhập</div>
                </div>
              ),
              key: "col10",
              dataIndex: "col10",
              align: "center",
              width: 200,
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
            total={covid19.length}
            style={{ flex: 1, justifyContent: "flex-end" }}
          ></Pagination>
        </div>
      </Panel>
    </AdminPage>
  );
}
export default connect(
  (state) => {
    const {
      allNews: {
        covid19 = []
      }
    } = state
    return {
      covid19
    };
  },
  ({
    allNews: {
      getCovid19,
      onResetCovid19
    },
  }) => ({
    getCovid19,
    onResetCovid19
  })
)(Covid19);
