import { isArray, size } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import "./style.scss";
import { connect } from "react-redux"



const Covid19 = ({
    getCovid19,
    covid19
}) => {
    const [covid, setCovid] = useState([])
    const [lengSeeMore, setLengSeeMore] = useState(10)

    useEffect(() => {
        getCovid19();
    }, [])

    useEffect(() => {
        if (covid19.length) {
            let cases = 0;
            let deaths = 0;
            let arr = []

            covid19.map(item => {
                cases += Number(item.cases)
                deaths += Number(item.deaths)
            })

            arr.push(
                {
                    country: "WORLD",
                    deaths,
                    cases
                }
            )

            setCovid([...arr, ...covid19].sort(function (a, b) { return b.cases - a.cases }))
        }
    }, [covid19])

    const formatNumber = (n) => {
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }
    return (
        <>

            {
                covid.length &&
                <div className="covid">
                    <div className="header-covid" style={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}>
                        <h4 className="color font-bold pt-5">THỐNG KÊ SỐ LIỆU COVID-19</h4>
                        <div className="color">{`Cập nhập: ${moment(new Date()).format("DD/MM/YYYY - HH:MM")}`}</div>
                    </div>
                    <div style={{
                        height: (lengSeeMore * 50) + 1,
                        overflow: 'hidden',
                        position: 'relative'
                    }}>
                        <div className="flex justify-between f-14 group-aa pr-2 pl-2">
                            <p style={{ width: '35%' }}>
                                <img
                                    src={require("resources/images/ic_co.jpg")}
                                    alt=""
                                    style={{ height: 30 }}
                                />
                            </p>
                            <div className="flex justify-between" style={{ width: '65%' }}>
                                <p className="flex justify-end w-50">
                                    <img
                                        src={require("resources/images/oo.png")}
                                        alt=""
                                        style={{ height: 30 }}
                                    />
                                </p>
                                <p className="flex justify-end w-50">
                                    <img
                                        src={require("resources/images/die.jpg")}
                                        alt=""
                                        style={{ height: 30 }}
                                    />

                                </p>
                            </div>
                        </div>
                        {isArray(covid) && covid.map((item, index) => {
                            return <div
                                key={String(index)}
                                className={`flex justify-between f-14 group-aa pr-2 pl-2 ${index == 0 ? 'or' : index % 2 == 0 ? 'bl' : ''}`}
                                style={{ borderRightWidth: 1, borderLeftWidth: 1, borderColor: '#ccc', borderLeftStyle: 'solid', borderRightStyle: 'solid' }}
                            >
                                <p style={{ width: '35%' }}>{item.country || ''}</p>
                                <div className="flex justify-between" style={{ width: '65%' }}>
                                    <p className="w-50">{formatNumber(item.cases + '' || "0")}</p>
                                    <p className="red w-50">{formatNumber(item.deaths + '' || '0')}</p>
                                </div>
                            </div>
                        })}
                    </div>
                    {lengSeeMore <= covid.length &&
                        <div style={{ height: 30 }} className="flex justify-end f-14 group-aa pr-2 pl-2 ">
                            <span
                                className="seemore"
                                onClick={() => setLengSeeMore(lengSeeMore + 10)}
                            >XEM THÊM</span>
                        </div>
                    }

                </div>
            }
        </>

    )
}

const mapStateToProps = (state) => {
    const {
        allNews: {
            covid19 = [],
        },
    } = state;
    return {
        covid19,
    };
};
const mapDispatchToProps = ({
    allNews: { getCovid19 },
}) => ({
    getCovid19,
});
export default connect(mapStateToProps, mapDispatchToProps)(Covid19);
