import {applyMiddleware, combineReducers, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import categoryReducer from "./categoryReducer";
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";
import currencyReducer from "./currencyReducer";


const {createStore} = require("redux");

let reducers = combineReducers({
    currency: currencyReducer,
    category: categoryReducer,
    cart: cartReducer,
    product: productReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
