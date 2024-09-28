const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require("cors") 

app.use(express.json({limit:'10mb'}))
app.use(express.urlencoded({extended:false}))
app.use(morgan("dev"))
app.use(cors())

app.use("/api/v1",require("./routes/auth.routes"))


app.get('/', (req, res) => {
  res.send('krishna ballav!')
})


module.exports  =app