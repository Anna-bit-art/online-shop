import React from "react";
import s from "./CartOverlay.module.css"
import {connect} from "react-redux";
import {decreaseQuantity, increaseQuantity} from "../../redux/cartReducer";
import {NavLink} from "react-router-dom";
import AttributesMin from "../common/AttributesMin/AttributesMin";
import {calculatePrice, findPrice} from "../../redux/funtions";


class CartOverlay extends React.Component {
    state = {
        currency: '',
        total: 0
    }

    componentDidMount() {
        if (this.props.defaultCurrency) {
            this.setState({
                currency: this.props.currentCurrency ? this.props.currentCurrency : this.props.defaultCurrency,
                total: this.props.currentCurrency ? calculatePrice(this.props.orders, this.props.currentCurrency).total
                    : calculatePrice(this.props.orders, this.props.defaultCurrency).total
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if ((this.props.currentCurrency && prevProps.currentCurrency) !== this.props.currentCurrency){
            this.setState({
                currency: this.props.currentCurrency,
                total: calculatePrice(this.props.orders, this.props.currentCurrency).total
            })
        }
        if (prevProps.numberOrders !== this.props.numberOrders) {
            this.setState({
                total: calculatePrice(this.props.orders, this.state.currency).total
            })
        }
    }

    render() {
        return (
            <div className={s.cartOverlay}>
                <p>My bag,&nbsp;
                    <span>
                            {this.props.numberOrders > 1 || this.props.numberOrders === 0
                                ? `${this.props.numberOrders} items`
                                : `${this.props.numberOrders} item`
                            }
                        </span>
                </p>

                <div className={s.orders}>
                    {this.props.orders.map((order, key) =>

                        <div key={key} className={s.cartProduct}>
                            <div className={s.productInfo}>
                                <h2>{order.name}</h2>
                                <h2>{order.brand}</h2>

                                <div className={s.price}>
                                    <p>
                                        {this.state.currency}
                                        {this.state.currency ? findPrice(order.prices, this.state.currency) : null}
                                    </p>
                                </div>

                                {order.attributes.map(attributes =>
                                    <AttributesMin key={attributes.name}
                                                   attributes={attributes} options={order.options}/>
                                )}
                            </div>

                            <div className={s.photo}>
                                <div className={s.amount}>
                                    <input type={'button'} value={'+'}
                                           onClick={() => this.props.increaseQuantity(key)}/>
                                    <input type={'button'} className={s.label} value={order.quantity}/>
                                    <input type={'button'} value={'-'}
                                           onClick={() => this.props.decreaseQuantity(key, order.id)}/>
                                </div>

                                <img alt={'orderImg'} src={order.gallery.find(e => e !== undefined)}/>
                            </div>

                        </div>
                    )}

                </div>

                <div className={s.total}>
                    <p>Total:</p>
                    {this.props.orders.length > 0
                        ? <p>{this.state.currency}{this.state.total}</p>
                        : <p>{this.state.currency}0</p>
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
        defaultCurrency: state.currency.defaultCurrency,
        currentCurrency: state.currency.currentCurrency,
        orders: state.cart.orders,
        numberOrders: state.cart.numberOrders
    }
}

export default connect(mapStateToProps, {increaseQuantity, decreaseQuantity})
(CartOverlay)



