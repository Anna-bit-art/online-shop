import s from "./SizeBoxMin.module.css";
import React from "react";


class SizeBoxMin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            attributes: this.props.items
        }
    }

    onUpdateItem = (i) => {
        this.setState( (state) => {
            return { attributes: state.attributes.map((item, index) => (index === i) ? {...item, choice: true} : {...item, choice: false}) }
        })

        console.log(this.state.attributes)
        this.addOption(this.state.attributes)
    };

    addOption = (attributes) => {
        // let item = { [this.props.name] : value }
        this.props.updateProductOptions(attributes)
    }



    render() {

        return (
            <div className={s.sizeBoxMin}>
                <div className={s.title}>
                    <h4>{this.props.name}:</h4>
                </div>
                <div className={s.size}>
                    {this.state.attributes.map((item, index) =>
                        <input key={item.id} type={'button'} value={item.value} id={item.id}
                               onClick={() => this.onUpdateItem(index)}
                               className={ item.choice ? s.select : null }
                        />
                    )}
                </div>

            </div>


        )
    }
}

export default SizeBoxMin;

