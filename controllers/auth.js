const mysql=require("mysql");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');


const db=mysql.createPool({
    host:'remotemysql.com',
    user:'2xWjKb5kFv',
    password:'C1ZIs5MuZz',
    database:'2xWjKb5kFv'
});

const db1=mysql.createPool({
    host:'remotemysql.com',
    user:'t3b3MlWj8Z',
    password:'DVhBKljPiq',
    database:'t3b3MlWj8Z'
});

exports.notify=(req,res)=>{
    console.log(req.body);
    db.query('INSERT INTO notify SET ?',{name:req.body.name,notification:req.body.notify},(err,result)=>{
        res.redirect('/schedule.hbs');
    });
}

exports.edit=(req,res)=>{
    console.log(req.body);
    const{gmail,password,phno2}=req.body;
    db.query('SELECT * FROM faclog',async(error,results)=>{
        const name1=results[0].name
        let hashedpassword=await bcrypt.hash(password,8);
        console.log(hashedpassword);
        console.log(name1);
    db.query('UPDATE emp SET userid=? WHERE name=?',[gmail,name1],(error,result)=>{
        console.log(result)
        
    });
    db.query('UPDATE emp SET phno=? WHERE name=?',[phno2,name1],(error,result)=>{
        console.log(result)
        
    });
    return res.render('facedit');
    });
    
    

}
exports.replyto=(req,res)=>{
    console.log(req.body);
    db.query('UPDATE query SET reply=? WHERE name=?',[req.body.replyis,req.body.replyto],(err,result)=>{
        if(err) throw err;
        res.redirect('/reply.hbs');
    });
}

exports.facroom=(req,res)=>{
    console.log(req.body);
    db.query('INSERT INTO schedule SET ?',{room:req.body.room,name:req.body.faculty,date:req.body.date},(err,result)=>{
        if(err) throw err;
        db.query('SELECT name FROM emp WHERE role="CI"',(err,results)=>{
        if(err) throw err;
        res.render('facroom',{userdata:results,message:"Sucessfully Assigned"});

    });
       
    });
    
}

exports.query=(req,res)=>{
    console.log(req.body);
    let problemq=req.body.problem;
    let nameq=req.body.swap;
    db.query('SELECT * FROM faclog',(err,result)=>{
        console.log(result.name);
        const fname=result[0].name;
        db.query('INSERT INTO query SET ?',{ reason: problemq,name:fname,shiftwith:nameq,reply:'-'},(error,results)=>{
            if(error){
                console.log(error)
            }
    })
    


    })
    return res.redirect('/facultyhome.hbs')
}

exports.signup=(req,res)=>{
    console.log(req.body);

    const{id,phno,email,password,passwordconfirm}=req.body;
    if(id==''|email==''|phno==''|password==''|passwordconfirm==''){
        return res.render("signup",{
            message: 'Enter values in all fields'
        });
    }
    db.query('SELECT userid FROM faculty WHERE userid= ?',[email],async (error,results)=>{
        if(error){
            console.log(error);
        }
        if(results.length>0){
            return res.render("signup",{
                message: 'That email is already in use'
            });
        }else if(password!==passwordconfirm){
            return res.render('signup',{
                message:'Passwords do not match'
            });
        }else if(phno.length!==10){
            return res.render('signup',{
                message:'phno length should be 10'
            });
        }
        let hashedpassword=await bcrypt.hash(password,8);
        console.log(hashedpassword);

        db.query('INSERT INTO faculty SET ?',{ name: id,phno:phno,userid:email,password:hashedpassword},(error,results)=>{
            if(error){
                console.log(error);
            }
            else{
                return res.render('signup',{
                    message:'User Registered'
                });

            }
        });

    });

}

