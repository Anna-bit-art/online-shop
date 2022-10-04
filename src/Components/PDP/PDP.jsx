import React from "react";
import {withRouter} from "../../withRouter";
import {compose} from "redux";
import {requestProductId} from "../../redux/pdpReducer";
import {connect} from "react-redux";
import s from "./PDP.module.css";
import SizeBox from "../common/SizeBox/SizeBox";
import ColorBox from "../common/ColorBox/ColorBox";
import {addProduct} from "../../redux/cartReducer";
import {Interweave} from 'interweave';


class PDP extends React.Component {

    componentDidMount() {
        let productId = this.props.router.params.productId;
        this.props.requestProductId(productId)
    }

    static getDerivedStateFromProps(props, state) {
        return state.props === props ? null : {currency: props.currentCurrency}
    }

    showPrice = () => {
        let prices = this.props.product.prices
        return prices[prices.findIndex((el) => el.currency.symbol === this.props.currentCurrency)].amount
    }

    state = {
        mainImage: this.props.product.gallery[0],
        price: 0
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.product.gallery[0] !== this.props.product.gallery[0]) {
            this.setState({
                mainImage: this.props.product.gallery[0],
                price: this.props.product.prices[0].amount
            })
        }
    }

    showPhoto = (i) => {
        this.setState({mainImage: this.props.product.gallery[i]})
    }


    // options = []
    // updateProductOptions = (option) => {
    //     console.log(option)
    //     let index = this.options.findIndex(item => Object.keys(item)[0] === Object.keys(option)[0]);
    //     if (index === -1) {
    //         this.options.push(option)
    //     } else {
    //         this.options[index] = option
    //     }
    //
    // }


    render() {
        let product = this.props.product;
        console.log(product)

        return <>
            {this.props.isFetching ? <h1>LOAD</h1> :

                <div className={s.productPage}>

                    <div className={s.productImages}>
                        {product.gallery.map((img, index) =>
                            <img alt={'prevImg'} key={img} src={img} onClick={() => this.showPhoto(index)}/>
                        )}
                    </div>

                    <div className={s.productInfo}>

                        <div>
                            <img className={s.productPhoto} alt={'product img'} src={this.state.mainImage}/>
                        </div>


                        <div className={s.info}>
                            <h3>{product.name}</h3>
                            <h3 className={s.brand}>{product.brand}</h3>


                            {product.attributes.map(attributes =>
                                attributes.type === 'text'
                                    ? <SizeBox key={attributes.name} productId={this.props.product.id}
                                               name={attributes.name} items={attributes.items}
                                               updateProductOptions={this.updateProductOptions}/>
                                    : null
                            )}

                            {this.props.product.attributes.map(attributes =>
                                attributes.type === 'swatch'
                                    ? <ColorBox key={attributes.name} productId={this.props.product.id}
                                                name={attributes.name} items={attributes.items}
                                                updateProductOptions={this.updateProductOptions}/>
                                    : null
                            )}


                            <div className={s.priceBlock}>
                                <h4>PRICE:</h4>
                                <p>
                                    {this.props.currentCurrency + ' '}

                                    {this.props.currentCurrency === '$' ? this.state.price : this.showPrice()}
                                </p>
                            </div>

                            <button onClick={() => this.props.addProduct(product, this.options)}>ADD TO
                                CART
                            </button>

                            <div className={s.description}>
                                <Interweave content={product.description}/>
                            </div>

                        </div>
                    </div>

                </div>
            }
        </>
    }
}


let mapStateToProps = (state) => {
    return {
        product: state.pdp.product,
        currentCurrency: state.header.currentCurrency,
        isFetching: state.pdp.isFetching
    }
}

export default compose(
    connect(mapStateToProps, {requestProductId, addProduct}),
    withRouter
)(PDP);
