import s from './App.module.css';
import {Route, Routes} from "react-router-dom";
import CategoryPage from "./Components/CategoryPage/CategoryPage";
import PDP from "./Components/ProductPage/ProductPage";
import Header from "./Components/Header/Header";
import Cart from "./Components/CartPage/CartPage";
import React from "react";
import {connect} from "react-redux";
import {checkCart} from "./redux/cartReducer";


class App extends React.Component {
    render() {
        return (
            <div className={s.wrapper}>
                <Header/>
                <div className={s.wrapperContent}>
                    {this.props.isCartOpen && <div className={s.over} onClick={this.props.checkCart}> </div>}
                    <Routes>
                        <Route path='/category/:categoryId' element={<CategoryPage/>}/>
                        <Route path='/pdp/:productId' element={<PDP/>}/>
                        <Route path='/cart' element={<Cart/>}/>
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

