//import {action, makeObservable, observable} from 'mobx'
import React, { Component } from 'react'

/*class UserStore
{ 
    
    constructor()
    {
        makeObservable(this, 
        {
            loading: observable,
            logged: observable,
            logIn: action,
            wrong_un: observable,
            wrong_pw: observable
        })

        this.loading = true
        this.logged = false
        this.wrong_un = false
        this.wrong_pw = false

    }
    logIn()
    {
        this.logged = !this.logged
    }

}*/

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
}

export default new UserStore()  