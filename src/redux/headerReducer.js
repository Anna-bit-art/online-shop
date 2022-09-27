import {GET_CURRENCIES} from "../query/currencies";


const SET_CURRENCIES = 'SET_CURRENCIES';
const SET_CURRENT_CURRENCY = 'SET_CURRENT_CURRENCY';

let initialState = {
    currencies: [],
    currentCurrency: '$'
}

const headerReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CURRENCIES: {
            return {...state, currencies: [...action.currencies]}
        }

        case SET_CURRENT_CURRENCY: {
            return {
                ...state,
                currentCurrency: state.currencies[action.index].symbol === '$'
                    ? '$'
                    : state.currencies[action.index].symbol
            }
        }

        default: return state;
    }

}


export const setCurrencies = (currencies) => ({type: SET_CURRENCIES, currencies});
export const setCurrentCurrency = (index) => ({type: SET_CURRENT_CURRENCY, index});

export const getCurrencies = () => async (dispatch) => {
    let currencies = await GET_CURRENCIES();
    dispatch(setCurrencies(currencies));
}

export const getCurrentCurrency = (index) => (dispatch) => {
    dispatch(setCurrentCurrency(index));
}


export default headerReducer;
