import React from "react"
import { Menu } from "antd"
import { useHistory } from "react-router-dom";
import { connect } from "react-redux"
import { isArray } from "lodash";


const ItemMenu = ({
    indexAvtive,
    changeActiveMenu,
    menuBar,
    getKindOfNewsFollowType
}) => {
    const history = useHistory();

    const onChangeMenu = async (item = {}, index = 0) => {
        if (index) {
            await getKindOfNewsFollowType(index);
        }
        changeActiveMenu({ index: index, active: item })
        history.push(`${item.id == 0 ? '/' : `/tin-tuc/${item.slug}&ind=${index}`}`)

    }
    return (
        <Menu
            mode="horizontal"
            selectedKeys={[(indexAvtive && indexAvtive || '0')]}
            className=""
            style={{ background: 'transparent', color: '#fff' }}
            color="#fff"
            theme="dark"
        >

            {
                isArray(menuBar) &&
                menuBar.map((item, index) => {
                    return (
                        <Menu.Item key={String(index)}
                            onClick={() => onChangeMenu(item, item.id)}
                        >
                            <span className="nav-link-text">
                                {item.name}
                            </span>
                        </Menu.Item>
                    )
                })
            }

        </Menu>

    )
}

const mapStateToProps = (state) => {
    const {
        menu: {
            indexAvtive = '1',
            menuBar = [],
        },
    } = state;
    return {
        indexAvtive,
        menuBar,
    };
};
const mapDispatchToProps = ({
    menu: { changeActiveMenu },
    allNews: { getKindOfNewsFollowType },
}) => ({
    changeActiveMenu,
    getKindOfNewsFollowType
});
export default connect(mapStateToProps, mapDispatchToProps)(ItemMenu);


