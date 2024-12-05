const { app } = require('../../../app');
const { User } = require('../../../models');

app.post('/api/create/user', async function (req, res) {
   const { name, mobile, email } = req.body;


   let error = [];

   if (!name) {
      error.push('name is require')
   }

   if (!mobile) {
      error.push('mobile is require');
   }
   if (!email) {
      error.push('email is require')
   }

   if (error.length) {
      let result = {
         swal: {
            icon: 'error',
            title: 'error',
            html: error.join("<br>")
         }
      }
      res.json(result)
   } else {
      let user = await User.create({
         name,
         mobile,
         email,
      });


      let result = {
         user,
         addRowTable: "#user-data tbody",
         swal: {
            icon: "success",
            title: "success",
            html: "User Created",
            keydownListenerCapture: true,
         },
         formReset: true,
         modalHide: "#add-modal",

      }
      res.json(result)

   }







})