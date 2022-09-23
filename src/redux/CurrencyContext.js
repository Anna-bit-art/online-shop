import React from "react";

export const CurrencyContext = React.createContext( )

class CurrencyProvider extends React.Component {
    state = {
        currencies: [{currency: 'USD', symbol: '%'}],
        currentCurrency: ['USD']
    }

    render() {
        return (
            <CurrencyContext.Provider
            value={{
                currencies: this.state.currencies,
                currentCurrency: this.state.currentCurrency,
                getCurrentCurrency: selectLabel => {
                    const currency = this.state.currencies.filter(
                        el => el.label === selectLabel)
                    this.setState({currentCurrency: currency})
                }
            }}
            >

            </CurrencyContext.Provider>
        )
    }
}

export default CurrencyProvider;












