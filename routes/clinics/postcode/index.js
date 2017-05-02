const router = require('express').Router()

router.get('/', (req, res) => {
	res.status(200).json({ message: 'Postcode endpoint here' })
})

router.get('/:postcode', require('./postcode.js'))

module.exports = router