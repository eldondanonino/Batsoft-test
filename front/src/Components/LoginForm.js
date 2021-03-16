import { Component } from 'react'
import InputField from './InputField'
import SubmitButton from './SubmitButton'


class LoginForm extends Component
{

    componentDidMount()
    {
        this.ResetValue()
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
        //console.log(`${property} : ${value}`)

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
                    alert("Invalid request : no username") 
                }
                
                if(!password)
                {
                    alert("Invalid request : no password") 
                }
                this.ResetValue()
                return
            }
        
        try{
            this.props.LogIn(username, password)
            this.ResetValue()
        }catch(err) {
            console.log(err)
        }
    }

    render()
    {
        const username = this.state.username
        const password = this.state.password
        return(
            <div className = "centerer">
                <InputField placeholder = {'username'} type = 'text' value = {username ? this.state.username : ''} onChange = { (value) => this.SetValue('username', value) }/> 
                <InputField placeholder = {'password'} type = 'password' value = {password ? this.state.password : ''} onChange = { (value) => this.SetValue('password', value) }/>
                <SubmitButton text = "Login!" method = {() => this.SendValues(username, password)}/>
            </div>
        )
    }
}
export default LoginForm