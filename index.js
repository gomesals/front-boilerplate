'use strict'
const express = require('express')
const app = express()
const path = require('path')

app.get('/', (req, res) => {
  res.render('index')
})

// SETTINGS
app.use(express.static('./dist'))
app.use('/node', express.static(path.join(__dirname, '/node_modules')))
app.set('view engine', 'pug')

app.listen((process.env.PORT || 8080), () => {
  console.log(`Server started at port ${(process.env.port || 8080)}`)
})
