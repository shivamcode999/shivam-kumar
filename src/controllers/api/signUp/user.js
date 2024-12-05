const { app } = require("../../../app");
const { User, SignUp } = require("../../../models");


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/signUp-page', function (req, res) {
    res.render('signUp-page')
})


// API endpoint to handle Step 1 data
app.post('/api/signUp/user', async function (req, res) {
    // formData = { ...formData, ...req.body };
    // res.json({ message: 'Step 1 data saved', formData });
    // let {name, email} = FormData.name;
    let { name, email, password } = req.body;




    // let formData = req.body;
    // res.json({formData})

    let err = [];

    // Check for numbers (0-9)
    const hasNumbers = /\d/.test(name);

    // Check for symbols (any non-alphanumeric character) with regular expresion
    const hasSymbols = /^[\w\s . _]$/.test(name);

    //check for email currect or not validation use of regular exprestion
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

    // Define the regular expression for password validation
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!name) {
        err.push("Name is require");
    } else if (name) {
        if (!(name.length >= 3 && name.length <= 15)) {
            err.push("Name must be more then 3 and less then 15 char long..");
        } else if (hasNumbers) {
            err.push("Name enter only in string with (. and whitespace and _)");
        } else if (hasSymbols) {
            err.push(`Name does not include symbols like @#$%^&*!0-9`);
        }
    }
    if (!email) {
        err.push("Email is require");
    } else if (!emailPattern) {
        err.push('The email address  is invalid pettern is(email@example.com)');
    }

    if (!password) {
        err.push('please enter the password');
    } else if (password) {
        if (!passwordPattern) {
            err.push('please enter correct password')
        }
    }

    if (err.length) {
        let result = {
            swal: {
                icon: "error",
                title: "error",
                html: err.join("<br>"),
            },
        }
        res.json(result)
    } else {
        let singleuser = await SignUp.findAll({
            where: {
                name: name
            }
        });

        if (singleuser) {
            let result = {
                swal: {
                    icon: 'error',
                    title: 'error',
                    html: 'this name is already exist'
                }
            }
            res.json(result)
            return;

        }



        let user = await SignUp.create({
            name,
            password,
            email,
        });
        let result = {
            user,
            formReset: true,
            swal: {
                icon: "success",
                title: "Signed in Seccesfully",
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }

            },
        }
        res.json(result)

    }
});
