const router = require('express').Router()

router.use('/postcode', require('./postcode')) 
router.use('/city', require('./city'))

router.get('/', (req, res) => {
	res.status(200).json({ message: 'Clinics endpoint' })
});

module.exports = router