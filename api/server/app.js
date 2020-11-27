/* eslint-disable no-unused-expressions */
import express from 'express'
import cors from 'cors'
import path from 'path'
import setupDB from '../database'

const app = express()

setupDB().then(() => console.log('Connected to the Database.'))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (_, res) => res.json({ msg: 'MoneyGuard is Protectinggg.' }))
app.get('/trans', (req, res) => {
  res.sendFile(path.join(__dirname, '../../', 'index.html'))
})

require('../routes')(app)

module.exports = app
