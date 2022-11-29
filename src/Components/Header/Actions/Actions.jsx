import s from "./Actions.module.css"
import React from "react";
import {connect} from "react-redux";
import cart from "../../../img/cart.png";
import vector from "../../../img/Vector.png"
import {checkCart, decreaseQuantity, increaseQuantity} from "../../../redux/cartReducer";
import {compose} from "redux";
import {getCurrentCurrency} from "../../../redux/currencyReducer";
import CartOverlay from "../../CartOverlay/CartOverlay";


class Actions extends React.Component {
    state = {
        isCurrencyOpen: false
    }

    openListCurrency = () => {
        this.setState({isCurrencyOpen: !this.state.isCurrencyOpen})
    }

    changePrice = (symbol) => {
        this.props.getCurrentCurrency(symbol)
        this.openListCurrency();
    }

    render() {
        return (
            <>
                <div className={s.actions}>
                    <div className={s.currencyLabel}>
                        <div onClick={this.openListCurrency}>
                            <label>{this.props.currentCurrency}</label>
                            <img alt={'cart'} src={vector} className={`${s.vector} ${this.state.isCurrencyOpen && s.vectorRotate}`}/>
                        </div>

                        {this.state.isCurrencyOpen &&
                        <div className={s.currenciesList}>
                            {this.props.currencies.map((currency) =>
                                <input type={'button'} key={currency.label} onClick={() => this.changePrice(currency.symbol)}
                                       value={currency.symbol + ' ' + currency.label}/>
                            )}
                        </div>
                        }
                    </div>

                    <div onClick={this.props.checkCart}>
                        <img alt={'cart'} src={cart} className={s.cart}/>
                        {this.props.numberOrders > 0 && <div className={s.numberOrders}>{this.props.numberOrders}</div>}
                    </div>
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
        numberOrders: state.cart.numberOrders,
        isCartOpen: state.cart.isCartOpen,
        orders: state.cart.orders
    }
}

export default compose(
    connect(mapStateToProps, {
        checkCart,
        increaseQuantity,
        decreaseQuantity,
        getCurrentCurrency
    }))
(Actions)


