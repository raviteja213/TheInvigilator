const express = require("express");
const mysql=require("mysql");
const path=require("path");
const app=express();


const db=mysql.createPool({
    host:'remotemysql.com',
    user:'t3b3MlWj8Z',
    password:'DVhBKljPiq',
    database:'t3b3MlWj8Z'
});

const publicDirectory=path.join(__dirname,'./public');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("view engine",'hbs');




app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));



app.listen(5001,()=>{
    console.log("Server sarted on port 5000....");
})
