import React, {Component} from 'react'
import './App.css'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import SubmitButton from './Components/SubmitButton'
import LoginForm from './Components/LoginForm'

class App extends Component{
  constructor()
  {
    super()
    this.handleLogOut = this.handleLogOut.bind(this)
    this.handleLogIn = this.handleLogIn.bind(this)
    /*this.handleWrongUn = this.handleWrongUn.bind(this)
    this.handleWrongPw = this.handleWrongPw.bind(this)*/

    this.state = {
      login: false,
      user: ''
    }
  }

  async handleLogIn(un, pw)
  {
    console.log(`SENDING TO THE API : ${un} + ${pw}`)
    try
    {
      let res = await fetch ('/login', 
      {
        method : 'post',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify({
          username : un,
          password : pw
        })
      })

      let result = await res.json()
      if(result && result.success)
      {
        this.setState({user : result.username})
        console.log(`Login successful, welcome ${this.state.user}`)
      }
      else
      {
        console.log('Error while logging in (not critical)')
      }
    }
    catch(err)
    {
      console.log('ERROR WHILE LOGGING IN')
    }
  }
  
  async handleLogOut()
  {
    /*this.setState({login: false})
    console.log("Logged Out!")*/
    try
    {
      let res = await fetch ('/logout', 
      {
        method : 'post',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application.json'
        }
      })

      let result = await res.json()
      if(result && result.success)
      {
        console.log('Logout successful')
      }
      else
      {
        console.log('Error while logging out (not critical)')
      }
    }
    catch(err)
    {
      console.log('ERROR WHILE LOGGING OUT')
    }

  }
/*
  handleWrongPw(isTrue)
  {
    if(this.state.wrong_pw !== isTrue)
    {
      (isTrue)? this.setState({wrong_pw: true}) : this.setState({wrong_pw: false})
    }
    else console.log("No Change Needed")
  }

  handleWrongUn(isTrue)
  { 
    if(this.state.wrong_un !== isTrue)
    {
      (isTrue)? this.setState({wrong_un: true}) : this.setState({wrong_un: false})
    }
    else console.log("No Change Needed")
  }
*/


  render()
  {
    const login = this.state.login
    //console.log(`login : ${login}`)
    return(
      <Router>


        <div>

          {login === true ? <Redirect push to= "/main-menu"/> : <Redirect push to= "/"/>}

          <Route path = '/' exact>   
          {login === true ? <Redirect push to= "/main-menu"/> : console.log("not logged in") }
          <div>
              <h1>LoginPage</h1> 
              <LoginForm LogIn = {this.handleLogIn}/>
          </div>
          </Route>

          <Route path = '/main-menu' exact> 
            <div>
              <h1>You are logged in!</h1> 
              <h3>Main menu</h3>
              <SubmitButton text = 'Log Out' method = {this.handleLogOut}/>
            </div>
          </Route> 

        </div> 
        
      
      </Router>
    )
    

  }
}


export default observer(App);
