import {GET_CURRENCIES} from "../query/currencies";


const SET_CURRENCIES = 'currency/SET_CURRENCIES';
const SET_CURRENT_CURRENCY = 'currency/SET_CURRENT_CURRENCY';

let initialState = {
    currencies: [],
    currentCurrency: ''
}

const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENCIES: {
            return {...state, currencies: [...action.currencies]}
        }

        case SET_CURRENT_CURRENCY: {
            return {
                ...state,
                currentCurrency: state.currencies.find(el => el.symbol === action.symbol).symbol
            }
        }

        default: return state;
    }

}

export const setCurrencies = (currencies) => ({type: SET_CURRENCIES, currencies});
export const setCurrentCurrency = (symbol) => ({type: SET_CURRENT_CURRENCY, symbol});


export const getCurrencies = () => async (dispatch) => {
    let currencies = await GET_CURRENCIES();
    dispatch(setCurrencies(currencies));
    let symbol = currencies.find(el => el.symbol !== undefined).symbol;
    dispatch(setCurrentCurrency(symbol));
}

export const getCurrentCurrency = (symbol) => (dispatch) => {
    dispatch(setCurrentCurrency(symbol));
}


export default currencyReducer;
