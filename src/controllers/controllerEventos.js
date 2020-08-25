const controllerEvento={}



controllerEvento.renderEventosPage = async (req, res) => {
    const data=await this.db.firestore().collection("Cuentas").get();
    console.log(data.size)
    res.render("../../views/eventos",{cantidad:data.size})
}

controllerEvento.guardarDb = (db)=>{
	this.db=db
} 



module.exports=controllerEvento