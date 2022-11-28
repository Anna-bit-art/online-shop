import React from "react";
import s from "./SliderImage.module.css"


class SliderImage extends React.Component {

    state = {
        counter: 0
    }

    prevPhoto = () => {
        let gallery = this.props.gallery.length - 1
        this.setState({
            counter: (this.state.counter > gallery || this.state.counter === 0)
                ? 0
                : this.state.counter - 1
        })
    }

    nextPhoto = () => {
        let gallery = this.props.gallery.length - 1
        this.setState({
            counter: this.state.counter > gallery || this.state.counter === gallery
                ? gallery
                : this.state.counter + 1
        })
    }


    render() {
        return (
            <>

                <img alt={'orderImg'} src={this.props.gallery[this.state.counter]}/>

                {this.props.gallery.length > 1 &&
                <div className={s.photoSwitch}>
                    <div className={s.left} onClick={this.prevPhoto}>
                        <input type={'button'}/>
                    </div>

                    <div onClick={this.nextPhoto}>
                        <input type={'button'}/>
                    </div>
                </div>
                }

            </>
        )
    }
}

export default SliderImage;
