var express=require('express');
const routes=require('./routes/api');
var bodyParser= require('body-parser');
const fs=require("fs");
var path= require('path');
cors =require('cors');
var app=express();


app.use(cors());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,path.join("views")));
//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//set static path
app.use(express.static(path.join(__dirname,"Public")));
app.use('/api',routes);
app.listen(4003,function(){
    console.log('server started on port 4003');
})