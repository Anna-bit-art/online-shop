import s from "./SizeBox.module.css";
import React from "react";


class SizeBox extends React.Component {

    render() {
        return (
            <div className={s.sizeBox}>
                <h4>{this.props.name}:</h4>

                <div className={s.size}>
                    {this.props.data.map((item, index) =>
                        <input key={item.id} type={'button'} value={item.value} id={item.id}
                               onClick={() => this.props.chooseOption(index)}
                               disabled={this.props.isDisabled}
                               className={(this.props.isSelected !== null && this.props.isSelected.id === item.id) ? s.select : null}
                        />
                    )}
                </div>

            </div>
        )
    }
}

export default SizeBox;
