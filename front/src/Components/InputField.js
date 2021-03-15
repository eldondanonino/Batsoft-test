import React, {Component} from 'react'
import "../style.css"

class InputField extends Component
{
    render()
    {
        return(
            <div>
                <input className = "inputfield"
                type = {this.props.type}
                placeholder = {this.props.placeholder}
                value = {this.props.value}
                onChange = { (e) => this.props.onChange(e.target.value)}/> 
            </div>
        )
    }
}

export default InputField