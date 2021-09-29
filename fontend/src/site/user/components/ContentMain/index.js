import React from "react"
import "./style.scss";
import ItemShow from '../ItemShow'
import { isArray } from "lodash";
import { useHistory } from "react-router-dom";

const ContentMain = ({
    isHome,
    item = {},
    dataShowBottom = []
}) => {
    const history = useHistory();

    const onDetailsItem = (item = {}) => {
        history.push(`/chi-tiet/${item.slug || ''}_&&&_${item.id}`)
    }
    return (
        <div className="group-content-main" >
            <div className="head-content pt-2">
                <div className="text-conent" onClick={() => onDetailsItem(item)}>
                    <img
                        src={item.image || ""}
                        className="img-hot"
                        alt="ảnh chính trong ngày"
                    />
                    {
                        !isHome && item.title &&
                        <div className="group-not-home" >
                            <h4>{item.title || ''}</h4>
                            <span className=" line-clamp-4">
                                {item.short_content || ''}
                            </span><br />
                            <span
                                className="f-14 author mb-5"
                                style={{ background: "#08aaa8" }}
                            >{`Tác giả: ${item.author || ''}`}</span>
                        </div>
                    }

                    {isHome &&
                        <h2 className="text-justify line-clamp-4 pt-2">
                            {item.title || ''}
                        </h2>
                    }
                </div>
                {
                    isHome && item.short_content && <>
                        <span className="text-justify line-clamp-4 ">
                            {item.short_content || ''}
                        </span><br />
                        <span
                            className="f-14 author mb-5"
                            style={{ background: "#08aaa8" }}
                        >{`Tác giả: ${item.author || ''}`}</span>
                    </>

                }

            </div>
            {!isHome &&

                <div className="news-active flex align-center justify-between mt-4 mb-4">

                    {
                        isArray(dataShowBottom) && dataShowBottom.map((item, index) => {
                            return (
                                <div
                                    key={String(index)}
                                    className='item-content'
                                    style={{ display: index < 4 && 'block' || 'none' }}
                                >
                                    <ItemShow item={item} />
                                </div>
                            )

                        })
                    }

                </div>
            }
        </div>
    )
}

export default ContentMain