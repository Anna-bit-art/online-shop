import React from "react";
import {compareArray, selectAttribute} from "../../../redux/funtions";
import ColorBoxMin from "./ColorBoxMin/ColorBoxMin";
import SizeBoxMin from "./SizeBoxMin/SizeBoxMin";


class AttributesMin extends React.Component {
    state = {
        isSelected: null
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

                    ? <SizeBoxMin name={this.props.attributes.name} data={this.props.attributes.items}
                                  isSelected={this.state.isSelected}/>

                    : <ColorBoxMin name={this.props.attributes.name} data={this.props.attributes.items}
                                   isSelected={this.state.isSelected}/>
                }
            </>
        )
    }
}

export default AttributesMin;

