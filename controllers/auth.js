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