import s from "./AttributesMin.module.css";
import React from "react";
import {compareArray, selectAttribute} from "../../../redux/funtions";


class AttributesMin extends React.Component {

    state = {
        isSelected: this.props.attributes.items[0]
    }

    componentDidMount() {
        this.setState({
            isSelected: this.props.attributes.items[selectAttribute(this.props.options, this.props.attributes)]
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (compareArray(prevProps.options, this.props.options) === false) {
            this.setState({
                isSelected: this.props.attributes.items[selectAttribute(this.props.options, this.props.attributes)]
            })
        }
    }

    render() {
        return (
            <>
                {this.props.attributes.type === 'text'
                    ? <div className={s.sizeBoxMin}>
                        <div className={s.title}>
                            <h4>{this.props.attributes.name}:</h4>
                        </div>

                        <div className={s.size}>
                            {this.props.attributes.items.map((item) =>
                                <input key={item.id} type={'button'} value={item.value} id={item.id}
                                       className={this.state.isSelected.id === item.id ? s.select : null}
                                       disabled={true}
                                />
                            )}
                        </div>
                    </div>


                    : <div className={s.colorBoxMin}>
                        <div className={s.title}>
                            <h4>{this.props.attributes.name}:</h4>
                        </div>

                        <div className={s.colors}>
                            {this.props.attributes.items.map(item =>
                                <input key={item.id} type={'button'} value={item.value} id={item.id}
                                       style={{background: item.displayValue}}
                                       className={this.state.isSelected.id === item.id ? s.selectColor : null}/>
                            )}
                        </div>

                    </div>


                }
            </>

        )
    }
}

export default AttributesMin;

