import s from "./AttributesMin.module.css";
import React from "react";


class AttributesMin extends React.Component {

    state = {
        attributes: this.props.attributes.items
    }

    componentDidMount() {
        let options = this.props.options
        let selectOption = options[options.findIndex((el) => el.name === this.props.attributes.name)] //нашла нужную опцию в массиве опций
        let index = this.props.attributes.items.findIndex(item => item.id === selectOption.id) //нашла индекс такой же опции в аттрибутах

        this.setState({
            attributes: this.state.attributes.map((item, i) => (i === index ? {...item, isSelected: true} : item))
        })
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
                            {this.state.attributes.map((item) =>
                                <input key={item.id} type={'button'} value={item.value} id={item.id}
                                       className={item.isSelected ? s.select : null}
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
                            {this.state.attributes.map(item =>
                                <input key={item.id} type={'button'} value={item.value} id={item.id}
                                       style={{background: item.displayValue}}
                                       className={ item.isSelected ? s.selectColor : null }/>
                            )}
                        </div>

                    </div>


                }
            </>

        )
    }
}


    export
    default
    AttributesMin;

