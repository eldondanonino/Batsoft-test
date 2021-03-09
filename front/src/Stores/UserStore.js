import {extendObservable} from mobx

class UserStore
{
    constructor()
    {
        super()
        extendObservable(this, 
        {
            loading: true,
            logged: false,
            username: '',
        }
        )
    }

}

export default new UserStore()  