import {NavLink} from "react-router-dom";
import s from "./Navbar.module.css";
import React from "react";
import {setCategory} from "../../../redux/categoryReducer";
import {connect} from "react-redux";

class Navbar extends React.Component {
    state = {
        activeCategory: ''
    }

    componentDidMount() {
        if (!this.props.currentCategory){
            this.setState({activeCategory: this.props.categories.find(e => e !== undefined).name})
        } else {
            this.setState({activeCategory: this.props.currentCategory})
        }
    }

    setCurrentCategory = (category) => {
        this.setState({activeCategory: category})
        this.props.setCategory(category);
    }

    render() {
        console.log(this.state)
        return (
            <ul className={s.nav}>
                {this.props.categories.map(category =>
                    <li key={category.name}
                        className={this.state.activeCategory === category.name ? s.activeLink : null}>
                        <NavLink key={category.id}
                                 to={'/category/' + category.name}
                                 onClick={() => {this.setCurrentCategory(category.name)}}>
                            {category.name}
                        </NavLink>
                    </li>
                )}
            </ul>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        categories: state.category.categories,
        currentCategory: state.category.currentCategory,
        isFetching: state.category.isFetching
    }
}

export default connect(mapStateToProps, {setCategory})
(Navbar)

