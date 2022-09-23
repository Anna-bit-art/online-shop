import React from "react";
import s from "./CartOverflow.module.css"
import {compose} from "redux";
import {connect} from "react-redux";
import SizeBoxMin from "../common/SizeBoxMin/SizeBoxMin";
import ColorBoxMin from "../common/ColorBoxMin/ColorBoxMin";
import {decreaseQuantity, increaseQuantity} from "../../redux/cartReducer";
import {NavLink} from "react-router-dom";
import {withRouter} from "../../withRouter";


export class CartOverflow extends React.Component {


    render() {
        let cartData = this.props.props.props
        return (
            <div className={s.cartOverflow}>
                <h1>My bag, <span>{cartData.numberOrders > 1 ? cartData.numberOrders + ' items' : cartData.numberOrders + ' item'}</span></h1>

                <div className={s.orders}>
                    { cartData.orders.map( (order, key) =>
                            <div key={key} className={s.cartProduct}>

                                <div className={s.cartProductInfo}>
                                    <h3>{order.name}</h3>
                                    <h3>{order.brand}</h3>


                                    <div className={s.priceBlock}>
                                        {/*<p>*/}
                                        {/*    {order.currentPrices[0].currency.symbol}*/}
                                        {/*    {order.currentPrices[0].amount}*/}
                                        {/*</p>*/}
                                    </div>

                                    { order.attributes.map(attributes =>
                                        attributes.type === 'text'
                                            ? <SizeBoxMin key={attributes.name} name={attributes.name} items={attributes.items}/>
                                            : null
                                    ) }

                                    { order.attributes.map(attributes =>
                                        attributes.type === 'swatch'
                                            ? <ColorBoxMin key={attributes.name} name={attributes.name} items={attributes.items} />
                                            : null
                                    )}

                                </div>

                                <div className={s.cartProductPhoto}>

                                    <div className={s.selectAmount}>
                                        <input type={'button'} value={'+'} onClick={() => this.props.increaseQuantity(key)}/>
                                        <input type={'button'} className={s.label} value={order.quantity}/>
                                        <input type={'button'} value={'-'} onClick={() => this.props.decreaseQuantity(key, order.id)}/>
                                    </div>

                                    <img alt={'orderImg'} src={order.gallery[0]}/>

                                </div>


                            </div>
                        )}

                </div>

                <div className={s.total}>
                    <h5>Total:</h5>
                    <h5>{cartData.total}</h5>
                </div>

                <div className={s.buttons}>
                    <NavLink to={'/cart'}><button>View bag</button></NavLink>
                    <button onClick={this.props.checkCart}>Check out</button>
                </div>

            </div>
        )
    }
}


export default compose(
    connect (null, {increaseQuantity, decreaseQuantity}),
    withRouter)
    (CartOverflow);
