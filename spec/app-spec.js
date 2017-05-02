//spec/app-spec.js

const http = require('http')
const base_url = "http://localhost:3000/clinics"
const postcode = require('../routes/clinics/postcode/postcode.js')


// TO DO: test routes with supertest


describe("clinics", () => {

  	it("should check if a postcode is valid", () => {	
    	expect(postcode.isValidPostcode("SE26 4EN")).toBe(true)
    	expect(postcode.isValidPostcode("SE26 4EN5")).toBe(false)
  	});

	it("should return first part of postcode before space", () => {
    	expect(postcode.getPartPostcode("BH12 4JF")).toBe("BH12")
    	expect(postcode.getPartPostcode("SE26 4EN")).not.toBe("SE264")
  	});

    // test 'store' logic of reducer and addSearchTerm
    describe("reducer", () => {

        it("should handle ADD_SEARCH_TERM action", () => {
            
            const clinics = {
                store : {
                    searchTerms : [],
                    result : []
                }
            };

            const action = {
                type: 'ADD_SEARCH_TERM',
                data: {
                    searchTerm: 'BH12'
                }
            }
            
            const result = postcode.reducer(clinics, action)
            
            expect(result).toEqual({
                searchTerms : ['BH12'],
                result : []
            })
      
        })

    })

    //TO DO: test with jasmine-ajax

    /*
    it("should run callback", () => {
        expect(postcode.fetchClinics(url, () => {})).toBe({})
    })
    */

})


