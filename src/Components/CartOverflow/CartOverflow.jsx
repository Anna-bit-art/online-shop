import React from "react";
import s from "./CartOverflow.module.css"
import {compose} from "redux";
import {connect} from "react-redux";
import {decreaseQuantity, increaseQuantity} from "../../redux/cartReducer";
import {NavLink} from "react-router-dom";
import AttributesMin from "../common/AttributesMin/AttributesMin";



export class CartOverflow extends React.Component {

    totalPrice = () => {
            let orders = this.props.props.props.orders;
            let i = orders[0].prices.findIndex((el) => el.currency.symbol === this.props.currentCurrency)
            return orders.reduce((acc, item) => acc + item.quantity * item.prices[i].amount, 0).toFixed(2)
    }

    render() {
        let cartData = this.props.props.props
        return (
                <div className={s.cartOverflow}>
                    <h1>My bag,
                        <span>{cartData.numberOrders > 1 ? cartData.numberOrders + ' items' : cartData.numberOrders + ' item'}</span>
                    </h1>

                    <div className={s.orders}>
                        {cartData.orders.map((order, key) =>
                            <div key={key} className={s.cartProduct}>

                                <div className={s.cartProductInfo}>
                                    <h3>{order.name}</h3>
                                    <h3>{order.brand}</h3>

                                    <div className={s.priceBlock}>
                                        <p>
                                            {this.props.currentCurrency + ' '}
                                            {order.prices.find((el) => el.currency.symbol === this.props.currentCurrency).amount}
                                        </p>
                                    </div>

                                    {order.attributes.map(attributes =>
                                        <AttributesMin key={attributes.name}
                                                       attributes={attributes} options={order.options}/>
                                    )}

                                </div>

                                <div className={s.cartProductPhoto}>

                                    <div className={s.selectAmount}>
                                        <input type={'button'} value={'+'}
                                               onClick={() => this.props.increaseQuantity(key)}/>
                                        <input type={'button'} className={s.label} value={order.quantity}/>
                                        <input type={'button'} value={'-'}
                                               onClick={() => this.props.decreaseQuantity(key, order.id)}/>
                                    </div>

                                    <img alt={'orderImg'} src={order.gallery[0]}/>

                                </div>

                            </div>
                        )}

                    </div>

                    <div className={s.total}>
                        <h5>Total:</h5>
                        { cartData.orders.length > 0
                            ? <h5>{this.props.currentCurrency}{this.totalPrice()}</h5>
                            : <h5>{this.props.currentCurrency}0</h5>
                        }
                    </div>

                    <div className={s.buttons}>
                        <NavLink to={'/cart'} onClick={this.props.checkCart}>
                            <button>View bag</button>
                        </NavLink>
                        <button onClick={this.props.checkCart}>Check out</button>
                    </div>

                </div>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        currentCurrency: state.header.currentCurrency,
        orders: state.cart.orders,
        numberOrders: state.cart.numberOrders
    }
}

export default compose(
    connect (mapStateToProps, { increaseQuantity, decreaseQuantity }))
(CartOverflow)



