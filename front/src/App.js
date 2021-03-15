import React, {Component} from 'react'
import './App.css'
import { BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import SubmitButton from './Components/SubmitButton'
import LoginForm from './Components/LoginForm'
//import "./style.css"

class App extends Component{
  constructor()
  {
    super()
    this.handleLogOut = this.handleLogOut.bind(this)
    this.handleLogIn = this.handleLogIn.bind(this)
    this.handleSignup = this.handleSignup.bind(this)
    this.getStatus = this.getStatus.bind(this)
    this.sleep = this.sleep.bind(this)

    this.state = {
      login: false,
      user: ''
    }
  }

  componentDidMount()
  {
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
    this.getStatus() 
    
  }
  
  sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
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
      console.log(`Message from the server : ${result.message}`)
      if(result && result.success)
      {
        this.setState({user : result.username, login : true})
        console.log(`Login successful, welcome ${this.state.user}`)
        this.setState({login : true})
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
  
  async handleLogOut(un)
  {
    console.log(`UN : ${un}`)
    try
    {
      let res = await fetch ('/logout', 
      {
        method : 'post',
        headers: {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(
        {
          username: un
        })
      })

      let result = await res.json()
      console.log(`Server respons : ${result.message}`)
      if(result && result.success)
      {
        this.setState({user : ""})
        this.setState({login: false})
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

  async getStatus()
  {
    try{
    console.log("Sending a status request to the back")
    let res = await fetch ('/getstatus',
    {
      method : 'post',
      headers: {
        'Accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(
      {
        logged: 1
      })
    })

    let result = await res.json()
      console.log(`Server respons : ${result.message}`)

      if(result && result.success)
      {
        console.log(`Logged in : ${result.username}`)
        this.setState({login : true})
        return result.success
      }
      else
      {
        console.log('Error while contacting the server (not critical)')
        this.setState({login : false})
        return result.success
      }
    }
    catch(err)
    {
      console.log('ERROR WHILE CONTACTING THE SERVER')
      this.setState({login : false})
      return 0
    }
  }

  async handleSignup(un, pw)
  {
    console.log(`SENDING TO THE API : ${un} + ${pw}`)
    try
    {
      let res = await fetch ('/signup', 
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
      console.log(`Message from the server : ${result.message}`)
      if(result && result.success)
      {
        console.log(`Signup successful, welcome ${this.state.user}`)
      }
      else
      {
        console.log('Error while signing up (not critical)')
      }
      <Redirect push to = '/success'/>
    }
    catch(err)
    {
      console.log('ERROR WHILE SIGNING UP')
    }
  }

  render()
  {
    //this.sleep(500)
    //this.getStatus()
    const login = this.state.login
    console.log(login)
    return(
      <Router>
        <div>

          <Route path = '/' exact>   
          {/*login === true ? <Redirect push to= "/main-menu"/> : console.log("not logged in")*/ }
          <div>
              <h1 className = "title">LoginPage</h1> 
              <LoginForm LogIn = {this.handleLogIn}/>
              <br/>
              <a href = '/sign-up' >Sign up</a>
          </div>
          </Route>

          <Route path = '/sign-up' exact>

            <div> 
              <h1 className = "title"> Signup page </h1>
              <LoginForm LogIn = {this.handleSignup} />
              <br/>
              <a href = '/' >Main Menu</a>
            </div>
          </Route>

          <Route path = '/main-menu' exact> 
          { /*login !== true ? <Redirect push to= "/"/> : console.log("logged in")*/ }
            <div> 
              <h1 className = "title">Main menu</h1>
              <SubmitButton text = 'Log Out' method = {() => this.handleLogOut("daniil")}/>
            </div>
          </Route> 

        </div> 
      </Router>
    )
  }
}
export default App;
