import s from "./Actions.module.css"
import React from "react";
import {connect} from "react-redux";
import cart from "../../../img/cart.png";
import {checkCart, decreaseQuantity, increaseQuantity} from "../../../redux/cartReducer";
import {CartOverflow} from "../../CartOverflow/CartOverflow";
import {compose} from "redux";
import {getCurrencies, getCurrentCurrency} from "../../../redux/headerReducer";


class Actions extends React.Component {
    componentDidMount() {
        this.props.getCurrencies();
    }

    state = {
        isCurrencyOpen : true
    }

    render() {

        return (
            <>
                <div className={s.items}>
                    <div> </div>
                    <div> </div>

                    <div>
                        <label>{this.props.currentCurrency.symbol}</label>
                        <div className={s.selectCurrency}>
                        </div>
                    </div>

                    <div onClick={this.props.checkCart} >
                      <img alt={'cart'} src={cart}/>
                        { this.props.numberOrders > 0 && <div className={s.numberOrders}>{this.props.numberOrders}</div> }
                    </div>
                </div>

                <div className={s.currenciesList}>

                        {this.state.isCurrencyOpen &&
                        this.props.currencies.map ((currency) =>
                            <input type={'button'} key={currency.label} onClick={() => this.props.getCurrentCurrency(currency.label)}
                                value={currency.symbol + ' ' + currency.label} />
                        )}

                </div>


                {this.props.isCartOpen && (
                    <CartOverflow props={this.props} checkCart={this.props.checkCart}
                                  increaseQuantity={this.props.increaseQuantity}
                                  decreaseQuantity={this.props.decreaseQuantity}/>
                )}
            </>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        currencies: state.header.currencies,
        currentCurrency: state.header.currentCurrency,
        numberOrders: state.cart.numberOrders,
        isCartOpen: state.cart.isCartOpen,
        props: state.cart
    }
}

export default compose(
    connect(mapStateToProps, {checkCart, increaseQuantity, decreaseQuantity, getCurrencies, getCurrentCurrency}))
 (Actions)


