import {applyMiddleware, combineReducers, compose} from "redux";
import thunkMiddleware from "redux-thunk";
import categoryReducer from "./categoryReducer";
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";
import currencyReducer from "./currencyReducer";

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const {createStore} = require("redux");

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['category', 'currency', 'cart'],
}

let rootReducer = combineReducers({
    currency: currencyReducer,
    category: categoryReducer,
    cart: cartReducer,
    product: productReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore( persistedReducer, composeEnhancers(applyMiddleware(thunkMiddleware)));
export const persistor = persistStore(store);

export default store;



