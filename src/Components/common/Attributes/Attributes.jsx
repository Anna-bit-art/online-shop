import React from "react";
import {compareArray, selectAttribute} from "../../../redux/funtions";
import SizeBox from "./SizeBox/SizeBox";
import ColorBox from "./ColorBox/ColorBox";


class Attributes extends React.Component {
    state = {
        isSelected: null
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
        this.setState({ isSelected: this.props.attributes.items[i] })
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

                    ? <SizeBox data={data} chooseOption={this.chooseOption} name={this.props.attributes.name}
                               isSelected={this.state.isSelected} isDisabled={this.props.isDisabled} />

                    : <ColorBox  data={data} chooseOption={this.chooseOption} name={this.props.attributes.name}
                                 isSelected={this.state.isSelected} isDisabled={this.props.isDisabled} />
                }
            </>
        )
    }
}

export default Attributes;

