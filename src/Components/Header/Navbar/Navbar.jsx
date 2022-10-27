import {NavLink} from "react-router-dom";
import s from "./Navbar.module.css";
import React from "react";
import {requestProducts} from "../../../redux/categoryReducer";
import {connect} from "react-redux";

class Navbar extends React.Component {
    state = {
        activeCategory: null
    }

    onFilterProducts = (activeCategory) => {
        this.props.requestProducts(activeCategory)
        this.setState({activeCategory: activeCategory})
    }

    render() {
        return (
            <ul className={s.nav}>
                { this.props.categories.map( category =>
                    <li key={category.name} className={this.state.activeCategory === category.name ? s.activeLink : null}>
                        <NavLink key={category.id} to={'/category/' + category.name} onClick={() =>{this.onFilterProducts(category.name)}}>
                            {category.name}
                        </NavLink>
                    </li>
                )}
            </ul>
        )
    }
}


let mapStateToProps = (state) => {
    return{
        categories: state.category.categories
    }
}

export default connect(mapStateToProps, {requestProducts }) (Navbar)

