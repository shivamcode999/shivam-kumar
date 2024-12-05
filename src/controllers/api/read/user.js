const { app } = require('../../../app');
const { User } = require('../../../models');

app.get('/api/read/user', async function (req, res) {
    let { id } = req.query;
    let user = await User.findByPk(id, {
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });

    let result = {
        formFieldValues: user,
        modalShow: "#add-modal",
        updateUrl: 'user?id=' + user.id

    }



    return res.json(result);
});