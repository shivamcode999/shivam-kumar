const {app} = require('../app');
const {User} = require('../models');

app.get('/users', async function(req, res){
    let users = await User.findAll();
    res.render('users',{users});
})