require('dotenv').config()
const express = require('express')
const hbs = require('hbs')
const path = require('path')

const app = express();
const userRoute = require('../routes/user.route');
app.set('view engine' , 'hbs')
app.set('views' , path.join(__dirname , '../design/views'))
app.use(express.static( path.join(__dirname , '../public')));
hbs.registerPartials( path.join(__dirname , '../design/layouts'));
app.use(express.urlencoded({extended:true}));
app.use(userRoute)

module.exports = app;