import s from "./CategoryPage.module.css";
import {compose} from "redux";
import {connect} from "react-redux";
import React from "react";
import {NavLink} from "react-router-dom";
import {addProduct} from "../../redux/cartReducer";
import {withRouter} from "../../withRouter";
import {requestProducts, setCurrencyProducts} from "../../redux/categoryReducer";
import cart from "../../img/cart.png";



class CategoryPage extends React.Component {

    componentDidMount() {
        this.props.requestProducts('all')
        let currency = this.props.currentCurrency
        this.props.setCurrencyProducts(currency)
    }

    render() {
        console.log(this.props.products)
        return (
            <div className={s.categoryPage}>

                <h2>{this.props.currentCategory}</h2>

                <div className={s.products}>
                    {this.props.products.map(product =>
                        <div className={s.productCard} key={product.id} >

                                { !product.inStock
                                    ?   <div className={s.outOfStock}>
                                            <img className={s.productPhoto} alt={'product'} src={product.gallery[0]}/>
                                            <span>OUT OF STOCK</span>

                                            <div>
                                                <h5>{product.name}</h5>
                                                {/*<p>*/}
                                                {/*    {product.currentPrices[0].currency.symbol}*/}
                                                {/*    {product.currentPrices[0].amount}*/}
                                                {/*</p>*/}
                                            </div>
                                        </div>



                                    :   <div className={s.inStock}>
                                            <NavLink to={'/pdp/' + product.id}>
                                                <img className={s.productPhoto} alt={'product'} src={product.gallery[0]}/>
                                                <div>
                                                    <h5>{product.name} {product.brand}</h5>
                                                    {/*<p>*/}
                                                    {/*    {product.currentPrices[0].currency.symbol}*/}
                                                    {/*    {product.currentPrices[0].amount}*/}
                                                    {/*</p>*/}
                                                </div>
                                            </NavLink>
                                            <div className={s.emptyCart}
                                                 onClick={() => this.props.addProduct(product)}>
                                                <img alt={'cart'} src={cart}/>
                                            </div>
                                        </div>

                                }
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
    connect (mapStateToProps, {requestProducts,setCurrencyProducts, addProduct}),
    withRouter)
(CategoryPage);

