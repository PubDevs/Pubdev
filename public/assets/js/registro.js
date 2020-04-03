document.getElementById("btnRegistrarse").addEventListener("click", function(event){
	var nombre = document.getElementById("name").value;
	var correo = document.getElementById("email").value;
	var sobreNombre = document.getElementById("subject").value;
	var contrasena1 = document.getElementById("pass1").value;
	var contrasena2 = document.getElementById("pass2").value;
	var BackEnd = document.getElementById("Back").value;
	var FrontEnd = document.getElementById("Front").value;
	if(nombre !== "" && validarEmail(correo) && sobreNombre !== "" &&  validarContrasena(contrasena1, contrasena2) && BackEnd !== "Back-end" && FrontEnd !== "Front-End"){
		var url = '/registro/form';
		var data = {username: 'example'};

		fetch(url, {
		  method: 'POST', // or 'PUT'
		  body: JSON.stringify(data), // data can be `string` or {object}!
		  headers:{
		    'Content-Type': 'application/json'
		  }
		}).then(res => res.json())
		.catch(error => console.error('Error:', error))
		.then(response => console.log('Success:', response));

	}else{
		Swal.fire({
		  icon: 'error',
		  title: 'Oops...',
		  text: 'Tus datos estan mal',
		  footer: 'Echa un vistazo a tu formulario'
		});
	}
});

function validarContrasena(pass1, pass2){
	if(pass1 !== "" && pass1 !== "" && (pass1 === pass2)){
		return true;
	}else{
		return false;
	}
}

function validarEmail(email){
  var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}

