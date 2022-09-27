import {GET_PRODUCT} from "../query/product";

const SET_PRODUCT = 'SET_PRODUCT';
const SET_PRICES = 'SET_PRICES';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';


let initialState = {
    isFetching: false,
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
                    prices: action.payload.prices
                }
            }
        }

        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        default: return state;
    }

}

export const setProduct = (payload) => ({type: SET_PRODUCT, payload});
export const setPrices = (currentCurrency) => ({type: SET_PRICES, currentCurrency});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});


export const requestProductId = (productID) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let payload = await GET_PRODUCT(productID);
    dispatch(setProduct(payload));
    dispatch(toggleIsFetching(false));
}

export default pdpReducer;


