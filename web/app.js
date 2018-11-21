require('module-alias/register');
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mailer = require('express-mailer');

if(process.env.DB_CONNECTION)
{
    require('@model/connection');
}

mailer.extend(app, {
    from: process.env.MAILER_FROM,
    host: process.env.MAILER_HOST,
    secureConnection: true,
    port: process.env.MAILER_PORT,
    transportMethod: process.env.MAILER_TRANSPORT_METHOD,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD
    }
});

app.set('views','./resources/views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(require('./routes/web'));

app.listen(process.env.PORT, function(err) {
    if(!err) {
        console.log(`App is running on ${process.env.PORT} port`)
    }
});

