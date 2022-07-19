import { checkIfEmailExists } from "./util.js";
window.addEventListener("load", function () {
	const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	let form = document.querySelector("#registerForm");
	//Campos

	let email = document.getElementById("email");
	let password = document.getElementById("password");

	//Errores

	let emailErrors = document.getElementById("emailErrors");

	//Errores de contraseña
	let passwordErrors = document.getElementById("passwordErrors");

	function checkEmail() {
		if (email.value.length >= 2 && email.value.match(emailFormat)) {
			email.classList.remove("input-error");
			email.classList.add("input-valid");
			emailErrors.innerHTML = "";
			return true;
		} else {
			email.classList.remove("input-valid");
			email.classList.add("input-error");
			emailErrors.innerHTML = "<li>El formato del email es invalido</li>";
			return false;
		}
	}
	function checkPassword() {
		if (password.value.length >= 8) {
			password.classList.add("input-valid");
			password.classList.remove("input-error");
			return true;
		} else {
			password.classList.remove("input-valid");
			password.classList.add("input-error");
			passwordErrors.innerHTML = "<li>Debe ingresar una contraseña</li>";
			return false;
		}
	}
	email.oninput = () => {
		checkEmail();
	};

	password.onfocus = () => {
		checkPassword();
	};
	form.onsubmit = async (event) => {
		event.preventDefault();
		let emailExists = await checkIfEmailExists();
		if (emailExists) {
			if (!emailErrors.innerHTML.includes("<li>El email no existe</li>"))
				emailErrors.innerHTML += "<li>El email no existe</li>";
			email.classList.remove("input-valid");
			email.classList.add("input-error");
		}
		if (checkEmail() && !emailExists && checkPassword()) {
			form.submit();
		}
	};
});
