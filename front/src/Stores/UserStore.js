//import {action, makeObservable, observable} from 'mobx'
//import { extendObservable } from 'mobx'
import { Component } from 'react'

/*
class UserStore
{ 
    
    constructor()
    {
        extendObservable(this, 
        {
            loading: true,
            logged: false,
            wrong_un: false,
            wrong_pw: false
        })

    }
    logIn()
    {
        this.logged = true
    }

}*/
/*
class UserStore extends Component
{
    constructor(){
        super()
        this.state= {
            logged: false,
            wrong_un: false,
            wrong_pw: false

        }
        this.LogIn = this.LogIn.bind(this)
    }
    LogIn()
    {
        this.setState({logged: true})
    }

    render()
    {
        return
    }
}*/


class UserStore extends Component
{

    myStorage = window.sessionStorage
    constructor()
    {
        super()
        const loggedFromStorage = sessionStorage.getItem('logged')
        this.state = 
        {
            logged: (loggedFromStorage ? loggedFromStorage : false)
        }
    }

    SetStore()
    {
        console.log('Setting up storage')
    this.myStorage.clear()
    this.myStorage.setItem('logged',false)
    this.myStorage.setItem('loading',false)
    this.myStorage.setItem('wrong_pw',false)
    this.myStorage.setItem('wrong_un',false)
    console.log(`Status of logged after setting up : ${this.myStorage.getItem('logged')}`)
    }
    
    logOut()
    {
        this.setState({logged: false})
        this.myStorage.setItem('logged',false)
        console.log(`Status of logged : ${this.myStorage.getItem('logged')}`)
    }

    logIn()
    {
        this.setState({logged: true})
        this.myStorage.setItem('logged',true)
        console.log(`Status of logged : ${this.myStorage.getItem('logged')}`)
    }

    returnLogged()
    {
        return this.state.logged
    }
}

export default new UserStore()  