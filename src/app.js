const express = require('express')

const userRouter = require('./routers/user')
const entryRouter = require('./routers/entry')
const stage1Router = require('./routers/stage1')
const app = express()

app.use(express.json())
app.use(userRouter)
app.use(entryRouter)
app.use(stage1Router)

module.exports = app
