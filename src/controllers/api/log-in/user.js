const { where } = require('sequelize')
const { app } = require('../../../app')
const { SignUp } = require('../../../models')

app.get('/log-in', function (req, res) {
    res.render('log-in')
})
app.post('/api/log-in/user', async function (req, res) {
    let { user, password } = req.body;
    let error = [];
    if (!user) {
        error.push('please text something')
    }
    if (error.length) {
        let result = {
            swal: {
                icon: 'error',
                title: 'error',
                html: error.join('<br>')
            }
        }
        res.json(result)
    }
    if (user) {
        let checkPass = await SignUp.findAll({

            where: {
                password: password
            }
        })
        let checkUser = await SignUp.findAll({

            where: {
                name: user
            }
        })
        if (checkPass && checkUser) {
            console.log('log in successfuly!');


        }


    }




})
