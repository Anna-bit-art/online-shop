import s from "./Attributes.module.css";
import React from "react";


class Attributes extends React.Component {
    state = {
        isDisabled: this.props.isDisabled,
        attributes: this.props.attributes.items
    }

    componentDidMount() {
        if (this.state.isDisabled) {
            let options = this.props.options
            let selectOption = options[options.findIndex((el) => el.name === this.props.attributes.name)] //нашла нужную опцию в массиве опций
            let index = this.props.attributes.items.findIndex(item => item.id === selectOption.id) //нашла индекс такой же опции в аттрибутах

            this.setState({
                attributes: this.state.attributes.map((item, i) => (i === index ? {...item, isSelected: true} : item))
            })
        }
    }

    chooseOption = (i) => {
        this.setState({
            attributes: this.state.attributes.map((item, index) => (index === i)
                ? {...item, isSelected: true}
                : {...item, isSelected: false})
        })
        this.makeOption(this.props.attributes.items[i].id)
    }

    makeOption = (id) => {
        let option = {name: this.props.attributes.name, id: id}
        this.props.addOption(option)
    }


    render() {
        return (
            <>
                {this.props.attributes.type === 'text'
                    ? <div className={s.sizeBox}>

                        <div className={s.title}>
                            <h4>{this.props.attributes.name}:</h4>
                        </div>

                        <div className={s.size}>
                            {this.state.attributes.map((item, index) =>
                                <input key={item.id} type={'button'} value={item.value} id={item.id}
                                       onClick={() => this.chooseOption(index)}
                                       disabled={this.props.isDisabled}
                                       className={item.isSelected ? s.select : null}/>
                            )}
                        </div>

                    </div>

                    : <div className={s.colorBox}>
                        <div className={s.title}>
                            <h4>{this.props.attributes.name}:</h4>
                        </div>

                        <div className={s.colors}>
                            {this.state.attributes.map((item, index) =>
                                <input key={item.id} type={'button'} value={item.value}
                                       id={item.id} style={{background: item.displayValue}}
                                       onClick={() => this.chooseOption(index)}
                                       disabled={this.props.isDisabled}
                                       className={item.isSelected ? s.selectColor : null}
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

