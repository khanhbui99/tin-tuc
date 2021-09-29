import React from "react"
import HeaderPage from "./HeaderPage"
import FooterPage from "./FooterPage"
import "./style.scss";
import "./maggin_style.scss";



const ContainerUser = ({ children }) => {
    return (
        <div>
            <HeaderPage />
            <div className="container-page content" >
                {children}
            </div>
            <FooterPage/>
        </div>
    )
}

export default ContainerUser

