import React from "react";
import s from "./Cart.module.css"
import SizeBox from "../common/SizeBox/SizeBox";
import ColorBox from "../common/ColorBox/ColorBox";
import {compose} from "redux";
import {connect} from "react-redux";
import {decreaseQuantity, increaseQuantity} from "../../redux/cartReducer";


export class Cart extends React.Component {

    render() {
        return (
            <div className={s.cartPage}>
                <h1>CART</h1>

                { this.props.orders.map( (order, key) =>
                    <div key={key} className={s.cartProduct}>

                        <div className={s.cartProductInfo}>
                            <h3>{order.name}</h3>
                            <h3 className={s.brand}>{order.brand}</h3>


                            <div className={s.priceBlock}>
                                {/*<p>*/}
                                {/*    {order.currentPrices[0].currency.symbol}*/}
                                {/*    {order.currentPrices[0].amount}*/}
                                {/*</p>*/}
                            </div>

                            { order.attributes.map(attributes =>
                                attributes.type === 'text'
                                    ? <SizeBox key={attributes.name} name={attributes.name} items={attributes.items}/>
                                    : null
                            ) }

                            { order.attributes.map(attributes =>
                                attributes.type === 'swatch'
                                    ? <ColorBox key={attributes.name} name={attributes.name} items={attributes.items} />
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

                <h5>Tax 21%:{this.props.tax}</h5>
                <h5>Quantity:{this.props.numberOrders}</h5>
                <h5>Total:{this.props.total}</h5>
                <button>order</button>

            </div>
        )
    }
}


let mapStateToProps = (state) => {
    return{
        orders: state.cart.orders,
        numberOrders: state.cart.numberOrders,
        total: state.cart.total,
        tax: state.cart.tax,
    }
}


export default compose(
    connect (mapStateToProps, {increaseQuantity, decreaseQuantity}))
(Cart);
