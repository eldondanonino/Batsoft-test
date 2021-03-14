class Router 
{
    constructor(app, data)
    {
        this.login(app, data)
    }

    login(app, data)
    {
        app.post('/login', (req,res) => 
        {
            let username = req.body.username
            let password = req.body.password

            console.log(`\nreceived : \nusername : ${username} \npassword : ${password}`)
        })
    }
}

module.exports = Router 