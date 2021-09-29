import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { AdminPage, Panel } from "site/admin/components/admin";
import Table from "site/admin/components/common/Table";
import { Button } from "antd";
import './style.scss'

const Covid19 = ({
    covid19,
    history,
    getCovid19,
    allNew,
    nameMenu,
    getNewPost,
    getMenuBar
}) => {

    useEffect(() => {
        getCovid19();
        getNewPost();
        getMenuBar();
    }, [])

    const gotoRouter = (router = '') => {
        router.length && history.push({
            pathname: router
        });
    }
    return (
        <AdminPage>
            <Panel>
                <div style={{ display: 'flex', flexWrap: 'wrap', height: '80vh', justifyContent: 'space-between' }}>
                    <div className="container-item" >
                        <div className="content">
                            <div className="top">
                                <div>
                                    <p style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{(allNew || []).length}</p>
                                    <p style={{ color: '#fff', margin: 0, marginTop: 5 }}>Tin tức</p>
                                </div>
                                <i style={{ fontSize: 40, color: '#8c8c8c' }} className="fal fa-newspaper"></i>
                            </div>
                            <p className="bottom" onClick={() => gotoRouter('/admin/danh-sach-bai-viet')}>Truy cập</p>
                        </div>

                    </div>

                    <div className="container-item">
                        <div className="content" style={{ background: '#40d444' }}>
                            <div className="top">
                                <div>
                                    <p style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>{(nameMenu || []).length}</p>
                                    <p style={{ color: '#fff', margin: 0, marginTop: 5 }}>Loại tin</p>
                                </div>
                                <i style={{ fontSize: 40, color: '#8c8c8c' }} className="fal fa-calendar-minus"></i>
                            </div>
                            <p className="bottom" onClick={() => gotoRouter('/admin/danh-sach-the-loai')}>Truy cập</p>
                        </div>

                    </div>

                    <div className="container-item">
                        <div className="content" style={{ background: '#e09604' }} >
                            <div className="top">
                                <div>
                                    <p style={{ color: '#fff', fontSize: '1rem', fontWeight: 'bold', margin: 0 }}>
                                        Cập nhập: {(covid19 || []).length} nước
                                    </p>
                                    <p style={{ color: '#fff', margin: 0, marginTop: 5 }}>Covid 19</p>
                                </div>
                                <i style={{ fontSize: 40, color: '#8c8c8c' }} className="fal fa-user-check"></i>
                            </div>
                            <p className="bottom" onClick={() => gotoRouter('/admin/covid-19')}>Truy cập</p>
                        </div>

                    </div>
                </div>


            </Panel>
        </AdminPage>
    );
}
export default connect(
    (state) => {
        const {
            allNews: {
                covid19 = [],
                allNew = [],

            },
            menu: {
                nameMenu = []
            }
        } = state
        return {
            covid19,
            allNew,
            nameMenu
        };
    },
    ({
        allNews: {
            getCovid19,
            onResetCovid19,
            getMenuBar, getNewPost,
        },
    }) => ({
        getCovid19,
        onResetCovid19,
        getNewPost,
        getMenuBar
    })
)(Covid19);
