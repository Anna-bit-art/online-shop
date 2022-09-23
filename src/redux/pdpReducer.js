import {GET_PRODUCT} from "../query/product";


const SET_PRODUCT = 'SET_PRODUCT';
const SET_CURRENT_PRICES = 'SET_CURRENT_PRICES';

let initialState = {
    currentCurrency: 'USD',
    product: {
        id: null,
        name: null,
        inStock: false,
        description: null,
        category: null,
        brand: null,
        gallery: [],
        attributes: [],
        prices: [],
        currentPrices: []
    }
}

const pdpReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_PRODUCT: {
            return {
                ...state,
                product: {
                    id: action.payload.id,
                    name: action.payload.name,
                    inStock: action.payload.inStock,
                    description: action.payload.description,
                    category: action.payload.category,
                    brand: action.payload.brand,
                    gallery: action.payload.gallery,
                    attributes: action.payload.attributes,
                    prices: action.payload.prices,
                    currentPrices: [action.payload.prices[0]]
                }
            }
        }
        case SET_CURRENT_PRICES: {
            console.log(action.label)
            return {
                ...state,
                product: {
                    ...state.product,
                    currentPrices: state.product.prices.filter(
                        el => el.currency.label === action.label)
                }
            }
        }

        default: return state;
    }

}

export const setProduct = (payload) => ({ type: SET_PRODUCT, payload});
export const setCurrentPrices = (label) => ({type:SET_CURRENT_PRICES, label})



export const requestProductId  = (productID) => async (dispatch) => {
    let payload = await GET_PRODUCT(productID)
    dispatch(setProduct(payload));
}





export default pdpReducer;


