import s from "./Actions.module.css"
import React from "react";
import {connect} from "react-redux";
import cart from "../../../img/cart.png";
import {checkCart, decreaseQuantity, increaseQuantity} from "../../../redux/cartReducer";
import {CartOverflow} from "../../CartOverflow/CartOverflow";
import {compose} from "redux";
import {getCurrencies, getCurrentCurrency} from "../../../redux/headerReducer";
import {requestProducts} from "../../../redux/categoryReducer";


class Actions extends React.Component {
    componentDidMount() {
        this.props.getCurrencies();
        this.props.requestProducts('all')
    }

    state = {
        isCurrencyOpen: false
    }

    openListCurrency = () => {
        this.setState({isCurrencyOpen: !this.state.isCurrencyOpen})
    }

    changePrice = (index) => {
        this.props.getCurrentCurrency(index)
        this.openListCurrency();
    }

    render() {
        return (
            <>
                <div className={s.items}>
                    <div> </div>
                    <div> </div>
                    <div>
                        <label onClick={this.openListCurrency}>{this.props.currentCurrency} ></label>
                        {this.state.isCurrencyOpen &&
                        <div className={s.currenciesList}>
                            {this.props.currencies.map((currency, index) =>
                                <input type={'button'} key={currency.label} onClick={() => this.changePrice(index)}
                                       value={currency.symbol + ' ' + currency.label}/>
                            )}

                        </div>
                        }
                    </div>

                    <div onClick={this.props.checkCart}>
                        <img alt={'cart'} src={cart}/>
                        {this.props.numberOrders > 0 && <div className={s.numberOrders}>{this.props.numberOrders}</div>}
                    </div>
                </div>



                {this.props.isCartOpen && (
                    <CartOverflow props={this.props} checkCart={this.props.checkCart}
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
        currencies: state.header.currencies,
        currentCurrency: state.header.currentCurrency,
        numberOrders: state.cart.numberOrders,
        isCartOpen: state.cart.isCartOpen,
        props: state.cart
    }
}

export default compose(
    connect(mapStateToProps, {
        checkCart,
        increaseQuantity,
        decreaseQuantity,
        getCurrencies,
        getCurrentCurrency,
        requestProducts
    }))
(Actions)


