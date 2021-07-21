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
    const respond = await axios.get(`http://66.42.57.217:3000/api/specs`,{
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

  // ------ specs ------ begin
  server.get('/specs', (req, res) => {
    return app.render(req, res, '/specs', req.query)
  })

  server.get('/specs/new', (req, res) => {
    return app.render(req, res, '/specs/new', req.query)
  })

  server.get('/specs/update/:id', (req, res) => {
    return app.render(req, res, '/specs/update/[id]', req.query)
  })
  // ------ specs ------ end

  // ------ banners ------ begin
  server.get('/banners', (req, res) => {
    return app.render(req, res, '/banners', req.query)
  })

  server.get('/banners/manage', (req, res) => {
    return app.render(req, res, '/banners/manage', req.query)
  })

  server.get('/banners/new', (req, res) => {
    return app.render(req, res, '/banners/new', req.query)
  })

  server.get('/banners/update/:id', (req, res) => {
    return app.render(req, res, '/banners/update/[id]', req.query)
  })
  // ------ banners ------ end

  // ------ ads ------ begin
  server.get('/ads', (req, res) => {
    return app.render(req, res, '/ads', req.query)
  })

  server.get('/ads/new', (req, res) => {
    return app.render(req, res, '/ads/new', req.query)
  })

  server.get('/ads/update/:id', (req, res) => {
    return app.render(req, res, '/ads/update/[id]', req.query)
  })
  // ------ ads ------ end

  // ------ ads-review ------ begin
  server.get('/ads-review', (req, res) => {
    return app.render(req, res, '/ads-review', req.query)
  })
  // ------ ads-review ------ end

  // ------ coming soon ------ begin
  server.get('/coming-soon', (req, res) => {
    return app.render(req, res, '/coming-soon', req.query)
  })

  server.get('/coming-soon/new', (req, res) => {
    return app.render(req, res, '/coming-soon/new', req.query)
  })

  server.get('/coming-soon/update/:id', (req, res) => {
    return app.render(req, res, '/coming-soon/update/[id]', req.query)
  })
  // ------ coming-soon ------ end
  // server.get('/b', (req, res) => {
  //   return app.render(req, res, '/b', req.query)
  // })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
