traerTodosLosUsuarios();
function traerTodosLosUsuarios(){
    fechTraerUsuarios();
}
function fechTraerUsuarios(){
    var estado;
        var url = "/sudo/ver-usuarios/traer";
        var metodo = "get";
    
        fetch(url, {
            method: metodo,
            headers:{
              'Content-Type': 'application/json'
            }
          }).then(res => res.json())
          .catch(error => console.error('Error:', error))
          .then(response => imprimirUsuarios(response));
}
function imprimirUsuarios(datos){
var string = ``;
for (var key in datos){
    string += `<tr>   
    <th>${datos[key].correo}</th>
    <td>${datos[key].nombre}</td>
    <td>${datos[key].sobrenombre}</td>
    <td><img style= "width: 100px; height:100px; src="${datos[key].imgperfil}" alt="" ></td>
    </tr>`;
}
document.getElementById("tableusuar").innerHTML = string;
}