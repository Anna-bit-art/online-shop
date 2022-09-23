import {GET_CURRENCIES} from "../query/categories";


const SET_CURRENCIES = 'SET_CURRENCIES';
const SET_CURRENT_CURRENCY = 'SET_CURRENT_CURRENCY';

let initialState = {
    currencies: [],
    currentCurrency: []
}

const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENCIES: {
            return { ...state, currencies: [ ...action.currencies ] }
        }
        case SET_CURRENT_CURRENCY: {
            return { ...state,
                currentCurrency: state.currencies.filter(
                    el => el.label === action.label
                )
            }
        }


        default: return state;
    }

}


export const setCurrencies =(currencies) => ({type: SET_CURRENCIES, currencies});
export const setCurrentCurrency = (label) => ({type: SET_CURRENT_CURRENCY, label});

export const getCurrencies  = () => async (dispatch) => {
    let currencies = await GET_CURRENCIES();
    dispatch(setCurrencies(currencies));
    dispatch(setCurrentCurrency(currencies[0].label))
}

export const getCurrentCurrency = (label) =>  (dispatch) => {
    dispatch(setCurrentCurrency(label));
}


export default headerReducer;
