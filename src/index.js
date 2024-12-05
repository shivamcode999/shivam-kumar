const {app} = require('./app');
require('dotenv').config();
const { HOST, PORT } = process.env;

const requireDir = require('require-dir');

requireDir('./controllers', {recurse:true})


app.listen(PORT, function(){
    console.log(`server running on ${HOST}${PORT}`);
    
})
