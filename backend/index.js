const mongoConnect = require('./db')//connect with database
var cors=require('cors')
mongoConnect();//call  function to check connection with database
const express = require('express')
const app = express()
const port = 8000
app.use(cors())
app.use(express.json())
//Availabe routes
app.use('/api/auth',require('./routes/auth'))//set the path  to route
app.use('/api/notes',require('./routes/notes'))//set the path to notes
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})