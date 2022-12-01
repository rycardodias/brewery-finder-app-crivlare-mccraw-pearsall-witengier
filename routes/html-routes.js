const router = require('express').Router()

router.get('/', async (req, res) => {
  res.render('index')
})

router.get('/login', async (req, res) => {
  res.render('login')
})

router.get('/users', async (req, res) => {
  res.render('users')
})

router.get('/search', async (req, res) => {
  res.render('search', { layout: 'main' });
})

router.get('/recipes', async (req, res) => {
  res.render('recipes', { layout: 'main' });
})

router.get('/favorites', async (req, res) => {
  res.render('favorites', { layout: 'main' });
})

module.exports = router
