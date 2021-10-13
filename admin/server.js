const express = require('express')
const next = require('next')

const port = parseInt(process.env.PORT, 11) || 3012
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const handle = app.getRequestHandler()
const _ = require('lodash')
const axios = require('axios')

app.prepare().then(() => {
  const server = express()

  server.get('/', (req, res) => {
    return app.render(req, res, '/', req.query)
  })

  server.get('/test', async (req, res) => {
    const respond = await axios.get(`http://66.42.57.217:3000/api/tickets`,{
      headers: {
        'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjUzNzgyOTMsInJvbGVzIjpbInVzZXIiXSwidXNlcm5hbWUiOiJhZG1pbiJ9.TmPVRhmjjHNIPK-IRrY1-cL3mzqDE6VJhGkJR2W75Wc` 
      }
    })
    res.send(respond.data.data)
  })

  server.get('/dashboard', (req, res) => {
    return app.render(req, res, '/dashboard', req.query)
  })

  server.get('/coming-soon', (req, res) => {
    return app.render(req, res, '/coming-soon', req.query)
  })

  // ------ users ------ begin
  server.get('/users', (req, res) => {
    return app.render(req, res, '/users', req.query)
  })

  server.get('/users/new', (req, res) => {
    return app.render(req, res, '/users/new', req.query)
  })

  server.get('/users/update/:id', (req, res) => {
    return app.render(req, res, '/users/update/[id]', req.query)
  })
  // ------ users ------ end

  // ------ tickets ------ begin
  server.get('/tickets', (req, res) => {
    return app.render(req, res, '/tickets', req.query)
  })

  server.get('/tickets/new', (req, res) => {
    return app.render(req, res, '/tickets/new', req.query)
  })

  server.get('/tickets/update/:id', (req, res) => {
    return app.render(req, res, '/tickets/update/[id]', req.query)
  })
  // ------ tickets ------ end


  // ------ parameters ------ begin
  server.get('/parameters', (req, res) => {
    return app.render(req, res, '/parameters', req.query)
  })

  server.get('/parameters/new', (req, res) => {
    return app.render(req, res, '/parameters/new', req.query)
  })

  server.get('/parameters/update/:id', (req, res) => {
    return app.render(req, res, '/parameters/update/[id]', req.query)
  })
  // ------ parameters ------ end


  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
