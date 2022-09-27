let ADD_ORDER = 'ADD_ORDER';
let INCREASE_QUANTITY = 'INCREASE_QUANTITY';
let DECREASE_QUANTITY = 'DECREASE_QUANTITY';
let IS_CART_OPEN = 'IS_CART_OPEN';


let initialState = {
    isCartOpen: false,
    numberOrders: 0,
    orders: [],
    total: 0,
    tax: 0
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case IS_CART_OPEN: {
            return {
                ...state,
                isCartOpen: !state.isCartOpen
            }
        }
        case ADD_ORDER: {
            if (state.numberOrders === 0) {
                let order = {
                    id: action.payload.id,
                    quantity: 1,
                    name: action.payload.name,
                    brand: action.payload.brand,
                    gallery: action.payload.gallery,
                    attributes: action.payload.attributes,
                    prices: action.payload.prices,
                    options: action.options,
                }
                state.orders.push(order)
            } else {
                let check = false;
                state.orders.map((item, key) => {
                    if (item.id === action.payload.id) {
                        state.orders[key].quantity++;
                        check = true;
                    }
                })
                if (!check) {
                    let _order = {
                        id: action.payload.id,
                        quantity: 1,
                        name: action.payload.name,
                        brand: action.payload.brand,
                        gallery: action.payload.gallery,
                        attributes: action.payload.attributes,
                        prices: action.payload.prices,
                        options: action.options,
                    }
                    state.orders.push(_order);
                }
            }

            return {
                ...state,
                numberOrders: state.numberOrders + 1
            }
        }

        case INCREASE_QUANTITY: {
            state.numberOrders++
            state.orders[action.payload].quantity++
            return {
                ...state
            }
        }

        case DECREASE_QUANTITY: {
            let quantity = state.orders[action.payload].quantity;
            if (quantity > 1) {
                state.numberOrders--
                state.orders[action.payload].quantity--
            } else {
                return {
                    ...state,
                    numberOrders: state.numberOrders - quantity,
                    orders: state.orders.filter(order => {
                        return order.id !== state.orders[action.payload].id
                    })
                }
            }
            return {
                ...state
            }
        }

        default:
            return state;

    }
}

export const checkCart = () => ({type: IS_CART_OPEN})
export const addProduct = (payload, options) => ({type: ADD_ORDER, payload, options})
export const increaseQuantity = (payload) => ({type: INCREASE_QUANTITY, payload})
export const decreaseQuantity = (payload) => ({type: DECREASE_QUANTITY, payload})


export default cartReducer;
