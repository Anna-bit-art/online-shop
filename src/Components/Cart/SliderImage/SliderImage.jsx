import React from "react";
import s from "./SliderImage.module.css"

export class SliderImage extends React.Component {

    state = {
        counter: 0
    }

    nextPhoto = () => {
        let images = this.props.images.length - 1
        this.setState({ counter: this.state.counter > images || this.state.counter === images
                ? 0
                : this.state.counter + 1 })
    }

    prevPhoto = () => {
        let images = this.props.images.length - 1
        this.setState({ counter: (this.state.counter > images || this.state.counter === 0 )
                ? 0
                : this.state.counter - 1 })
    }

   render() {
    return (
        <>

        <img alt={'orderImg'} src={this.props.images[this.state.counter]}/>

            { this.props.images.length > 1 &&
            <div className={s.photoSwitch}>
                <div className={s.left} onClick={this.prevPhoto}>
                    <input type={'button'} />
                </div>

                <div onClick={this.nextPhoto}>
                    <input type={'button'} />
                </div>
            </div>
            }

        </>
    )
   }
}

export default SliderImage;
