const controllerEvento={}


controllerEvento.renderEventoPage =async (req, res) => {

    res.render("../../views/generic")
}

controllerEvento.guardarDb = (db)=>{
	this.db=db
} 

module.exports=controllerEvento