const express = require('express')

const userRouter = require('./routers/user')
//const entryRouter = require('./routers/entry')
const stage1Router = require('./routers/stage1')
const stage2Router = require('./routers/stage2')
const stage3Router = require('./routers/stage3')
const app = express()

app.use(express.json())
app.use(userRouter)
//app.use(entryRouter)
app.use(stage1Router)
app.use(stage2Router)
app.use(stage3Router)
module.exports = app
