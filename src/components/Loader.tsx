import React from 'react'
import {SpinnerDotted} from "spinners-react"
const style = require("./style.module.css")

const Loader = () => {
    return (
        <div className = {style.loader} >
            <SpinnerDotted size={50} thickness={150} speed={180} color="rgba(172, 57, 171, 0.69)" />
        </div>
    )
}

export default Loader
