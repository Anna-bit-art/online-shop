import s from './OverlayComponent.module.css';
import React from "react";
import {connect} from "react-redux";
import {checkCart} from "../../redux/cartReducer";
import {checkCurrencyList} from "../../redux/currencyReducer";

class OverlayComponent extends React.Component {

    render() {
        return (
            <>
                {(this.props.isCurrencyOpen || this.props.isCartOpen) &&
                <div className={`${s.over} ${this.props.isCurrencyOpen && s.transparent}`}
                     onClick={this.props.isCurrencyOpen ? this.props.checkCurrencyList : this.props.checkCart}>
                </div>
                }

            </>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        isCartOpen: state.cart.isCartOpen,
        isCurrencyOpen: state.currency.isCurrencyOpen
    }
}
export default connect(mapStateToProps, {checkCart, checkCurrencyList})(OverlayComponent)

