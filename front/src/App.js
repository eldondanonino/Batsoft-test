import React, {Component} from 'react'
import './App.css'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import SubmitButton from './Components/SubmitButton'
import LoginForm from './Components/LoginForm'
import Logged from './Components/Logged'

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
      wrong_pw: false,
      wrong_un: false
    }
  }

  handleLogIn()
  {
    this.setState({login: true})
    console.log("Loged In!")
  }
  
  handleLogOut()
  {
    this.setState({login: false})
    console.log("Loged Out!")
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

  componentDidUpdate()
  {
    console.log("APP UPDATED")
  }

  render()
  {
    const login = this.state.login
    return(
      <Router>


        <div>

          <h1>
            <Logged login = {login}/>
          </h1>

          {login === true ? <Redirect push to= "/main-menu"/> : <Redirect push to= "/"/>}

          <Route path = '/' exact>   
          <div>
              <h1>LoginPage</h1> 
              <LoginForm LogIn = {this.handleLogIn} /*WP = {this.handleWrongPw} WU = {this.handleWrongUn} un = {wu} pw = {wp}*//>
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
