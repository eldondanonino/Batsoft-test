import React, {Component} from 'react'

class SubmitButton extends Component
{
    render()
    {
        return(
            <div>
                <button 
                onClick = { () => this.props.onClick()}>

                    {this.props.text}
                
                </button>
            </div>
        )
    }
}

export default SubmitButton