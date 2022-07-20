async function checkIfEmailExists() {
	let body = JSON.stringify({ email: email.value });
	let response = await fetch("/users/check-email", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: body,
	});
	let { emailExists } = await response.json();
	return emailExists;
}

const validFileTypes = ["image/jpeg", "image/png", "image/jpg", "image/gif"];
function checkImage(imageInput, imageErrors) {
	if (imageInput.files.length > 0) {
		if (validFileTypes.includes(imageInput.files[0].type)) {
			imageInput.classList.remove("input-error");
			imageInput.classList.add("input-valid");
			imageErrors.innerHTML = "";
			return true;
		} else {
			imageInput.classList.remove("input-valid");
			imageInput.classList.add("input-error");
			imageErrors.innerHTML =
				"<li>El formato de la imagen es invalido, los tipos permitidos son (JPG, JPEG, PNG, GIF)</li>";
			return false;
		}
	}
	return true;
}

export { checkIfEmailExists, checkImage };
