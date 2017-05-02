const router = require('express').Router()
const https = require('https')
const url = "https://data.gov.uk/data/api/service/health/clinics/partial_postcode?partial_postcode="
const clinics = {
	store : {
		searchTerms : [],
		results : []
	}
};

router.get('/:postcode', (req, res) => {
  	
	if(!req.params.postcode) res.status(400).json({ error:'Please submit a postcode' })
	
	const postcode = req.params.postcode

  	if(router.isValidPostcode(postcode)){

  		let partialPostcode = router.getPartPostcode(postcode) 

	  	clinics.store = router.reducer(clinics, {
	  		type: 'ADD_SEARCH_TERM',
	  		data: {
	    		searchTerm: partialPostcode
	  		}
		})

		router.fetchClinics(url + partialPostcode, (status, resultSet) => {
			
			res.statusCode = status;

			let clinics = { results:[] };

			//find postcode match - if any
			for(let i = 0, il = resultSet.result.length; i < il; i++){
		
				if(resultSet.result[i].postcode == postcode){

					let obj = { organisation_id : resultSet.result[i].organisation_id,
								name : resultSet.result[i].name }

					clinics.results.push(obj)
				}
			}
			
            res.send(clinics)
		})
		
  	}
  	else{
  		res.status(400).json({ error:'Not a valid postcode' })
  	}
});


router.isValidPostcode = (postcode) => {
	
	postcode = postcode.replace(/\s/g, "");
    const regex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]{0,1} ?[0-9][A-Z]{2}$/i
    return regex.test(postcode)	
}

router.getPartPostcode = (postcode) => {
	return postcode.substr(0,postcode.indexOf(' '))
}

router.addSearchTerm = (state, action) => {
  	return Object.assign({}, state.store, {
    	searchTerms: state.store.searchTerms.concat(action.data.searchTerm)
  	})
}

router.reducer = (state = clinics, action) => {
	switch (action.type) {
    	case 'ADD_SEARCH_TERM':
      		return router.addSearchTerm(state, action)
      	default:
      		return state
  	}
}

router.fetchClinics = (url, cb, res) => {

	let request = https.get(url, function(res) {

		let output = '';
		res.setEncoding('utf8');

		res.on('data', (chunk) => {
            output += chunk;
        });

        res.on('end', () => {
            let obj = JSON.parse(output)
            cb(res.statusCode, obj)
        });	
	})

	request.on('error', (err) => {
    	console.error('we have a problem')
	});
}


/*
 TO DO: implement with store getter for postcode

router.parseClinics = (res, status, resultSet) => {
			
	res.statusCode = status;

	let clinics = { results:[] };

	//loop through all and find postcode match
	for(let i = 0, il = resultSet.result.length; i < il; i++){

		if(resultSet.result[i].postcode == postcode){

			let obj = { organisation_id : resultSet.result[i].organisation_id,
						name : resultSet.result[i].name }

			clinics.results.push(obj)
		}
	}
	
    res.send(clinics)
}
*/

module.exports = router

