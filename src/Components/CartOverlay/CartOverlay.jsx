import React from "react";
import s from "./CartOverlay.module.css"
import {connect} from "react-redux";
import {decreaseQuantity, increaseQuantity} from "../../redux/cartReducer";
import {NavLink} from "react-router-dom";
import AttributesMin from "../common/AttributesMin/AttributesMin";
import {calculatePrice, findPrice} from "../../redux/funtions";


class CartOverlay extends React.Component {
    state = {
        total: 0
    }

    componentDidMount() {
        if (this.props.orders.length !== 0) {
            this.setState({
                total: calculatePrice(this.props.orders, this.props.currentCurrency).total
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.currentCurrency !== this.props.currentCurrency || prevProps.numberOrders !== this.props.numberOrders) {
            this.setState({
                total: calculatePrice(this.props.orders, this.props.currentCurrency).total
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
                                        {this.props.currentCurrency}
                                        {findPrice(order.prices, this.props.currentCurrency)}
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
                        ? <p>{this.props.currentCurrency}{this.state.total}</p>
                        : <p>{this.props.currentCurrency}0</p>
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
        currentCurrency: state.currency.currentCurrency,
        orders: state.cart.orders,
        numberOrders: state.cart.numberOrders
    }
}

export default connect(mapStateToProps, {increaseQuantity, decreaseQuantity})
(CartOverlay)