exports.adminca=async(req,res)=>{
    try{
        const role=req.body.role;
        console.log(role);
        if(role=="none"){
            res.render('adminca');
        }
        if(role=="CI"){
            db.query('SELECT * FROM emp WHERE role="CI" ',(err,results)=>{
                if(err) throw err;
                
                res.render('adminca',{userdata: results});
            });

        }
        if(role=="AF"){
            db.query('SELECT * FROM emp WHERE role="AF" ',(err,results)=>{
                if(err) throw err;
                
                res.render('adminca',{userdata: results});
            });

        }

    }
    catch (error) {
        console.log(error);
    }
}
exports.student=async(req,res)=>{
    console.log(req.body);
    db.query('INSERT INTO studentdb SET ?',{id:req.body.id,name:req.body.name,room:req.body.room,date:req.body.date},(err,result)=>{
        return res.render('shedulestudent',{message:'Sucessfully Added'});
    });
    
}
exports.exam=async(req,res)=>{
    console.log(req.body);
    try{
        const dept=req.body.dept;
        if(dept=="none"){
            res.render('sheduleexam');
        }
        
        if(dept=="cse"){
            db.query('INSERT INTO cse SET ?',{date:req.body.date,subid:req.body.subid,sub:req.body.sub,slot:req.body.slot},(err,results)=>{
                return res.render('sheduleexam');
            })
        }
        if(dept=="ece"){
            db.query('INSERT INTO ece SET ?',{date:req.body.date,subid:req.body.subid,sub:req.body.sub,slot:req.body.slot},(err,results)=>{
                return res.render('sheduleexam');
            })
        }
        if(dept=="civil"){
            db.query('INSERT INTO civil SET ?',{date:req.body.date,subid:req.body.subid,sub:req.body.sub,slot:req.body.slot},(err,results)=>{
                return res.render('sheduleexam');
            })
        }
        if(dept=="mech"){
            db.query('INSERT INTO mec SET ?',{date:req.body.date,subid:req.body.subid,sub:req.body.sub,slot:req.body.slot},(err,results)=>{
                return res.render('sheduleexam');
            })
        }
        if(dept=="aero"){
            db.query('INSERT INTO aero SET ?',{date:req.body.date,subid:req.body.subid,sub:req.body.sub,slot:req.body.slot},(err,results)=>{
                return res.render('sheduleexam');
            })
        }
    }
    catch(error){
        console.log(error);
    }
    
}
exports.timetable=async(req,res)=>{
    try{
        const dept=req.body.dept;
        console.log(dept);
        if(dept=="none"){
            res.render('timetab');
        }
        if(dept=="CSE"){
            db.query('SELECT * FROM cse',(err,results)=>{
                if(err) throw err;
                db.query('select cse from rooms',(err,result)=>{
                res.render('timetab',{userdata: results,dept:"COMPUTER SCIENCE",user:result});
                })
                
            });

        }
        if(dept=="ECE"){
            db.query('SELECT * FROM ece',(err,results)=>{
                if(err) throw err;
                db.query('select ece from rooms',(err,result)=>{
                    res.render('timetab',{userdata: results,dept:"ECE", user:result});
                    })                
            });

        }
        if(dept=="MEC"){
            db.query('SELECT * FROM mec',(err,results)=>{
                if(err) throw err;
                db.query('select mec from rooms',(err,result)=>{
                    res.render('timetab',{userdata: results,dept:"MECHANICAL", user:result});
                    })                
                
            });

        }
        if(dept=="AERO"){
            db.query('SELECT * FROM aero',(err,results)=>{
                if(err) throw err;
                db.query('select aero from rooms',(err,result)=>{
                    res.render('timetab',{userdata: results,dept:"AERONATICAL", user:result});
                    })                 
                
            });

        }
        if(dept=="CIVIL"){
            db.query('SELECT * FROM civil',(err,results)=>{
                if(err) throw err;
                db.query('select civil from rooms',(err,result)=>{
                    res.render('timetab',{userdata: results,dept:"CIVIL", user:result});
                    })                

            });

        }
    }
    catch (error) {
        console.log(error);
    }
}

exports.login=async(req,res)=>{
    try {

        const{id,password}=req.body;
        
        if(!id || !password){
            return res.status(400).render('index',{
                message:'Enter ID and Password'
            });
        }  

        db.query('SELECT * FROM faculty WHERE name= ?',[id],async(error,results)=>{
            
            if(results.length>0){
                if(!(await bcrypt.compare(password,results[0].password))){

                    return res.status(401).render('index',{
                        message:'ID or Password is invalid'
                    });
                }else {
                    db.query('SELECT * FROM emp Where name=?',[id],async(error,result)=>{
                        console.log(result[0].role)
                        db.query('INSERT INTO faclog SET ?',{ name: result[0].name,phno:result[0].phno,userid:result[0].id,gmail:result[0].userid,dept:result[0].dept})
                    })
                    res.status(200).redirect('/facultyhome.hbs');
                    }
            }
            else{
                

                return res.status(401).render('index',{
                    message:'ID or Password is invalid'
                });
            }
        });

    } catch (error) {
        console.log(error);
    }

}

exports.fac=async(req,res)=>{
    try{
        const Name=req.body.name;
        const Role=req.body.role;
        if(Role=='none'){
            db.query('SELECT name FROM emp',(err,results)=>{
                if(err) throw err;
                
                    res.render('facassign',{facname: results, suc1:"Assign a role"});

            });
        }
        if(Name=='none'){
            
            db.query('SELECT name FROM emp',(err,results)=>{
                if(err) throw err;
                
                    res.render('facassign',{facname: results, suc1:"Assign a faculty"});

            });
        }
        else{
        if(Role=="CI"){
            
           
            db.query('UPDATE emp SET role="CI" where name=?',[Name],(err,results)=>{
                if(err) throw err;
                
            });
            db.query('SELECT name FROM emp',(err,results)=>{
                if(err) throw err;
                
                    res.render('facassign',{facname: results, suc:"SUCESSFULLY CHANGED"});

            });
        }
        
        if(Role=="AF"){
            db.query('UPDATE emp SET role="AF" where name=?',[Name],(err,results)=>{
                if(err) throw err;
                
            });
            db.query('SELECT name FROM emp',(err,results)=>{
                if(err) throw err;
               
                    res.render('facassign',{facname: results, suc:"SUCESSFULLY CHANGED"});
                
            });
        }
    }

    }
    catch (error) {
        console.log(error);
    }

}

exports.adminlogin=async(req,res)=>{
    try {

        const{id,password}=req.body;
        
        if(!id || !password){
            return res.status(400).render('adminlogin',{
                message:'Enter ID and Password'
            });
        }  

        db1.query('SELECT * FROM admin WHERE name= ?',[id],async(error,results)=>{
            
            if(results.length>0){
                if(!(results[0].password==password)){

                    return res.status(401).render('adminlogin',{
                        message:'ID or Password is invalid'
                    });
                }else {
                    res.status(200).redirect('/admin.hbs');
                    }
            }
            else{

                return res.status(401).render('adminlogin',{
                    message:'ID or Password is invalid'
                });
            }
        });

    } catch (error) {
        console.log(error);
    }

}

