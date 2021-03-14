import { Component } from 'react'
import InputField from './InputField'
import SubmitButton from './SubmitButton'

class LoginForm extends Component
{

    componentDidUpdate()
    {
        //console.log("LoginForm UPDATED")
    }

    constructor(props)
    {
        super(props)
        this.SendValues = this.SendValues.bind(this)
        this.SetValue = this.SetValue.bind(this)
        this.ResetValue = this.ResetValue.bind(this)
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
        console.log(`Received :\n Username : ${username} , Password : ${password}`)
        if(!username && !password)
        {
            console.log("No un and no pw")
            return
        }
        if(!username || !password )
            {
                if(!username) 
                {
                    console.log("Invalid request : wrong un") 
                }
                
                if(!password)
                {
                    console.log("Invalid request : wrong pw") 
                }
                this.ResetValue()
                return
            }
        
        try{
            console.log(`Sending to the APP : \nUsername : ${username} , Password : ${password}`)
            this.props.LogIn(username, password)
        }catch(err) {
            console.log(err)
        }
    }

    render()
    {
        const username = this.state.username
        const password = this.state.password
        return(
            <div>
                <InputField placeholder = {'username'} type = 'text' value = {username ? this.state.username : ''} onChange = { (value) => this.SetValue('username', value) }/> 
                <InputField placeholder = {'password'} type = 'password' value = {password ? this.state.password : ''} onChange = { (value) => this.SetValue('password', value) }/> 
                <SubmitButton text = "Hi :) " method = {() => this.SendValues(username, password)}/>
            </div>
        )
    }
}
export default LoginForm