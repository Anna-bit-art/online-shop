import s from './App.module.css';
import {Route, Routes} from "react-router-dom";
import CategoryPage from "./Components/CategoryPage/CategoryPage";
import Header from "./Components/Header/Header";
import React from "react";
import {connect} from "react-redux";
import {checkCart} from "./redux/cartReducer";
import ProductPage from "./Components/ProductPage/ProductPage";
import CartPage from "./Components/CartPage/CartPage";
import {checkCurrencyList} from "./redux/currencyReducer";


class App extends React.Component {
    render() {
        return (
            <>
                {this.props.isCartOpen && <div className={s.over} onClick={this.props.checkCart}></div>}
                {this.props.isCurrencyOpen && <div className={s.over} style={{background: "transparent"}}
                                                   onClick={this.props.checkCurrencyList}></div>}

                <div className={s.wrapper}>
                    <Header />
                    <div className={s.wrapperContent}>
                        <Routes>
                            <Route path="/" element={<CategoryPage/>} />
                            <Route path='/category/:categoryId' element={<CategoryPage/>}/>
                            <Route path='/pdp/:productId' element={<ProductPage/>}/>
                            <Route path='/cart' element={<CartPage/>}/>
                        </Routes>
                    </div>
                </div>
            </>

        );
    }
}


let mapStateToProps = (state) => {
    return {
        isCartOpen: state.cart.isCartOpen,
        isCurrencyOpen: state.currency.isCurrencyOpen
    }
}
export default connect(mapStateToProps, {checkCart, checkCurrencyList})(App)

