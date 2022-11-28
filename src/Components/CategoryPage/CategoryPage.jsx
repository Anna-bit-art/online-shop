import s from "./CategoryPage.module.css";
import a from "./../../App.module.css";
import {compose} from "redux";
import {connect} from "react-redux";
import React from "react";
import {NavLink} from "react-router-dom";
import {addProduct} from "../../redux/cartReducer";
import cart from "../../img/cart.png";
import Loader from "../common/Loader";
import {requestProducts} from "../../redux/categoryReducer";
import {findPrice, withRouter} from "../../redux/funtions";


class CategoryPage extends React.Component {

    componentDidMount() {
        this.props.requestProducts(this.props.currentCategory)
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
        if(prevProps.currentCategory !== this.props.currentCategory) {
            this.props.requestProducts(this.props.currentCategory)
        }
    }

    render() {
        return (
            <div className={s.categoryPage}>

                <h1>{this.props.currentCategory}</h1>

                { this.props.isFetching
                        ? <Loader/>

                        : <div className={s.products}>
                            {this.props.products.map(product =>
                                <div className={s.productCard} key={product.id}>

                                    <div className={!product.inStock ? a.outOfStock : null}>
                                        <NavLink to={'/pdp/' + product.id}>
                                            <img className={s.productPhoto} alt={'product'} src={product.gallery[0]}/>
                                            {!product.inStock && <span>OUT OF STOCK</span>}

                                            <div>
                                                <h3>{product.name} {product.brand}</h3>
                                                <p>
                                                    {this.props.currentCurrency + ' '}
                                                    {findPrice(product.prices, this.props.currentCurrency)}
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
                }
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        products: state.category.products,
        currentCategory: state.category.currentCategory,
        isFetching: state.category.isFetching,
        currentCurrency: state.currency.currentCurrency
    }
}

export default compose(
    connect(mapStateToProps, {addProduct, requestProducts}),
    withRouter)
(CategoryPage);

