import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import store, {persistor} from "./redux/redux-store";
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";

export const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        <App/>
                    </PersistGate>
                </Provider>
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>
);


