import React, { useEffect, useState } from 'react'
import {
    ContainerUser,
    ContentMain,
    CarouselRelease,
    LayoutDefault,
    ContentSidebar,
    ItemShow,
    Covid19
} from "site/user/components"
import { connect } from "react-redux"
import { isArray } from 'lodash'
import "./style.scss";
import { useParams } from "react-router-dom";
import { Pagination } from 'antd';



const NewsType = ({
    highlights,
    seeMore,
    getMenuBar,
    getNewPost,
    newPost,
    getKindOfNewsFollowType,
    dataKindOfNews,
    nameMenu = []
}) => {
    const random = Math.floor(Math.random() * 2);
    const [activeNew, setActiveNew] = useState({})
    const [newShow, setNewShow] = useState([])
    const [page, setPage] = useState(1);
    const [showDataFollowPage, setDataFollowPage] = useState([]);
    let { type } = useParams();

    useEffect(() => {
        getMenuBar();
        getNewPost();

        const inde = type.indexOf("&ind=");
        if (inde > -1) {
            const id = type.substring(inde + 5);
            getKindOfNewsFollowType(id)
        }
    }, [])

    useEffect(() => {
        let arr = []

        isArray(dataKindOfNews) &&
            dataKindOfNews.map((item, index) => {
                if (index == 0) {
                    setActiveNew({ ...item });
                } else arr.push({ ...item })
            })

        setNewShow([...arr])
    }, [dataKindOfNews])

    useEffect(() => {
        if (newShow.length) {
            setDataFollowPage([])
            let arr = []
            newShow.map((item, ind) => {
                if (ind >= ((page - 1) * 15) && ind <= (page * 15)) {
                    arr.push(item)
                }

            })
            setDataFollowPage([...arr])
        }

    }, [page, newShow])

    return (
        <ContainerUser>
            <LayoutDefault
                layoutContent={
                    <>
                        {page == 1 ?
                            (
                                <>
                                    <ContentMain
                                        item={activeNew || {}}
                                        dataShowBottom={newShow}
                                    />
                                    {
                                        isArray(newShow) && newShow.length >= 5 &&
                                        <div className="text-center">
                                            <div className="group-title mt-5">
                                                <span>{`${((nameMenu[Number(type.substring(type.indexOf("&ind=") + 5))]) + ' liên quan').toUpperCase()}`}</span>
                                            </div>
                                            <div className="flex justify-between flex-wrap">
                                                {
                                                    showDataFollowPage.map((item, index) => {
                                                        if (index >= 4 && index <= 20) {
                                                            return <div key={String(index)} style={{ width: 250, }}>
                                                                <ItemShow item={item} />
                                                            </div>
                                                        }
                                                        return null
                                                    })
                                                }

                                            </div>
                                            {
                                                (newShow.length / 15) > 1 && <Pagination
                                                    className="mt-5 mb-5"
                                                    defaultPageSize={15}
                                                    defaultCurrent={1}
                                                    total={newShow.length}
                                                    onChange={val => setPage(val)}
                                                />
                                            }

                                        </div>
                                    }
                                </>
                            ) : (
                                <>
                                    <div className="flex justify-between flex-wrap">
                                        {
                                            showDataFollowPage.map((item, index) => {
                                                if (index >= 4 && index <= 20) {
                                                    return <div key={String(index)} style={{ width: 250, }}>
                                                        <ItemShow item={item} />
                                                    </div>
                                                }
                                                return null
                                            })
                                        }

                                    </div>
                                    <Pagination
                                        className="mt-5 mb-5"
                                        defaultPageSize={15}
                                        defaultCurrent={1}
                                        total={newShow.length}
                                        onChange={val => setPage(val)}
                                    />
                                </>
                            )
                        }

                    </>

                }
                layoutSider={<>
                    <ContentSidebar
                        isScorll={true}
                        styleMenu={random == 0 ? 2 : 1}
                        showItem={6}
                        item={{
                            titles: random == 0 ? "Tin Mới" : 'Nổi bật',
                            data: random == 0 ? [...newPost] : [...highlights]
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
                </>}
            />

        </ContainerUser>
    )
}

const mapStateToProps = (state) => {
    const {
        allNews: {
            highlights = [],
            seeMore = [],
            allNew = [],
            newPost = [],
            dataKindOfNews = []
        },
        menu: {
            nameMenu = []
        }
    } = state;
    return {
        highlights,
        seeMore,
        allNew,
        newPost,
        dataKindOfNews,
        nameMenu
    };
};
const mapDispatchToProps = ({
    allNews: {
        getMenuBar,
        getNewPost,
        getKindOfNewsFollowType
    },
}) => ({
    getKindOfNewsFollowType,
    getMenuBar,
    getNewPost
});
export default connect(mapStateToProps, mapDispatchToProps)(NewsType);
