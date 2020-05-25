const configResource= require("../config/configResource")
const jwt = require("jsonwebtoken")

let midResource = {

    validarScript(req,res,next){
        let scripts = configResource.script
        const script=scripts.filter(function(script){
            return script.router==req.query.src
        })
        if(script.length!=0){
            req.script =script[0];
            if(req.script.auth==true){
                var token=(req.query.token!=null)?req.query.token:""
                jwt.verify(req.query.token,"obviamente lo que esta aca se cambia",function(err,decoded){ 
                    if(err){
                        res.render("../../views/403")
                    }else{
                        if(decoded.tipo="administrador"){
                            next()
                        }else{
                            res.render("../../views/403")
                        }
                    }
                })
            }else
                next()
        }else{
            res.render("../../views/404")
        }
        
    }
}



module.exports=midResource