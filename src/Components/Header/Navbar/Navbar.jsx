import {NavLink} from "react-router-dom";
import s from "./Navbar.module.css";
import React from "react";
import {setCategory} from "../../../redux/categoryReducer";
import {connect} from "react-redux";

class Navbar extends React.Component {
    state = {
        activeCategory: ''
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if (prevProps.currentCategory !== this.props.currentCategory) {
            this.setState({activeCategory:  this.props.currentCategory})
        }
    }

    render() {
        return (
            <ul className={s.nav}>
                { this.props.categories.map( category =>
                    <li key={category.name} className={this.state.activeCategory === category.name ? s.activeLink : null}>
                        <NavLink key={category.id}
                                 to={'/category/' + category.name }
                                 onClick={() =>{this.props.setCategory(category.name)}}>
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
        categories: state.category.categories,
        currentCategory: state.category.currentCategory
    }
}

export default connect(mapStateToProps, {setCategory}) (Navbar)

