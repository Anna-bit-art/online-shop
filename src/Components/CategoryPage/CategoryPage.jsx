import s from "./CategoryPage.module.css";
import {compose} from "redux";
import {connect} from "react-redux";
import React from "react";
import {NavLink} from "react-router-dom";
import {addProduct} from "../../redux/cartReducer";
import {withRouter} from "../../withRouter";
import cart from "../../img/cart.png";



class CategoryPage extends React.Component {

    render() {
        return (
            <div className={s.categoryPage}>

                <h2>{this.props.currentCategory}</h2>

                <div className={s.products}>
                    {this.props.products.map(product =>
                        <div className={s.productCard} key={product.id} >

                            <div className={!product.inStock ? s.outOfStock : null}>
                                <NavLink to={'/pdp/' + product.id}>
                                <img className={s.productPhoto} alt={'product'} src={product.gallery[0]}/>
                                    {!product.inStock && <span>OUT OF STOCK</span> }

                                <div>
                                    <h5>{product.name} {product.brand}</h5>
                                    <p>
                                        {this.props.currentCurrency + ' '}
                                        {product.prices.find((el) => el.currency.symbol === this.props.currentCurrency).amount}
                                    </p>
                                </div>
                                </NavLink>

                                {product.inStock &&
                                    <div className={s.emptyCart}
                                         onClick={() => this.props.addProduct(product, product.options)}>
                                        <img alt={'cart'} src={cart}/>
                                    </div>
                                }

                            </div>
                        </div>
                        )}
                </div>

            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return{
        products: state.category.products,
        currentCategory: state.category.currentCategory,
        currentCurrency: state.header.currentCurrency
    }
}

export default compose(
    connect (mapStateToProps, {addProduct}),
    withRouter)
(CategoryPage);

