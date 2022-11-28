import s from './App.module.css';
import {Route, Routes} from "react-router-dom";
import CategoryPage from "./Components/CategoryPage/CategoryPage";
import Header from "./Components/Header/Header";
import React from "react";
import {connect} from "react-redux";
import {checkCart} from "./redux/cartReducer";
import ProductPage from "./Components/ProductPage/ProductPage";
import CartPage from "./Components/CartPage/CartPage";


class App extends React.Component {
    render() {
        return (
            <div className={s.wrapper}>
                <Header/>
                <div className={s.wrapperContent}>
                    {this.props.isCartOpen && <div className={s.over} onClick={this.props.checkCart}></div>}
                    <Routes>
                        <Route path='/' element={<CategoryPage/>} />
                        <Route path='/category/:categoryId' element={<CategoryPage/>}/>
                        <Route path='/pdp/:productId' element={<ProductPage/>}/>
                        <Route path='/cart' element={<CartPage/>}/>
                    </Routes>
                </div>
            </div>
        );
    }
}


let mapStateToProps = (state) => {
    return {
        isCartOpen: state.cart.isCartOpen
    }
}
export default connect(mapStateToProps, {checkCart})(App)

