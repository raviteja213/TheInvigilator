const express = require('express');
const router=express.Router();
const mysql=require("mysql");

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'facultylogin'
});

router.get('/',(req,res)=>{
    res.render('home');
});
router.get('/home.hbs',(req,res)=>{
    res.render('home');
});
router.get('/index.hbs',(req,res)=>{
    res.render('index');
});
router.get('/adminlogin.hbs',(req,res)=>{
    res.render('adminlogin');
});
router.get('/signup.hbs',(req,res)=>{
    res.render('signup');
});
router.get('/admin.hbs',(req,res)=>{
    res.render('admin');
});
router.get('/adminfac.hbs',(req,res)=>{
    db.query('SELECT * FROM emp',(err,results)=>{
        if(err) throw err;
        console.log(results);
        res.render('adminfac',{userdata: results});
    });

});

module.exports = router;