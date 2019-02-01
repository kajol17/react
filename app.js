var express=require('express');
const routes=require('./routes/api');
var bodyParser= require('body-parser');
const fs=require("fs");
var path= require('path');
cors =require('cors');
var app=express();

//var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
//var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';
var port=process.env.Port||3000;

app.use(cors());
app.set("view engine","ejs");
app.set("views",path.join(__dirname,path.join("views")));
//body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


//set static path
app.use(express.static(path.join(__dirname,"Public")));
app.use('/api',routes);
/*app.listen(4003,function(){
    console.log('server started on port 4003');
})*/
app.listen(port,()=>{
    console.log("listening..");
});