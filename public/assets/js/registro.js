/*document.getElementById("btnRegistrarse").addEventListener("click", function(event){
	
	var foto = document.getElementById("fileup");

	var form = new FormData(document.getElementById("formulario"));
	form.append("foto", foto.files[0]);
	console.log(form)
	if(form.get("nombre") !== "" && validarEmail(form.get("correo")) && form.get("sobreNombre") !== "" &&  validarContrasena(form.get("contrasena1"), form.get("contrasena2")) && form.get("BackEnd") !== "Back-end" && form.get("FrontEnd") !== "Front-End"){
		var url = '/registro/form';
		fetch(url, {
		  method: 'POST',
		  body: form, 
		  headers: {
			  "content-type": "multipart/form-data"
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
});*/

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

