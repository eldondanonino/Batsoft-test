import React, {Component} from 'react'

class Logged extends Component
{
    constructor(props)
    {
        super(props)
        this.handleLog = this.handleLog.bind(this)
    }

    handleLog(e)
    {
        this.props.onStatusChange(e.target.value)
    }

    render()
    {
        const log = this.props.login
        console.log(`logged.js : ${log}`)

        return(

            <div/>
        
        )
    }


}

export default Logged