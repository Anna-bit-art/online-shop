import {applyMiddleware, combineReducers, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import categoryReducer from "./categoryReducer";
import cartReducer from "./cartReducer";
import pdpReducer from "./pdpReducer";
import headerReducer from "./headerReducer";


const {createStore} = require("redux");
let reducers = combineReducers({
    header: headerReducer,
    category: categoryReducer,
    cart: cartReducer,
    pdp: pdpReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

export default store;
