import express from 'express'

const app = express()


app.get('/', (req, res) => {
  return res.send('Hello Express')
})
app.get('/users', (req, res) => {
  return res.send('Hello User Express')
})

app.listen(3333, () => {
  console.log('HTTP server running')
})