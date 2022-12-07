import s from './App.module.css';
import {Route, Routes} from "react-router-dom";
import CategoryPage from "./Components/CategoryPage/CategoryPage";
import Header from "./Components/Header/Header";
import React from "react";
import ProductPage from "./Components/ProductPage/ProductPage";
import CartPage from "./Components/CartPage/CartPage";
import OverlayComponent from "./Components/OverlayComponent/OverlayComponent";


class App extends React.Component {
    render() {
        return (
            <>
                <OverlayComponent />
                <div className={s.wrapper}>
                    <Header />
                    <div className={s.wrapperContent}>
                        <Routes>
                            <Route path="/" element={<CategoryPage/>} />
                            <Route path='/category/:categoryId' element={<CategoryPage/>}/>
                            <Route path='/products/:productId' element={<ProductPage/>}/>
                            <Route path='/cart' element={<CartPage/>}/>
                        </Routes>
                    </div>
                </div>
            </>

        );
    }
}

export default App;
