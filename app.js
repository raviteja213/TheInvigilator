const express = require("express");
const mysql=require("mysql");
const path=require("path");
const app=express();


const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'adminlogin'
});

const publicDirectory=path.join(__dirname,'./public');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine",'hbs');


db.connect((error)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("Mysql connected...")
    }
})

app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));



app.listen(5000,()=>{
    console.log("Server sarted on port 5000.....");
})
