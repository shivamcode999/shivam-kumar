const { where } = require('sequelize');
const {app} = require('../../../app');
const {User} = require('../../../models');

app.get('/api/delete/user', async function(req, res){
    let {id} = req.query;

    let user = await User.destroy({
        where:{id}
    });
    
    if(user){
        let result = {
            deleteRowTable: true,
            swal: {
                icon: 'success',
                title: 'success',
                html: 'record deleted!',
                keydownListenerCapture: true
            }
        }
        return res.json(result)
    }

    let result = {
        swal:{
            icon:'error',
            title:'error',
            html:'Try again!',
            keydownListenerCapture: true
        }
    }
    res.json(result)
    
})