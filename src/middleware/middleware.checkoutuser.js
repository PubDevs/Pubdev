<<<<<<< HEAD
const checkoutUser={
    isAdmin(req, res, next){
        if(req.session.user != undefined){
            if(req.session.user.tipo=="administrador")
                next();
            else
                res.redirect("/sudo/login")
=======

const jwt = require("jsonwebtoken")
const checkoutUser={
    isAdmin(req, res, next){           
        if(req.session.user != undefined){
            jwt.verify(req.session.user,"obviamente lo que esta aca se cambia",function(err,decoded){
                if(err){
                    res.redirect("/sudo/login")
                }else{
                    if(decoded.tipo=="administrador")
                        next();
                    else
                        res.redirect("/sudo/login")
                }            
            })
>>>>>>> upstream/master
        }else{
            res.redirect("/sudo/login")
        }
    },
    isUser(req, res, next){

    }
}



module.exports= checkoutUser