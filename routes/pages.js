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
router.get('/timetab.hbs',(req,res)=>{
    res.render('timetab');
});
router.get('/adminca.hbs',(req,res)=>{
    res.render('adminca');
});
router.get('/facassign.hbs',(req,res)=>{
    db.query('SELECT name FROM emp',(err,results)=>{
        if(err) throw err;
        console.log(results);
        res.render('facassign',{facname: results});
    });

});
router.get('/adminfac.hbs',(req,res)=>{
    db.query('SELECT id,name,dept,phno,userid FROM emp',(err,results)=>{
        if(err) throw err;
        console.log(results);
        res.render('adminfac',{userdata: results});
    });

});

module.exports = router;