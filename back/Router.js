class Router 
{
    constructor(app, database)
    {
        this.login(app, database)
        this.logout(app, database)
    }

    login(app, database)
    {
        app.post('/login', (req,res) => 
        {
            let username = req.body.username
            let password = req.body.password

            console.log(`\nreceived login request -> username : ${username} / password : ${password}`)

            let cols = [username]
            database.query('SELECT * FROM user WHERE username = ? LIMIT 1', cols, (err, data) => 
            {
                if(err)
                {
                    res.json({success : false, message: "cant login with the db"})
                    return false
                }

                if(data && data.length === 1 )
                {
                    if(data[0].password === password)
                    {
                        database.query('UPDATE user SET logged = 1 WHERE username = ?', cols, (err,data) =>
                        {
                            if(err)
                            {
                                res.json({success : false, message: "Cant update the login status"})
                                return false
                            }
                            
                        })
                        res.json({success : true, message: "LOGGED IN WITH DB", username: username})
                    }
                    else {
                        res.json({success : false, message: "Wrong password"})
                        return false
                    }
                }
                else{
                    res.json({success : false, message: "Wrong credentials"})
                    return false
                }
            })


        })
    }

    logout(app, database)
    {
        app.post('/logout', (req, res) => 
        {
            console.log(req)
            let username = req.body.username
            console.log(`received logout request -> ${username}`)

            let cols = [username]

            database.query('SELECT * FROM user WHERE username = ? LIMIT 1', cols, (err, data) => 
            {
                if(err)
                {
                    res.json({success : false, message: "cant logout with the db"})
                    return false
                }

                if(data && data.length === 1 )
                {
                    database.query('UPDATE user SET logged = 0 WHERE username = ?', cols, (err,data) =>
                    {
                        if(err)
                        {
                            res.json({success : false, message: "Cant update the login status"})
                            return false
                        }
                        
                    })
                    res.json({success : true, message: "LOGGED OUT WITH DB"})
                    return true
                }
                else{
                    res.json({success : false, message: "Couldn't find the user in the database"})
                    return false
                }
            })
        })
    }
}

module.exports = Router 