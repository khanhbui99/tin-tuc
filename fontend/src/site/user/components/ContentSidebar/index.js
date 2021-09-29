import { isArray } from "lodash";
import React from "react"
import "./style.scss";
import ItemShow from "../ItemShow"
import { useHistory } from "react-router-dom";
import { connect } from "react-redux"


const ContentSidebar = ({
    styleMenu = 2,
    hidenTitle = false,
    item = {},
    showItem = 4,
    isShowFull = true,
    isScorll = false,
    nameMenu = []
}) => {
    const history = useHistory();
    const onDetailsItem = (item = {}) => {
        history.push(`/chi-tiet/${item.slug || ''}_&&&_${item.id}`)
    }
    return (
        <div className="group-siled">
            {styleMenu == 1 &&
                <div className="style-1 ">
                    {
                        !hidenTitle && <h4 className="line-clamp-4 title background-default">
                            {item.titles || ''}
                        </h4>
                    }
                    <div
                        className={
                            !hidenTitle && "content pr-2 pl-2 scroll" || "content mt-2 scroll"
                            // isScorll && 'scroll'
                        }
                        style={{
                            height: isScorll && showItem * 90
                        }}
                    >
                        {
                            isArray(item.data) &&
                            item.data.map((item2, index) => {
                                if (!isShowFull) {
                                    if (showItem >= (index + 1))
                                        return (
                                            <ItemShow
                                                key={String(index)}
                                                type={2}
                                                item={item2}
                                            />
                                        )
                                } else {
                                    return (
                                        <ItemShow
                                            key={String(index)}
                                            type={2}
                                            item={item2}
                                        />
                                    )
                                }

                            })
                        }
                    </div>

                </div>

            }

            {styleMenu == 2 &&
                <div className="style-2 ">

                    <div className="title-txt mb-4">

                        {!hidenTitle &&
                            <>
                                <h4 className="title mb-1">
                                    {item.titles || ''}
                                </h4>
                                <div className="dot_" />
                            </>
                        }

                    </div>

                    <div className="content">

                        {
                            isArray(item.data) &&
                            item.data.map((item2, index) => {
                                return (
                                    <a href={item2?.isDanTri == 1 ? item2?.slug
                                        : `/chi-tiet/${item2.slug || ''}_&&&_${item2.id}`}
                                        target="_blank"
                                        className="text-decoration-unset"
                                        key={String(index)} 
                                    >
                                        <div className="item-content pt-2 pb-2">
                                            <label className="mb-0">{nameMenu[item2.loai_tin_id || 0]}</label>
                                            <p className="line-clamp-4 f-14 mb-0">
                                                {item2.title || ''}
                                            </p>
                                            <label className="mb-0 pt-1">{`Tác giả: ${item2?.isDanTri == 1 ? 'Dân Trí' : item2?.author || ''}`}</label>
                                        </div>
                                    </a>

                                )

                            })
                        }
                    </div>
                </div>

            }


        </div >
    )
}
const mapStateToProps = (state) => {
    const {
        menu: {
            nameMenu = []
        }
    } = state;
    return {
        nameMenu
    };
};
export default connect(mapStateToProps)(ContentSidebar);