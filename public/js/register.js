window.addEventListener("load", function () {
	const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	const lowerCase = /[a-z]/g;
	const upperCase = /[A-Z]/g;
	const number = /[0-9]/g;
	const specialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g;

	//Campos
	let passwordErrorArray = [true, true, true, true, true];
	let confirmPasswordErrorArray = [true, true, true, true, true];
	let firstName = document.getElementById("firstName");
	let lastName = document.getElementById("lastName");
	let email = document.getElementById("email");
	let password = document.getElementById("password");
	let confirmPassword = document.getElementById("confirmPassword");
	let image = document.getElementById("image");

	//Errores
	let firstNameErrors = document.getElementById("firstNameErrors");
	let lastNameErrors = document.getElementById("lastNameErrors");
	let emailErrors = document.getElementById("emailErrors");

	//Errores de contraseña
	let passwordErrors = document.getElementById("passwordErrors");
	let lowerCaseError = document.getElementById("lowerCaseError");
	let upperCaseError = document.getElementById("upperCaseError");
	let numberError = document.getElementById("numberError");
	let symbolError = document.getElementById("symbolError");
	let lengthError = document.getElementById("lengthError");

	//Errores de confirmación de contraseña
	let confirmPasswordErrors = document.getElementById("confirmPasswordErrors");
	let lowerCaseError2 = document.getElementById("lowerCaseError2");
	let upperCaseError2 = document.getElementById("upperCaseError2");
	let numberError2 = document.getElementById("numberError2");
	let symbolError2 = document.getElementById("symbolError2");
	let lengthError2 = document.getElementById("lengthError2");

	let imageErrors = document.getElementById("imageErrors");

	firstName.oninput = () => {
		if (firstName.value.length >= 2) {
			firstName.classList.remove("input-error");
			firstName.classList.add("input-valid");
			firstNameErrors.innerHTML = "";
		} else {
			firstName.classList.remove("input-valid");
			firstName.classList.add("input-error");
			firstNameErrors.innerHTML +=
				"<li>El nombre debe tener 2 caracteres o mas</li>";
		}
	};

	lastName.oninput = () => {
		if (lastName.value.length >= 2) {
			lastName.classList.remove("input-error");
			lastName.classList.add("input-valid");
			lastNameErrors.innerHTML = "";
		} else {
			lastName.classList.remove("input-valid");
			lastName.classList.add("input-error");
			lastNameErrors.innerHTML +=
				"<li>El apellido debe tener 2 caracteres o mas</li>";
		}
	};

	email.oninput = () => {
		if (email.value.length >= 2 && email.value.match(emailFormat)) {
			email.classList.remove("input-error");
			email.classList.add("input-valid");
			emailErrors.innerHTML = "";
		} else {
			email.classList.remove("input-valid");
			email.classList.add("input-error");
			emailErrors.innerHTML += "<li>El formato del email es invalido</li>";
		}
	};

	password.onfocus = () => {
		if (!passwordErrorArray.every((predicate) => predicate === false)) {
			checkPassword();
			passwordErrors.classList.remove("hidden");
		}
	};
	password.onblur = () => {
		passwordErrors.classList.add("hidden");
		checkPassword();
	};

	password.oninput = () => {
		checkPassword();
	};

	confirmPassword.onfocus = () => {
		if (!confirmPasswordErrorArray.every((predicate) => predicate === false)) {
			checkPassword2();
			confirmPasswordErrors.classList.remove("hidden");
		}
	};
	confirmPassword.onblur = () => {
		confirmPasswordErrors.classList.add("hidden");
		checkPassword2();
	};

	confirmPassword.oninput = () => {
		checkPassword2();
	};

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
		} else {
			password.classList.remove("input-valid");
			password.classList.add("input-error");
			passwordErrors.classList.remove("hidden");
		}
	}

	function checkPassword2() {
		if (confirmPassword.value.match(lowerCase)) {
			lowerCaseError2.classList.remove("invalid");
			lowerCaseError2.classList.add("valid");
			confirmPasswordErrorArray[0] = false;
		} else {
			lowerCaseError2.classList.remove("valid");
			lowerCaseError2.classList.add("invalid");
			confirmPasswordErrorArray[0] = true;
		}
		if (confirmPassword.value.match(upperCase)) {
			upperCaseError2.classList.remove("invalid");
			upperCaseError2.classList.add("valid");
			confirmPasswordErrorArray[1] = false;
		} else {
			upperCaseError2.classList.remove("valid");
			upperCaseError2.classList.add("invalid");
			confirmPasswordErrorArray[1] = true;
		}
		if (confirmPassword.value.match(number)) {
			numberError2.classList.remove("invalid");
			numberError2.classList.add("valid");
			confirmPasswordErrorArray[2] = false;
		} else {
			numberError2.classList.remove("valid");
			numberError2.classList.add("invalid");
			confirmPasswordErrorArray[2] = true;
		}
		if (confirmPassword.value.match(specialChar)) {
			symbolError2.classList.remove("invalid");
			symbolError2.classList.add("valid");
			confirmPasswordErrorArray[3] = false;
		} else {
			symbolError2.classList.remove("valid");
			symbolError2.classList.add("invalid");
			confirmPasswordErrorArray[3] = true;
		}
		if (confirmPassword.value.length >= 8) {
			lengthError2.classList.remove("invalid");
			lengthError2.classList.add("valid");
			confirmPasswordErrorArray[4] = false;
		} else {
			lengthError2.classList.remove("valid");
			lengthError2.classList.add("invalid");
			confirmPasswordErrorArray[4] = true;
		}

		if (confirmPasswordErrorArray.every((predicate) => predicate === false)) {
			confirmPassword.classList.add("input-valid");
			confirmPassword.classList.remove("input-error");
			confirmPasswordErrors.classList.add("hidden");
		} else {
			confirmPassword.classList.remove("input-valid");
			confirmPassword.classList.add("input-error");
			confirmPasswordErrors.classList.remove("hidden");
		}
	}
});
