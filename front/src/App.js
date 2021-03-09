import React, {Component} from 'react'
import './App.css'
import { observer } from 'mobx-react'
import LoginForm from './Components/LoginForm'

class App extends Component{
  componentDidUpdate()
  {
    console.log("REEEEEEEEEEEEE")
  }

  hi()
  {
    console.log("Hello")
  }

  render()
  {
    return(
      <div> 
        <LoginForm/>
      </div>
    )
    

  }
}


export default observer(App);
