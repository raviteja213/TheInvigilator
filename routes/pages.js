const express = require('express');
const router=express.Router();
const mysql=require("mysql");
const { route } = require('./auth');

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'facultylogin'
});

router.get('/aboutus.hbs',(req,res)=>{
    res.render('aboutus');
});
router.get('/schedule.hbs',(req,res)=>{
    res.render('schedule');
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
router.get('/adminlogout.hbs',(req,res)=>{
    res.render('adminlogout');
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
router.get('/facultyhome.hbs',(req,res)=>{
    db.query('SELECT * FROM faclog',(err,results)=>{
        db.query('SELECT notification FROM notify WHERE name=?',[results[0].name],(error,result)=>{
            res.render('facultyhome',{name:results[0].name,userid:results[0].userid,phno:results[0].phno,dept:results[0].dept,gmail:results[0].gmail,notific:result})
        });
        
    });
});
router.get('/facultylogout.hbs',(req,res)=>{
    db.query('DELETE FROM faclog',(err,results)=>{
        res.render('facultylogout')
    })
})
router.get('/facassign.hbs',(req,res)=>{
    db.query('SELECT name FROM emp',(err,results)=>{
        if(err) throw err;
        db.query('select room from facroom',(err,result)=>{
            res.render('facassign',{facname: results,user:result});
        });

    });

});
router.get('/adminfac.hbs',(req,res)=>{
    db.query('SELECT id,name,dept,phno,userid FROM emp',(err,results)=>{
        if(err) throw err;
        console.log(results);
        res.render('adminfac',{userdata: results});
    });

});
router.get('/reply.hbs',(req,res)=>{
    db.query('SELECT reason,name,shiftwith FROM query',(err,results)=>{
        if(err) throw err;
        res.render('reply',{userdata:results});
    })
})
router.get('/facedit.hbs',(req,res)=>{
    res.render('facedit');
});

router.get('/facroom.hbs',(req,res)=>{
    db.query('SELECT name FROM emp',(err,results)=>{
        if(err) throw err;
        res.render('facroom',{userdata:results});

    });
    
})

router.get('/sheduleexam.hbs',(req,res)=>{
    res.render('sheduleexam');
});
router.get('/shedulestudent.hbs',(req,res)=>{
    res.render('shedulestudent');
});

router.get('/showsh.hbs',(req,res)=>{
    db.query('SELECT * FROM faclog',(err,results)=>{
        const name1=results[0].name;
        console.log(name1)
        db.query('SELECT room,date FROM schedule WHERE name=?',[name1],(error,result)=>{
            console.log(result);
            db.query('SELECT id,name FROM studentdb WHERE room=? and date=?',[result[0].room,result[0].date],(err,result1)=>{
                
                res.render('showsh',{roomno:result[0].room,datee:result[0].date,student:result1});
            })
            
        });
    });
});

router.get('/showtt.hbs',(req,res)=>{
    db.query('SELECT * FROM faclog',(err,result)=>{
        const dept1=result[0].dept;
        const name1=result[0].name;
        console.log(dept1);
        if(dept1=="CSE"){
            
            db.query('SELECT * FROM cse',(err,results)=>{
                if(err) throw err;
                
                res.render('showtt',{userdata: results,dept:"COMPUTER SCIENCE"});
            });

        }
        if(dept1=="ECE"){
            db.query('SELECT * FROM ece',(err,results)=>{
                if(err) throw err;
            
                res.render('showtt',{userdata: results,dept:"ECE"});
                                  
            });

        }
        if(dept1=="MEC"){
            db.query('SELECT * FROM mec',(err,results)=>{
                if(err) throw err;
               
                res.render('showtt',{userdata: results,dept:"MECHANICAL"});
                                  
                
            });

        }
        if(dept1=="AERO"){
            db.query('SELECT * FROM aero',(err,results)=>{
                if(err) throw err;
        
                res.render('showtt',{userdata: results,dept:"AERONATICAL"});
                         
                
            });

        }
        if(dept1=="CIVIL"){
            db.query('SELECT * FROM civil',(err,results)=>{
                if(err) throw err;
              
                res.render('showtt',{userdata: results,dept:"CIVIL"});
                                 

            });

        }
    });
});


module.exports = router;