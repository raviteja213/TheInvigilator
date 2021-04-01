const mysql=require("mysql");
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');


const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'facultylogin'
});

const db1=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'adminlogin'
});
exports.signup=(req,res)=>{
    console.log(req.body);

    const{id,phno,email,password,passwordconfirm}=req.body;
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
                
                res.render('timetab',{userdata: results});
            });

        }
        if(dept=="ECE"){
            db.query('SELECT * FROM ece',(err,results)=>{
                if(err) throw err;
                
                res.render('timetab',{userdata: results});
            });

        }
        if(dept=="MEC"){
            db.query('SELECT * FROM mec',(err,results)=>{
                if(err) throw err;
                
                res.render('timetab',{userdata: results});
            });

        }
        if(dept=="AERO"){
            db.query('SELECT * FROM aero',(err,results)=>{
                if(err) throw err;
                
                res.render('timetab',{userdata: results});
            });

        }
        if(dept=="CIVIL"){
            db.query('SELECT * FROM civil',(err,results)=>{
                if(err) throw err;
                
                res.render('timetab',{userdata: results});
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
            
            if(resulhts.length>0){
                if(!(await bcrypt.compare(password,results[0].password))){

                    return res.status(401).render('index',{
                        message:'ID or Password is invalid'
                    });
                }else {
                    res.status(200).redirect('/');
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
        if(Role=="CI"){
        db.query('UPDATE emp SET role="CI" where name=?',[Name],(err,results)=>{
                if(err) throw err;
                console.log(results);
                res.render('facassign',{userdata: 'SUccessfully changed'});
            });
        }
        if(Role=="AF"){
            db.query('UPDATE emp SET role="AF" where name=?',[Name],(err,results)=>{
                if(err) throw err;
                console.log(results);
                res.render('facassign',{userdata: 'SUccessfully changed'});
            });
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