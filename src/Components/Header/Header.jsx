import Navbar from "./Navbar/Navbar";
import s from "./Header.module.css";
import logo from "../../img/a-logo.png";
import Actions from "./Actions/Actions";
import React from "react";



class Header extends React.Component {
    render() {

        return (
            <header className={s.header} >

                <div className={s.navbar}>
                    <Navbar/>
                </div>

                <div className={s.logo}>
                    <img alt={'logo'} src={logo}/>
                </div>

                <div className={s.actions}>
                    <Actions/>
                </div>

            </header>
        )
    }
}
export default Header;