const router = require('express').Router()

const sendRequest = require('../middleware/sendRequest');

router.get('/', async (req, res) => {
    try {
        const response = await sendRequest('GET', '')

        res.status(200).json({ data: response.data })
    } catch (error) {
        res.status(400).json({ error })
    }
})

router.get('/byPostal', async (req, res) => {
    try {
        const { postalNumber } = req.query

        const response = await sendRequest('GET', `?by_postal=${postalNumber}`)

        res.status(200).json({ data: response.data })
    } catch (error) {
        res.status(400).json({ error })
    }
})

module.exports = router