/*document.getElementById("btnCrear").addEventListener("click", function(e){
    var datos = capturarDatos();
    console.log(datos);
    if(validarDatos(datos)){
        enviarDatos(datos)
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'datos vacios',
            footer: 'porfavor llene todos los datos'
          })
    }
    
});*/
function capturarDatos(){
    var jsonData = {
        nombre: document.getElementById("nombreEvento").value,
        img: document.getElementById("imgEvento").files[0],
        descripcion: document.getElementById("descripcionEvento").value,
        fecha: document.getElementById("fecha").value,
        hora: document.getElementById("hora").value,
        pais: document.getElementById("pais").value,
        tipoEvento: tipodeevento(),
        correoMasivos: correosmasivos()
    }
    return jsonData;

}
function tipodeevento(){
    if(document.getElementById("gridRadios1").checked){
        return "virtual";
    }else{
        return "precencial";
    }
}

function correosmasivos(){
    if(document.getElementById("gridCheck1").checked){
        return true
    }else{
        return false
    }
}

function validarDatos(datos){
        if (datos.nombre != "" && datos.img != undefined && datos.descripcion != "" && datos.fecha !="" && datos.hora !=""){
            return true
        }else{
            return false
        }
}

async function enviarDatos(data){
    return new Promise (resolver => {
        var estado;
        var url = "/admpubdevcreareventos/form";
        var metodo = "POST";
    
        fetch(url, {
            method: metodo,
            body: JSON.stringify(data), 
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => alertas(response));
    })
    

}

function alertas(estado){
    if(estado){
        Swal.fire(
            'Se creo el evento',
            'ya puedes empesar a hacer publisidad',
            'success'
          )
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'el nombre del evento ya existe',
            footer: 'coloque otro nombre we'
          })
    }
}