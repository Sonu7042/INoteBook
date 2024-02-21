const express=require('express')
const mongoConnect=require('./db/db')
const cors=require('cors')



const app=express()
const port=9000
app.use(cors())

app.use(express.json())

mongoConnect()

app.use('/',require('./routes/auth'))
app.use('/',require('./routes/notes'))




app.listen(port,()=>{
    console.log("server is listening...")
})

