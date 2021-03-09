import { Component } from 'react'
import InputFields from './InputField'
import SubmitButton from './SubmitButton'
import UserStore from '../Stores/UserStore'


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

    ResetValue()
    {
        this.setState(
            {
            username: '',
            password: '',
            }
        )
    }

    SendValues(username, password) //I will use this to send the values to my backend
    {
        UserStore.wrong_pw = false
        UserStore.wrong_un = false

        if(username === '' || password === '') //I will change that to if the api sent a negative answer
            {
                if(username === '') 
                {
                    console.log("Invalid request : wrong un") 
                    UserStore.state.wrong_un = true
                }
                
                if(password === '')
                {
                    console.log("Invalid request : wrong pw") 
                    UserStore.state.wrong_pw = true
                }
                this.ResetValue()
                return
            }
        console.log(`Username : ${this.state.username} , Password : ${this.state.password}`)
        UserStore.LogIn()
        console.log(UserStore.state.logged)
    }


    render()
    {
        return(
            <div>
                <InputFields placeholder = {'username'} type = 'text' value = {this.state.username ? this.state.username : ''} onChange = { (value) => this.SetValue('username', value) }/> 
                {UserStore.wrong_un ? (<b style = {{color : ' red '}}>Wrong/Inexistant Username</b>) : ''}
                <InputFields placeholder = {'password'} type = 'password' value = {this.state.password ? this.state.password : ''} onChange = { (value) => this.SetValue('password', value) }/> 
                {UserStore.wrong_pw ? (<b style = {{color : ' red '}}>Wrong/Inexistant Password</b>) : ''}
                <SubmitButton text = "Hi :) " onClick = {() => this.SendValues(this.state.username, this.state.password)}/>
            </div>
        )
    }
}

export default LoginForm