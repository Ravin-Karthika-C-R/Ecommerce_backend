require('dotenv').config()
const express=require('express')

const router=require('./router/router')
const cors=require('cors')

const server=express()

server.use(cors())
server.use(express.json())
server.use(router)



require('./db/connection')

//port
const port=5002 || process.env.port

server.listen(port,()=>{
    console.log(`Server is running on ${port}`)
})









