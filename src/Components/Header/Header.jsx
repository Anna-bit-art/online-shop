import Navbar from "./Navbar/Navbar";
import s from "./Header.module.css";
import logo from "../../img/a-logo.png";
import Actions from "./Actions/Actions";
import React from "react";
import {connect} from "react-redux";
import {getCategories} from "../../redux/categoryReducer";
import {getCurrencies} from "../../redux/currencyReducer";



class Header extends React.Component {
    componentDidMount() {
        this.props.getCategories();
        this.props.getCurrencies();
    }
    render() {
        return (
            <header>
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
export default connect(null, {getCategories, getCurrencies})
(Header)
