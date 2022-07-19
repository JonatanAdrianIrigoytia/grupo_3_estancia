import { checkIfEmailExists } from "./util.js";
window.addEventListener("load", function () {
	const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	const lowerCase = /[a-z]/g;
	const upperCase = /[A-Z]/g;
	const number = /[0-9]/g;
	const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;
	const validFileTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];

	let form = document.querySelector("#registerForm");
	//Campos
	
	let email = document.getElementById("email");
	let password = document.getElementById("password");
	
	//Errores
	
	let emailErrors = document.getElementById("emailErrors");

	//Errores de contraseña
	let passwordErrors = document.getElementById("passwordErrors");
	let lowerCaseError = document.getElementById("lowerCaseError");
	let upperCaseError = document.getElementById("upperCaseError");
	let numberError = document.getElementById("numberError");
	let symbolError = document.getElementById("symbolError");
	let lengthError = document.getElementById("lengthError");

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
		if (password.value.match(lowerCase)) {
			lowerCaseError.classList.remove("invalid");
			lowerCaseError.classList.add("valid");
			passwordErrorArray[0] = false;
		} else {
			lowerCaseError.classList.remove("valid");
			lowerCaseError.classList.add("invalid");
			passwordErrorArray[0] = true;
		}
		if (password.value.match(upperCase)) {
			upperCaseError.classList.remove("invalid");
			upperCaseError.classList.add("valid");
			passwordErrorArray[1] = false;
		} else {
			upperCaseError.classList.remove("valid");
			upperCaseError.classList.add("invalid");
			passwordErrorArray[1] = true;
		}
		if (password.value.match(number)) {
			numberError.classList.remove("invalid");
			numberError.classList.add("valid");
			passwordErrorArray[2] = false;
		} else {
			numberError.classList.remove("valid");
			numberError.classList.add("invalid");
			passwordErrorArray[2] = true;
		}
		if (password.value.match(specialChar)) {
			symbolError.classList.remove("invalid");
			symbolError.classList.add("valid");
			passwordErrorArray[3] = false;
		} else {
			symbolError.classList.remove("valid");
			symbolError.classList.add("invalid");
			passwordErrorArray[3] = true;
		}
		if (password.value.length >= 8) {
			lengthError.classList.remove("invalid");
			lengthError.classList.add("valid");
			passwordErrorArray[4] = false;
		} else {
			lengthError.classList.remove("valid");
			lengthError.classList.add("invalid");
			passwordErrorArray[4] = true;
		}

		if (passwordErrorArray.every((predicate) => predicate === false)) {
			password.classList.add("input-valid");
			password.classList.remove("input-error");
			passwordErrors.classList.add("hidden");
			return true;
		} else {
			password.classList.remove("input-valid");
			password.classList.add("input-error");
			passwordErrors.classList.remove("hidden");
			return false;
		}
	}
    email.oninput = () => {
		checkEmail();
	};

	password.onfocus = () => {
		if (!passwordErrorArray.every((predicate) => predicate === false)) {
			checkPassword();
			passwordErrors.classList.remove("hidden");
		}
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
        if (
			
			checkEmail() &&
			!emailExists &&
			checkPassword()
			
		) {
			form.submit();
		}
	};
});
