import React from "react";
import s from "./CurrencyList.module.css";

class CurrencyList extends React.Component {

    changePrice = (symbol) => {
        this.props.getCurrentCurrency(symbol);
        this.props.checkCurrencyList();
    }

    render() {
        return (
            <div className={s.currenciesList}>
                {this.props.currencies.map((currency) =>
                    <input type={'button'} key={currency.label} onClick={() => this.changePrice(currency.symbol)}
                           value={currency.symbol + ' ' + currency.label}/>
                )}
            </div>
        )
    }
}

export default CurrencyList;
