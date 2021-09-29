import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux"
import { useParams } from "react-router-dom";
import { isArray } from 'lodash'
import { CarouselRelease, } from "site/user/components"
import "./style.scss"

const ContentItem = ({
    itemActive,
    updateViewForNews,
    changeActiveMenu,
    highlights,
    seeMore
}) => {
    const [dataShow, setDataShow] = useState([]);
    const [isHtml, setIsHtml] = useState(false);
    const [dataCousel, setDataCarousel] = useState([])
    let { id } = useParams();

    useEffect(() => {
        setDataCarousel([
            {
                title: "Nổi bật",
                leg: isArray(highlights) && highlights.length || 0,
                data: isArray(highlights) && highlights || []
            },
            {
                title: "Đọc nhiều 24h",
                leg: isArray(seeMore) && seeMore.length || 0,
                data: isArray(seeMore) && seeMore || []
            }

        ])

    }, [highlights])
    useEffect(() => {
        changeActiveMenu({ index: -1, active: {} })
        const inde = id.indexOf("_&&&_");
        if (inde > -1) {
            const i = id.substring(inde + 5);
            updateViewForNews(i);
        }
    }, [])

    useEffect(() => {
        const { id = 0, content = "", image = "" } = itemActive
        if (id) {

            if (content.indexOf('<p>') > -1) {
                setIsHtml(true);
            } else {
                setIsHtml(false);
                let arr = []
                const random = Math.floor(Math.random() * 2);
                const leng = content.length;
                const start = content.substring(0, parseInt(leng / 2))
                const end = content.substring(parseInt(leng / 2))

                for (let i = 0; i < 3; i++) {

                    arr.push({
                        isImage: random == i,
                        value: random == i ? image : random == 0 ? content : i == 0 ? start : end,
                    })
                }
                setDataShow([...arr])
            }

        }
    }, [itemActive])

    const renderHtml = (html) => {
        return document.getElementById("content-show").innerHTML = html;
    }

    return (
        <>
            {
                itemActive.id && (
                    <div>
                        <h1>{itemActive.title || ''}</h1>
                        <span className="f-14"> {`${moment(itemActive.created_at).format('Thu, DD/MM/YYYY HH:MM') || ''} | Lượt đọc: ${itemActive.view || 0} | `} </span>
                        <span className="f-14 author" style={{ background: "#08aaa8" }}>{`Tác giả: ${itemActive.author || ''}`}</span>
                        <div className="mt-5" style={{ fontSize: '1rem' }}>
                            {
                                !isHtml && dataShow.map((item, ind) => {
                                    if (item.isImage) {
                                        return (
                                            <div
                                                key={String(ind)}
                                                className="mt-2 mb-3"
                                                style={{ display: 'flex', justifyContent: "center", }}
                                            >
                                                <img
                                                    src={item.value || ""}
                                                    className="img-hot"
                                                    alt={itemActive.image_id || ""}
                                                />
                                            </div>

                                        )
                                    }
                                    return (
                                        <p key={String(ind)} style={{ fontSize: '1rem' }}>
                                            {item.value || ''}
                                        </p>
                                    )
                                })
                            }

                        </div>
                        <div id="content-show" style={{ fontSize: '1rem' }}>
                            {isHtml && renderHtml(itemActive.content)}
                        </div>

                    </div>
                )
            }
            <div className="mb-5" />
            <div className="mb-5" />
            <div className="mb-5" />
            {

                dataCousel.map((item, index) => {
                    if (item.leg > 0) {
                        return <div key={String(index)} className=" mb-3">
                            <div className="group-title">
                                <span>{item.title || ''}</span>
                            </div>
                            <CarouselRelease data={item.data || []} nberItem={4} />
                        </div>
                    }
                    return <div key={String(index)} />
                })
            }
        </>

    )
}

const mapStateToProps = (state) => {
    const {
        allNews: {
            itemActive,
            highlights = [],
            seeMore = [],
        },
    } = state;
    return {
        itemActive,
        highlights,
        seeMore,
    };
};
const mapDispatchToProps = ({
    allNews: { updateViewForNews },
    menu: { changeActiveMenu },

}) => ({
    updateViewForNews,
    changeActiveMenu
});
export default connect(mapStateToProps, mapDispatchToProps)(ContentItem);
