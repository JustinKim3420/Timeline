require('dotenv').config()

const express = require('express')
const cors = require('cors')
const app = express()

const PORT = process.env.PORT || 3001;

app.use(cors())
app.use(express.json())

app.use('/api/chess',require('./router/api/chessAPI'))

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

