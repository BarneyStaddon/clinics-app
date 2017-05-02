const router = require('express').Router()

router.get('/', (req, res) => {
	res.status(200).json({ message: 'City endpoint here' })
});

router.get('/:name', require('./name.js'))

module.exports = router