const express = require('express')
const app = express()
const port = process.env.port || 3001
const trelloApi = require('./routes/trello')


app.use("/trello",trelloApi);

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port port!`))