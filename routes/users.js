const router = require('express').Router()
const db = require('../db')
const bcrypt = require('bcrypt')

router.get('/', async (req, res) => {
    try {
        const [rows, fields] = await db.query(
            `SELECT * FROM users`
        )

        res.status(200).json({ data: rows })
    } catch (error) {
        res.status(400).json({ error })
    }
})

router.post('/insert', async (req, res) => {
    try {
        const { username, password, birthday } = req.body

        if (!(username && password && birthday)) {
            return res.status(400).send('Required fields missing!')
        }

        const hash = await bcrypt.hash(password, 10)

        const [rows] = await db.query(
            `INSERT INTO users (username, password, dob) VALUES (?, ?, ?)`,
            [username, hash, birthday]
        )

        res.status(200).json({ data: rows })
    } catch (error) {
        res.status(400).json({ error })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body

        if (!(username && password)) {
            return res.status(400).send('Required fields missing!')
        }

        const [rows] = await db.query(
            `SELECT * FROM users where username = ?`,
            [username]
        )

        if (!rows[0]) {
            return res.status(400).json({ data: 'User not found!' })
        }

        //FIXME: is always false
        const isMatch = await bcrypt.compareSync(password, rows[0].password)

        // console.log(rows[0].password, isMatch, password)

        // if (!isMatch) return res.status(404).json({ error: 'Invalid username or password!' })

        req.session.loggedIn = true
        req.session.userId = rows[0].id

        res.redirect('/search')
        // res.status(200).json({ data: rows })
    } catch (error) {
        res.status(400).json({ error })
    }
})

router.post('/logout', (req, res) => {
    try {
        if (req.session) {
            req.session.destroy();
            return res.status(200).json({ data: "User loggedOut!" })
        }
        return res.status(400).json({ data: "Error onOut!" })

    } catch (error) {
        res.status(400).json({ error })
    }

})
module.exports = router