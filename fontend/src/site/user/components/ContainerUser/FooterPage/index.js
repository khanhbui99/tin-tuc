import React from 'react'
import Iframe from 'react-iframe'


const dataFooter = [
    {
        label: "LIÊN HỆ",
        data: ["NT: Nguyễn Bảo Long", "Email: khanhbuix9@gmail.com", 'Sdt: 0974.362.511'],
        align: "left"
    },
    {
        label: "THÀNH VIÊN",
        data: ["Nguyễn Bảo Long", "Lê Minh Đức", 'Nguyễn Trung Quân', 'Nguyễn Đức Long', 'Bùi Duy Khánh']
    },
    {
        label: "ĐỊA CHỈ",
        data: [],
        align: "left"

    }
]

const FooterPage = () => {
    return (
        <div>
            <div className="background-default">
                <div
                    className="container-page flex align-center justify-between"
                    style={{ height: 50 }}
                >
                    <span style={{ fontSize: '1.5rem' }}>
                        Nhóm 2
                    </span>
                    <span style={{ fontSize: '1.5rem' }}>
                        Website - Đọc Báo
                    </span>
                </div>
            </div>
            <div className="container-page flex mt-3 justify-between">
                {
                    dataFooter.map((item, index) => {
                        return (
                            <div style={{ textAlign: item.align || "center" }} key={String(index)} className="mr-4">
                                <label
                                    className="mb-0"
                                    style={{ fontSize: "1rem", fontWeight: 600 }}
                                >{item.label}</label>
                                <div
                                    style={{
                                        width: 25,
                                        borderBottom: 1,
                                        borderColor: '#021052',
                                        borderWidth: 1,
                                        borderStyle: 'solid',
                                        margin: item.align ? 0 : 'auto'
                                    }}
                                />
                                {index == 2 && (
                                    <Iframe url="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1515.7892634419336!2d105.7972240786426!3d20.98447046065023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135acc6c44959d5%3A0xd7edcdb815622dd1!2zNTQgUGjhu5EgVHJp4buBdSBLaMO6YywgVGhhbmggWHXDom4gTmFtLCBUaGFuaCBYdcOibiwgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e1!3m2!1svi!2s!4v1625409985776!5m2!1svi!2s"
                                        width="300x"
                                        height="170px"
                                        id="myId"
                                        className="myClassname"
                                        display="initial"
                                        position="relative" />
                                ) ||
                                    (
                                        <div className="mt-2">
                                            {item.data.map((item2, index2) => {
                                                return <p className="mt-1 mb-0" key={String(index2)}>{item2}</p>
                                            })}
                                        </div>
                                    )}

                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}


export default FooterPage