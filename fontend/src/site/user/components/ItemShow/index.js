import React from 'react'
import "./style.scss";
import { useHistory } from "react-router-dom";
import moment from 'moment';


const ItemShow = ({
    type = 1,
    item = {},
}) => {
    const history = useHistory();

    const onDetailsItem = (item = {}) => {
        history.push(`/chi-tiet/${item.slug || ''}_&&&_${item.id}`)
    }

    return (
        <>
            {
                type == 1 ? (
                    <div className="carousel-items" onClick={() => onDetailsItem(item)}>
                        <div style={{ width: '100%', }} className="pr-2">
                            <img src={item.image || ''} alt="carousel items" />
                            <span className='pl-1 pr-1 text-justify line-clamp-4 f-14 mt-2 mb-3 '>
                                {item.title || ''}
                            </span>
                        </div>

                    </div>
                ) : type == 2 ? (
                    <div className="item-content flex mb-2" onClick={() => onDetailsItem(item)}>
                        <div style={{ width: 120 }}>
                            <img
                                src={item.image || ''}
                                className="img-hot pr-3"
                                alt="ảnh tin mới"
                            />
                        </div>
                        <div>
                            <p className="line-clamp-4 f-14 mb-0">
                                {item.title || ''}
                            </p>
                            {/* <p className="mt-3 f-14 author">{`Tác giả: ${item.author || ''}`}</p> */}
                        </div>


                    </div>
                ) : (
                    <div className="item-content flex mb-2 a" onClick={() => onDetailsItem(item)}>
                        <div style={{ width: 150 }}>
                            <img
                                src={item.image || ''}
                                className="img-hot pr-3"
                                alt="ảnh tin mới"
                            />
                        </div>
                        <div >
                            <p className="line-clamp-4 f-14 mb-0 pb-2">
                                {item.title || ''}
                            </p>
                            <span className="f-14"> {`${moment(item.created_at).format('DD/MM/YYYY HH:MM') || ''} | Lượt đọc: ${item.view || 0} | Tác giả: ${item.author || ''}`} </span>

                        </div>

                    </div>
                )
            }
        </>

    )
}


export default ItemShow;
