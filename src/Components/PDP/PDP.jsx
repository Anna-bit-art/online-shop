import React from "react";
import {withRouter} from "../../withRouter";
import {compose} from "redux";
import {requestProductId} from "../../redux/pdpReducer";
import {connect} from "react-redux";
import s from "./PDP.module.css";
import {addProduct} from "../../redux/cartReducer";
import {Interweave} from 'interweave';
import Attributes from "../common/Attributes/Attributes";


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
        price: 0,
        options: [],
        showFullDescription: false
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

    addOption = (option) => {
        let index = this.state.options.findIndex( item => item.name === option.name )
        if (index === -1) {
            this.setState({options: [...this.state.options, option]})
        } else {
            this.setState({options: this.state.options.map((el,i) => (i === index ? option : el)) })
        }
    }

    showFullDescriptionHandler = () => {
        this.setState({showFullDescription: !this.state.showFullDescription})
    }

    cleanOptions = () => {
        this.setState({options: [] })
    }

    render() {
        let product = this.props.product;
        return <>

            {this.props.isFetching ? <h1>LOAD</h1> :

                <div className={s.productPage}>

                    <div className={s.productImages}>
                        {product.gallery.map((img, index) =>
                            <img alt={'prevImg'} key={img} src={img} onClick={() => this.showPhoto(index)}/>
                        )}
                    </div>

                    <div className={s.productInfo}>

                        <div className={!product.inStock ? s.outOfStock : null}>
                            <img className={s.productPhoto} alt={'product img'} src={this.state.mainImage}/>
                            {!product.inStock && <span>OUT OF STOCK</span> }
                        </div>


                        <div className={s.info}>
                            <h3>{product.name}</h3>
                            <h3 className={s.brand}>{product.brand}</h3>


                            {product.attributes.map(attributes =>
                                    <Attributes key={attributes.name} attributes={attributes}
                                               addOption={this.addOption} isDisabled={false} />
                            )}



                            <div className={s.priceBlock}>
                                <h4>PRICE:</h4>
                                <p>
                                    {this.props.currentCurrency + ' '}
                                    {this.props.currentCurrency === '$' ? this.state.price : this.showPrice()}
                                </p>
                            </div>

                            <button onClick={ product.inStock ? () => this.props.addProduct(product, this.state.options, () => this.cleanOptions()) : null}>
                                ADD TO CART
                            </button>

                            {/*<div className={s.description}>*/}
                            {/*    <Interweave content={product.description.slice(0, 50)} />*/}
                            {/*    <button onClick={this.showFullDescriptionHandler}>Read {this.state.showFullDescription ? "less" : "more"}</button>*/}
                            {/*</div>*/}

                        </div>
                    </div>

                </div>


            }

            {/*<div className={s.description}>*/}
            {/*    <Interweave content={product.description} />*/}
            {/*</div>*/}


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
