// console.log('Hello')
const express = require('express')
// const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const {sequelize} = require('./models')
const config = require('./config/config')
const path = require('path')
const app = express()
app.use(morgan('combined'))
app.use(express.json())
app.use(cors())
app.use('/static', express.static(path.join(__dirname, 'public')))

require('./routes')(app)

sequelize.sync({force: true})
// sequelize.sync()
    .then(() => {
        app.listen(config.port || 8081)
    })
// app.listen(process.env.PORT || 8081)