import s from "./ColorBoxMin.module.css";
import React from "react";


class ColorBoxMin extends React.Component {

    render() {
        return (
            <div className={s.colorBoxMin}>
                <div>
                    <h4>{this.props.name}:</h4>
                </div>

                <div className={s.colors}>
                    {this.props.data.map(item =>
                        <input key={item.id} type={'button'} value={item.value} id={item.id}
                               style={{background: item.displayValue}}
                               className={`${item.id === 'White' ? s.white : null}
                                                    ${(this.props.isSelected !== null && this.props.isSelected.id === item.id)
                                                       ? s.selectColor
                                                       : null}`}
                        />
                    )}
                </div>
            </div>


        )
    }
}

export default ColorBoxMin;

