import { Component } from 'react'
import InputFields from './InputField'
import SubmitButton from './SubmitButton'

class LoginForm extends Component
{
    constructor(props)
    {
        super()

        this.state = 
        {
            username: '',
            password: ''
        }
    }

    SetValue(property, value)
    {
        value = value.trim() //No need for spaces in a username

        this.setState(
            {
                [property]: value
            }
        )
        console.log(`${property} : ${value}`)

    }

    SendValues(username, password) //I will use this to send the values to my backend
    {
        console.log(`Username : ${this.state.username} , Password : ${this.state.password}`)
    }


    render()
    {
        return(
            <div>
                <InputFields placeholder = {'username'} type = 'text' value = {this.state.username ? this.state.username : ''} onChange = { (value) => this.SetValue('username', value) }/>
                <InputFields placeholder = {'password'} type = 'password' value = {this.state.password ? this.state.password : ''} onChange = { (value) => this.SetValue('password', value) }/>
                <SubmitButton text = "Hi :) " onClick = {() => this.SendValues(this.state.username, this.state.password)}/>
            </div>
        )
    }
}

export default LoginForm