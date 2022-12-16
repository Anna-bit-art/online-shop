import {GET_CURRENCIES} from "../query/currencies";

const SET_CURRENCIES = 'currency/SET_CURRENCIES';
const SET_CURRENT_CURRENCY = 'currency/SET_CURRENT_CURRENCY';
const IS_CURRENCY_OPEN = 'currency/IS_CURRENCY_OPEN';
const TOGGLE_IS_FETCHING = 'currency/TOGGLE_IS_FETCHING';


let initialState = {
    isFetching: false,
    currencies: [],
    currentCurrency: '',
    defaultCurrency: '',
    isCurrencyOpen: false
}

const currencyReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENCIES: {
            return {...state,
                currencies: [...action.currencies],
                defaultCurrency: action.currencies.find(el => el !== undefined).symbol
            }
        }

        case SET_CURRENT_CURRENCY: {
            return {
                ...state,
                currentCurrency: state.currencies.find(el => el.symbol === action.symbol).symbol
            }
        }

        case IS_CURRENCY_OPEN: {
            return {
                ...state,
                isCurrencyOpen: !state.isCurrencyOpen
            }
        }

        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }

        default: return state;
    }

}

export const setCurrencies = (currencies) => ({type: SET_CURRENCIES, currencies});
export const setCurrentCurrency = (symbol) => ({type: SET_CURRENT_CURRENCY, symbol});
export const checkCurrencyList = () => ({type: IS_CURRENCY_OPEN});
export const toggleIsFetching = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});



export const getCurrencies = () => async (dispatch) => {
    dispatch(toggleIsFetching(true));
    let currencies = await GET_CURRENCIES();
    dispatch(setCurrencies(currencies));
    dispatch(toggleIsFetching(false));
}

export const getCurrentCurrency = (symbol) => (dispatch) => {
    dispatch(setCurrentCurrency(symbol));
}


export default currencyReducer;
