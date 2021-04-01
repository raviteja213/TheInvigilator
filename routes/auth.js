const express = require('express');
const router=express.Router();
const authController = require('../controllers/auth');

router.post('/signup',authController.signup);
router.post('/index',authController.login);
router.post('/adminlogin',authController.adminlogin);
router.post('/timetable',authController.timetable);
router.post('/adminca',authController.adminca);
router.post('/facassign',authController.fac);

router.get('/home.hbs',(req,res)=>{
    res.redirect('/home.hbs');
});
router.get('/index.hbs',(req,res)=>{
    res.redirect('/index.hbs');
});
router.get('/adminlogin.hbs',(req,res)=>{
    res.redirect('/adminlogin.hbs');s
});
router.get('/signup.hbs',(req,res)=>{
    res.redirect('/signup.hbs');
});
router.get('/facassign',(req,res)=>{
    res.redirect('/facassign.hbs');
});
module.exports = router;