const checkoutUser={
    isAdmin(req, res, next){
        if(req.session.user != undefined){
            if(req.session.user.tipo=="administrador")
                next();
            else
                res.redirect("/sudo/login")
        }else{
            res.redirect("/sudo/login")
        }
    },
    isUser(req, res, next){

    }
}



module.exports= checkoutUser