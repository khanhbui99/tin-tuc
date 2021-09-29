import React, { useEffect, useState } from 'react'
import {
    ContainerUser,
    LayoutDefault,
    ContentSidebar,
    ItemShow,
    Covid19
} from "site/user/components"
import { connect } from "react-redux"
import { isArray } from 'lodash'
import "./style.scss";
import { Pagination } from 'antd';
import { useParams } from "react-router-dom";


const HomeScreen = ({
    highlights,
    seeMore,
    getMenuBar,
    getNewPost,
    newPost,
    searchData,
    searchDataFollowTitle,
    changeActiveMenu
}) => {
    const [page, setPage] = useState(1);
    const [showDataFollowPage, setDataFollowPage] = useState([]);
    let { key } = useParams();


    useEffect(() => {
        setDataFollowPage([]);
        changeActiveMenu({ index: -1, active: {} })
        getMenuBar();
        getNewPost();
        searchDataFollowTitle(key);
    }, [])

    useEffect(() => {
        if (searchData.length) {
            setDataFollowPage([])
            let arr = []

            searchData.map((item, ind) => {
                if (ind >= ((page - 1) * 30) && ind <= (page * 30)) {
                    arr.push(item)
                }

            })
            setDataFollowPage([...arr])
        }

    }, [page, searchData])

    return (
        <ContainerUser>
            <LayoutDefault
                layoutContent={
                    isArray(searchData) && searchData.length ?
                        <div className="mt-5">
                            {
                                showDataFollowPage.map((item, index) => {
                                    return <ItemShow key={String(index)} type={3} item={item} />
                                })
                            }
                            {
                                (searchData.length / 30) > 1 &&
                                <Pagination
                                    className="mt-5 mb-5"
                                    defaultPageSize={30}
                                    defaultCurrent={1}
                                    total={searchData.length}
                                    onChange={val => setPage(val)}
                                />
                            }

                        </div> : <h2 className="text-center mt-5">{`Không tìm thấy dữ liệu cho từ khóa ${key}!`}</h2>
                }
                layoutSider={
                    <div className="mt-5">
                        <ContentSidebar
                            isScorll={true}
                            styleMenu={1}
                            showItem={6}
                            item={{
                                titles: "Tin Mới",
                                data: [...newPost]
                            }}
                        />
                        <div className="mb-5" />
                        <ContentSidebar
                            isScorll={true}
                            styleMenu={1}
                            showItem={6}
                            item={{
                                titles: 'Nổi bật',
                                data: [...highlights]
                            }}
                        />
                        <div className="mb-5" />
                        <ContentSidebar
                            isScorll={true}
                            styleMenu={1}
                            item={{
                                titles: "Đọc nhiều",
                                data: [...seeMore]
                            }}
                            showItem={6}
                        />
                        <div className="mb-5" />
                        <Covid19 />
                        <div className="mb-5" />
                    </div>}
            />


        </ContainerUser>
    )
}

const mapStateToProps = (state) => {
    const {
        allNews: {
            highlights = [],
            seeMore = [],
            newPost = [],
            searchData = []
        },
    } = state;
    return {
        highlights,
        seeMore,
        newPost,
        searchData
    };
};
const mapDispatchToProps = ({
    allNews: {
        getMenuBar,
        getNewPost,
        searchDataFollowTitle
    },
    menu: { changeActiveMenu },

}) => ({
    getMenuBar,
    getNewPost,
    searchDataFollowTitle,
    changeActiveMenu
});
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
