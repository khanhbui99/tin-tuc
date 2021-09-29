import React from "react"
import { Row, Input } from "antd"
import ItemMenu from "../ItemMenu";
import { Link, useHistory } from "react-router-dom";
import "./style.scss";

const { Search } = Input;


const HeaderPage = () => {
    const history = useHistory();
    const onSearch = (txt) => {
        if (!txt.length) return
        history.push(`/tim-kiem/${txt}`)
    }
    return (
        <Row className="header-page">
            <div className="logo-search container-page">
                <a href="/" className="logo">
                    <img src={require("resources/images/logo.png")} alt="iSofH" aria-roledescription="logo" />
                </a>
                <Search placeholder="Tìm kiếm bài viết..." allowClear onSearch={onSearch} className="search-input" />
            </div>
            <div style={{ background: '#3173b3c7' }} className="mb-3">
                <div className="container-page">
                    <ItemMenu />
                </div>
            </div>

        </Row>
    )
}

export default HeaderPage

