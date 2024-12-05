const { app } = require('../../../app');
const { User } = require('../../../models');

app.get('/api/read/users', async function (req, res) {
    let users = await User.findAll({
        // attributes:[`id`,`name`,`mobile`,`email`]
        attributes: {
            exclude: ['createdAt', 'updatedAt']
        }
    });
    return res.json({ users });
});