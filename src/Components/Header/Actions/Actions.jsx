import s from "./Actions.module.css"
import React from "react";
import {connect} from "react-redux";
import cart from "../../../img/cart.png";
import vector from "../../../img/Vector.png"
import {checkCart, decreaseQuantity, increaseQuantity} from "../../../redux/cartReducer";
import {compose} from "redux";
import {checkCurrencyList, getCurrentCurrency} from "../../../redux/currencyReducer";
import CartOverlay from "../../CartOverlay/CartOverlay";
import CurrencyList from "./CurrencyList/CurrencyList";


class Actions extends React.Component {
    state = {
        currentCurrency: ''
    }

    componentDidMount() {
        this.setState({
            currentCurrency: this.props.currencies.find(el => el.symbol !== undefined).symbol
        })
    }

    render() {
        return (
            <>
                <div className={s.actions}>

                    <div className={s.currencyLabel}>
                        <button className={s.actionButton} onClick={this.props.checkCurrencyList} disabled={this.props.isCartOpen}>
                            <label>{this.props.currentCurrency}</label>
                            <img alt={'cart'} src={vector} className={`${s.vector} ${this.props.isCurrencyOpen && s.vectorRotate}`}/>
                        </button>



                        {this.props.isCurrencyOpen &&
                            <CurrencyList currencies={this.props.currencies}
                                          changePrice={this.changePrice}
                                          getCurrentCurrency={this.props.getCurrentCurrency}
                                          checkCurrencyList={this.props.checkCurrencyList}
                            />
                        }
                    </div>


                    <button className={s.actionButton} onClick={this.props.checkCart} disabled={this.props.isCurrencyOpen}>
                        <img alt={'cart'} src={cart} className={s.cart}/>
                        {this.props.numberOrders > 0 && <div className={s.numberOrders}>{this.props.numberOrders}</div>}
                    </button>
                </div>



                {this.props.isCartOpen && (
                    <CartOverlay orders={this.props.orders} checkCart={this.props.checkCart}
                                 numberOrders={this.props.numberOrders}
                                 currentCurrency={this.props.currentCurrency}
                                 increaseQuantity={this.props.increaseQuantity}
                                 decreaseQuantity={this.props.decreaseQuantity}
                    />
                )}
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        currencies: state.currency.currencies,
        currentCurrency: state.currency.currentCurrency,
        isCurrencyOpen: state.currency.isCurrencyOpen,
        isCartOpen: state.cart.isCartOpen,
        numberOrders: state.cart.numberOrders,
        orders: state.cart.orders
    }
}

export default compose(
    connect(mapStateToProps, {
        checkCart,
        increaseQuantity,
        decreaseQuantity,
        getCurrentCurrency,
        checkCurrencyList
    }))
(Actions)


