const express = require('express');
const router=express.Router();
const authController = require('../controllers/auth');

router.post('/signup',authController.signup);
router.post('/index',authController.login);
router.post('/adminlogin',authController.adminlogin);
router.post('/timetable',authController.timetable);
router.post('/adminca',authController.adminca);
router.post('/facassign',authController.fac);
router.post('/edit',authController.edit);
router.post('/query',authController.query);
router.post('/exam',authController.exam);
router.post('/student',authController.student);
router.post('/reply',authController.replyto);
router.post('/facroom',authController.facroom);
router.post('/notify',authController.notify);

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
router.get('/admin.hbs',(req,res)=>{
    res.redirect('/admin.hbs');
});
router.get('/facassign.hbs',(req,res)=>{
    res.redirect('/facassign.hbs');
});
router.get('/facedit.hbs',(req,res)=>{
    res.redirect('/facedit.hbs');
});


module.exports = router;