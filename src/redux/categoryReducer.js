import {GET_CATEGORIES, GET_CATEGORY_PRODUCTS} from "../query/categories";

const SET_PRODUCTS = 'category/SET_PRODUCTS';
const SET_CURRENT_CATEGORY = 'category/SET_CURRENT_CATEGORY';
const SET_CATEGORIES = 'category/SET_CATEGORIES';
const TOGGLE_IS_FETCHING = 'category/TOGGLE_IS_FETCHING';


let initialState = {
    isFetching: false,
    categories: [],
    defaultCategory: '',
    currentCategory: '',
    products: []
}

const categoryReducer = (state = initialState, action) => {

    switch (action.type) {

        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        case SET_CATEGORIES: {
            return {
                ...state,
                categories: [...action.categories],
                defaultCategory: action.categories.find(e => e !== undefined).name
            }
        }
        case SET_CURRENT_CATEGORY: {
            return {
                ...state,
                currentCategory: action.currentCategory
            }
        }

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
                        options: []
                    }))
            }
        }

        default: return state;
    }
}

export const setCategories = (categories) => ({type: SET_CATEGORIES, categories});
export const setCurrentCategory = (currentCategory) => ({type: SET_CURRENT_CATEGORY, currentCategory});
export const setProducts = (payload) => ({type: SET_PRODUCTS, payload});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});


export const getCategories = () => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let categories = await GET_CATEGORIES();
    dispatch(setCategories(categories));
    dispatch(toggleIsFetching(false));
}

export const setCategory = (category) => (dispatch) => {
    dispatch(setCurrentCategory(category));
}

export const getCategoryProducts = (currentCategory) => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let products = await GET_CATEGORY_PRODUCTS(currentCategory)
    dispatch(setProducts(products));
    dispatch(toggleIsFetching(false));
}

export default categoryReducer;


