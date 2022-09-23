import {NavLink} from "react-router-dom";
import s from "./Navbar.module.css";
import React from "react";
import {getCategories, requestProducts} from "../../../redux/categoryReducer";
import {connect} from "react-redux";

class Navbar extends React.Component {
    componentDidMount() {
        this.props.getCategories();
    }
    state = {
        activeLink: null
    }

    onFilterProducts = (currentCategory) => {
        this.props.requestProducts(currentCategory)
        this.setState({activeLink: currentCategory})
    }

    render() {
        return (
            <ul className={s.nav}>
                { this.props.categories.map( category =>
                    <li  key={category.name} className={this.state.activeLink === category.name ? s.activeLink : null}>
                        <NavLink key={category.id} to={'/category/' + category.name}
                                 onClick={() =>{this.onFilterProducts(category.name)}}
                                 style={({isActive})=>({color: isActive ? '#5ECE7B' : '#1D1F22',fontWeight: isActive ? 600 : 400 })}>
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

export default connect(mapStateToProps, {getCategories, requestProducts }) (Navbar)

