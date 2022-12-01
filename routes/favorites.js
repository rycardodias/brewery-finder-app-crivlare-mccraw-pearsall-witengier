const router = require('express').Router()
const db = require('../db')
const sendRequest = require('../middleware/sendRequest');


router.get('/', async (req, res) => {
    try {
        console.log(req.session.userId)
        const [rows, fields] = await db.query(
            `SELECT * FROM favorites`
        )

        res.status(200).json({ data: rows })
    } catch (error) {
        res.status(400).json({ error })
    }
})

router.get('/byUser', async (req, res) => {
    try {
        const userId = req.session.userId

        const [rows, fields] = await db.query(
            `SELECT * FROM favorites WHERE userId = ?`,
            [userId]
        )

        const promises = await rows.map(async (item) => {
            const breweryItemApiResult = await sendRequest('GET', `/${item.breweryId}`)

            const breweryData = await breweryItemApiResult.data

            return breweryData
        })


        const breweryList = await Promise.all(promises)

        res.status(200).json({ data: breweryList })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }
})

router.post('/insert', async (req, res) => {
    try {
        const { breweryId } = req.body
        const userId = req.session.userId

        console.log(breweryId, userId)

        if (!(userId && breweryId)) {
            return res.status(400).send('Required fields missing!')
        }

        const [rows] = await db.query(
            `INSERT INTO favorites (breweryId, userId) VALUES (?, ?)`,
            [breweryId, userId]
        )

        res.status(200).json({ data: rows })
    } catch (error) {
        res.status(400).json({ error })
    }
})

router.delete('/delete', async (req, res) => {
    try {
        const { breweryId } = req.body
        const userId = req.session.userId

        if (!(userId && breweryId)) {
            return res.status(400).send('Required fields missing!')
        }

        const [rows, status] = await db.query(
            `DELETE FROM favorites WHERE breweryId = ? AND userId = ?`,
            [breweryId, userId]
        )

        res.status(200).json({ data: rows })
    } catch (error) {
        res.status(400).json({ error })
    }
})

module.exports = router