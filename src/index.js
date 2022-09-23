import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import store from "./redux/redux-store";
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import {Provider} from "react-redux";

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
                    <App/>
                </Provider>
            </ApolloProvider>
        </BrowserRouter>
    </React.StrictMode>
);


