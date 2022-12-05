import s from "./Attributes.module.css";
import React from "react";
import {compareArray, selectAttribute} from "../../../redux/funtions";


class Attributes extends React.Component {

    state = {
        isSelected: this.props.attributes.items[0]
    }

    componentDidMount() {
        if (this.props.isDisabled) {
            this.setState({
                isSelected: this.props.attributes.items[selectAttribute(this.props.options, this.props.attributes)]
            })
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (compareArray(prevProps.options, this.props.options) === false) {
            this.setState({
                isSelected: this.props.attributes.items[selectAttribute(this.props.options, this.props.attributes)],
            })
        }
    }

    chooseOption = (i) => {
        this.setState({
            isSelected: this.props.attributes.items[i]
        })
        this.makeOption(this.props.attributes.items[i].id)
    }

    makeOption = (id) => {
        let option = {name: this.props.attributes.name, id: id}
        this.props.addOption(option)
    }


    render() {
        let data = Array.from(this.props.attributes.items)
        return (
            <>
                {this.props.attributes.type === 'text'
                    ? <div className={s.sizeBox}>

                        <h4>{this.props.attributes.name}:</h4>

                        <div className={s.size}>
                            {data.map((item, index) =>
                                <input key={item.id} type={'button'} value={item.value} id={item.id}
                                       onClick={() => this.chooseOption(index)}
                                       disabled={this.props.isDisabled}
                                       className={this.state.isSelected.id === item.id ? s.select : null}
                                />
                            )}
                        </div>

                    </div>

                    : <div className={s.colorBox}>

                        <h4>{this.props.attributes.name}:</h4>

                        <div className={s.colors}>
                            {data.map((item, index) =>
                                <input key={item.id} type={'button'} value={item.value}
                                       id={item.id}
                                       style={{background: item.displayValue}}
                                       onClick={() => this.chooseOption(index)}
                                       disabled={this.props.isDisabled}
                                       className= {`${item.id === 'White' ? s.white : null}
                                                    ${this.state.isSelected.id === item.id ? s.selectColor : null}`}
                                />
                            )}
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default Attributes;

// TODO: первоначальное значение state должно быть пустым
