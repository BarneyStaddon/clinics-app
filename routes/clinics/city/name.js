const router = require('express').Router()

router.get('/:name', (req, res) => {
  	
	const name = req.params.name;
  	res.status(200).json({ message:'Name submitted ' + name })
});

module.exports = router