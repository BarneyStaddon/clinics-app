const app = require('express')();
const clinics = require('./routes/clinics');

//top level root
//see http://codetunnel.io/an-intuitive-way-to-organize-your-expressjs-routes/
app.use('/clinics', clinics);


app.listen(3000, () => {
	console.log('Listening on port 3000');
});