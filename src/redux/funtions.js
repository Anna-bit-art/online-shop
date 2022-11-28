import {useLocation, useNavigate, useParams} from "react-router-dom";

export const selectAttribute = (options, attributes) => {
        let selectOption = options[options.findIndex((el) => el.name === attributes.name)]
        return  attributes.items.findIndex(item => item.id === selectOption.id)
}

export const findPrice = (prices, currency) => {
    return prices[prices.findIndex((el) => el.currency.symbol === currency)].amount.toFixed(2)
}

export const calculatePrice = (orders, currency) => {
    let tax = 0.21
    if (orders.length !== 0) {
        let i = orders[0].prices.findIndex((el) => el.currency.symbol === currency)

        let sum = orders.reduce((acc, item) => acc + item.quantity * item.prices[i].amount, 0).toFixed(2)
        let taxAmount = (sum * tax).toFixed(2)

        return {total: sum, tax: taxAmount}
    } else {
        return {total: 0, tax: 0}
    }
}


export const compareArray = (a, b) => {
    if (a.length !== b.length)
        return false
    a.sort((b,c) => b.name.charCodeAt(0) - c.name.charCodeAt(0))
    b.sort((b,c) => b.name.charCodeAt(0) - c.name.charCodeAt(0))
    for (let i = 0; i < a.length; i++) {
        if (a[i].name !== b[i].name) return false
        if (a[i].id !== b[i].id) return false
    }
    return true
}


export function withRouter(Component){
    function ComponentWithRouter(props){
        let location = useLocation();
        let navigate = useNavigate;
        let params = useParams();
        return(
            <Component {...props} router={{location,navigate,params}} />
        )
    }
    return ComponentWithRouter;
}
