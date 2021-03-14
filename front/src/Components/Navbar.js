import React, {Component} from 'react'

class Navbar extends Component
{
    constructor()
    {
        super()
        this.state=
        {
            logged: false
        }
    }

    logIn()
    {
        this.setState({logged: true})
        return
    }

    logOut()
    {
        this.setState({logged: false})

        return
    }

    render()
    {
        return(<div/>)
    }
}

export default Navbar