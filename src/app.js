const express = require('express')

const userRouter = require('./routers/user')
const entryRouter = require('./routers/entry')
const stage1Router = require('./routers/stage1')
const stage2Router = require('./routers/stage2')
const stage3Router = require('./routers/stage3')
const stage4Router = require('./routers/stage4')
const stage5Router = require('./routers/stage5')
const stage6Router = require('./routers/stage6')
const app = express()

app.use(express.json())
app.use(userRouter)
app.use(entryRouter)
app.use(stage1Router)
app.use(stage2Router)
app.use(stage3Router)
app.use(stage4Router)
app.use(stage5Router)
app.use(stage6Router)
module.exports = app
