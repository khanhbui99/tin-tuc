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
import ContentItem from './ContentItem'


const DetailsNews = ({
    getNewPost,
    newPost,
    seeMore,
    getMenuBar,
}) => {

    useEffect(() => {
        getNewPost()
        getMenuBar();
    }, [])

    return (
        <ContainerUser>
            <LayoutDefault
                layoutContent={
                    <ContentItem />
                }
                layoutSider={<>
                    <ContentSidebar
                        styleMenu={2}
                        item={{
                            titles: "Đọc nhiều",
                            data: [...seeMore]
                        }}
                    />
                    <div className="mb-5" />
                    <ContentSidebar
                        styleMenu={2}
                        item={{
                            titles: "Tin Mới",
                            data: [...newPost]
                        }}
                    />
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
            newPost = [],
            seeMore = [],
        },
    } = state;
    return {
        newPost,
        seeMore
    };
};
const mapDispatchToProps = ({
    allNews: { getNewPost, getMenuBar },
}) => ({
    getNewPost,
    getMenuBar
});
export default connect(mapStateToProps, mapDispatchToProps)(DetailsNews);
