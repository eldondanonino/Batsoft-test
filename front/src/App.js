import React, {Component} from 'react'
import './App.css'
import { observer } from 'mobx-react'
import { BrowserRouter as Router, Redirect, Route} from 'react-router-dom'


import LoginPage from './Pages/LoginPage'
import UserStore from './Stores/UserStore'
import SubmitButton from './Components/SubmitButton'

class App extends Component{
  componentDidMount()
  {
    console.log("Component mounted!")
  }



  render()
  {
    return(
      <Router>


        <div> 

          
          {UserStore.logged ? <Redirect push to = '/a'/> : <Redirect push to = '/'/> }


          <h1>
            {`Login Status : ${UserStore.state.logged}\n`}

          </h1>
          

            <Route path = '/' exact>   
              <LoginPage/>
            </Route>

            <Route path = '/a' exact> 
              <div>
                <h1>A</h1> 
                <SubmitButton text = 'Log Out' onClick = {() => (UserStore.logged = false) }/>
              </div>
            </Route> 
        </div> 
        
      
      </Router>
    )
    

  }
}


export default observer(App);
