import s from "./ColorBox.module.css";
import React from "react";


class ColorBox extends React.Component {

    addAttribute = (value) => {
        let item = { [this.props.name] : value }
        this.props.updateProductOptions(item)
    }

    render() {
        console.log(this.props)
        return (
            <div className={s.colorBox}>
                <div className={s.title}>
                    <h4>{this.props.name}:</h4>
                </div>

                <div className={s.colors}>
                    {this.props.items.map(item =>
                        <input type={'button'} value={item.value} id={item.id} key={item.id} style={{background: item.displayValue}}
                               onClick={() => this.addAttribute(item.value)} />
                    )}
                </div>

            </div>
        )
    }
}

export default ColorBox;

