const express = require('express');
const app = express();
const fileUpload = require('express-fileupload')

app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static('./assets'))

app.use(fileUpload({
    userTempFiles: true,
    preserveExtention: true,
    parseNested: true
}))





module.exports = { app };