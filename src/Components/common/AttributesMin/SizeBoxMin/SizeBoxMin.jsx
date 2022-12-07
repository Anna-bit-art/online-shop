import s from "./SizeBoxMin.module.css";
import React from "react";


class SizeBoxMin extends React.Component {

    render() {
        return (

            <div className={s.sizeBoxMin}>
                <div>
                    <h4>{this.props.name}:</h4>
                </div>

                <div className={s.size}>
                    {this.props.data.map((item) =>
                        <input key={item.id} type={'button'} value={item.value} id={item.id}
                               className={(this.props.isSelected !== null && this.props.isSelected.id === item.id)
                                               ? s.select
                                               : null}
                        />
                    )}
                </div>
            </div>


        )
    }
}

export default SizeBoxMin;

