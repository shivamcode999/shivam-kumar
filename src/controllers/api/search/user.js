// const { where } = require('sequelize');
const { app } = require('../../../app');
const { User } = require('../../../models')
const sequelize = require('sequelize');
const Op = sequelize.Op;


app.post('/api/search/user', async function (req, res) {
    let { name } = req.body;

    let error = [];

    if (error.length) {
        let result = {
            swal: {
                icon: "error",
                title: "error",
                html: error.join("<br>"),
            }
        }
        res.json(result)

    } else {
        let user = await User.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        });
        // console.log(user[0].mobile);



        let result = {
            addRowTable: "#user-data tbody",
            user,
            swal: {
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1000,
                timerProgressBar: true,
                icon: "success",
                title: "Signed in successfully"
            }

        }
        res.json(result)

    }




})