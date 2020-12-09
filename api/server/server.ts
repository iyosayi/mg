/* eslint-disable no-console */
// import http from 'http'
import app from './app'

const port = process.env.PORT || 4000
// const server = http.createServer(app)

app.listen(port, () => console.log(`Server is running`))
// function onListening() {
//   const addr = server.address()
//   const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`
//   // debug(`Listening on ${  bind}`)
//   console.log('Server started.')
// }

// server.listen(port)
// // server.on('error', onError)
// server.on('listening', onListening)
