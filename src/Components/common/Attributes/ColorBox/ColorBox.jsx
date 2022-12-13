import s from "./ColorBox.module.css";
import React from "react";


class ColorBox extends React.Component {

    render() {
        return (
            <div className={s.colorBox}>
                <h4>{this.props.name}:</h4>

                <div className={s.colors}>
                    {this.props.data.map((item, index) =>
                        <input key={item.id} type={'button'} value={item.value}
                               id={item.id}
                               style={{background: item.displayValue}}
                               onClick={() => this.props.chooseOption(index)}
                               disabled={this.props.isDisabled}
                               className={`${item.id === 'White' ? s.white : null}
                                           ${(this.props.isSelected !== null && this.props.isSelected.id === item.id) ? s.selectColor : null}`}
                        />
                    )}
                </div>
            </div>

        )
    }
}

export default ColorBox;

