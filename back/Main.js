const express = require ('express') 
const app = express()
const path = require ('path')
const mysql = require ('mysql')
//const sess = require ('express-session')
//const MySQLStore = require ('express-mysql-session') (sess)
const Router = require('./Router')

app.use(express.static(path.join(__dirname, 'build')))
app.use(express.json())

console.log("Hi this is the back")

const database = mysql.createConnection({
    host : "localhost",
    user : 'root',
    password : '',
    database : "batsoft"
})

database.connect(function(err)
{
    if(err)
    {
        console.log()
        throw err
        return false
    }
    console.log("Database connected!")
})

new Router(app,database)

app.get('/', function(req,res)
{
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(3000)
//86,400,000 ms for 24 hrs