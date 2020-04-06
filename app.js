const express = require('express')
const app = express()
const port = process.env.port || 3001
const trelloApi = require('./routes/trello')
const githubApi = require('./routes/github')

app.use("/trello",trelloApi);
app.use("/github",githubApi);

app.get('/',(req,res)=>res.send("hello"))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))