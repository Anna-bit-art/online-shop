
import {GET_CATEGORIES, GET_CATEGORY_PRODUCTS} from "../query/categories";


const SET_PRODUCTS = 'SET_PRODUCTS';

const SET_CURRENT_CATEGORY = 'SET_CURRENT_CATEGORY';
const SET_CATEGORIES = 'SET_ALL_PRODUCTS';
const SET_CURRENCY_PRODUCTS = 'SET_CURRENCY_PRODUCTS';


let initialState = {
    categories: [],
    currentCategory: '',
    products: [],
    currencyProducts: []
}

const categoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case SET_PRODUCTS: {
            return {
                ...state,
                products: action.payload.map(product => (
                {
                    attributes: product.attributes,
                    brand: product.brand,
                    gallery: product.gallery,
                    id: product.id,
                    inStock: product.inStock,
                    name: product.name,
                    prices: product.prices,
                    // currentPrices: [product.prices[0]]
                }))

            }
        }

        case SET_CURRENCY_PRODUCTS: {
            return {
                ...state,
                currencyProducts: action.currency
            }
        }
        // case SET_CURRENCY_PRODUCTS: {
        //     return {...state,
        //         products: state.products.map(product => (
        //             {
        //                 ...product,
        //                 currentPrices: product.prices.filter(
        //                     el => el.currency.label === action.label)
        //             }
        //         ))
        //     }
        //
        // }

        case SET_CATEGORIES: {
            return { ...state, categories: [ ...action.categories ] }
        }
        case SET_CURRENT_CATEGORY: {
            return { ...state, currentCategory: action.currentCategory }
        }

        default: return state;
    }
}

export const setCategories = (categories) => ({type: SET_CATEGORIES, categories});
export const setCurrentCategory = (currentCategory) => ({type: SET_CURRENT_CATEGORY, currentCategory});

export const setProducts = (payload) => ({type: SET_PRODUCTS, payload});
export const setCurrencyProducts = (currency) => ({type: SET_CURRENCY_PRODUCTS, currency})


export const getCategories  = () => async (dispatch) => {
    let categories = await GET_CATEGORIES();
    dispatch(setCategories(categories));
}

export const requestProducts  = (currentCategory) => async (dispatch) => {
    dispatch(setCurrentCategory(currentCategory));
    let products = await GET_CATEGORY_PRODUCTS(currentCategory)
    dispatch(setProducts(products));
}




export default categoryReducer;

