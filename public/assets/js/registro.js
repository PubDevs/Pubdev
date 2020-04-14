document.getElementById("btnRegistrarse").addEventListener("click", function(event){
	var nombre = document.getElementById("name").value;
	var correo = document.getElementById("email").value;
	var sobreNombre = document.getElementById("subject").value;
	var contrasena1 = document.getElementById("pass1").value;
	var contrasena2 = document.getElementById("pass2").value;
	var BackEnd = document.getElementById("Back").value;
	var FrontEnd = document.getElementById("Front").value;
	var foto = document.getElementById("foto");
	if(nombre !== "" && validarEmail(correo) && sobreNombre !== "" &&  validarContrasena(contrasena1, contrasena2) && BackEnd !== "Back-end" && FrontEnd !== "Front-End"){
		var url = '/registro/form';
		
		var data = {
			img: foto.files[0],
			nombre: nombre,
			correo: correo,
			sobreNombre: sobreNombre,
			contrasena1: contrasena1,
			contrasena2: contrasena2,
			BackEnd: BackEnd,
			FrontEnd: FrontEnd
		};

		fetch(url, {
		  method: 'POST',
		  body: JSON.stringify(data), 
		  headers:{
		    'Content-Type': 'application/json'
		  }
		}).then(res => res.json())
		.catch(error => console.error('Error:', error))
		.then(response => alertas(response));
		

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

function alertas(estado){
	if(estado){
		Swal.fire(
			'Te acabas de registrar a pubdev!',
			'Felicitaciones ya eres un miembro mas',
			'success'
		  )
	}else{
		Swal.fire({
			icon: 'error',
			title: 'Oops...',
			text: 'No te pudiste registrar a pubdev',
			footer: 'quisas ya tiene una cuenta <a href>verifica</a>'
		  })
	}
}

