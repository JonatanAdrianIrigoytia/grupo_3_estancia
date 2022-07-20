import { checkImage } from "./util.js";

window.addEventListener("load", () => {
	let form = document.querySelector("#productForm");

	let name = document.getElementById("name");
	let description = document.getElementById("description");
	let image = document.getElementById("image");

	let nameErrors = document.getElementById("nameErrors");
	let descriptionErrors = document.getElementById("descriptionErrors");
	let imageErrors = document.getElementById("imageErrors");

	function checkName() {
		if (name.value.length >= 5) {
			name.classList.remove("input-error");
			name.classList.add("input-valid");
			nameErrors.innerHTML = "";
			return true;
		} else {
			name.classList.remove("input-valid");
			name.classList.add("input-error");
			nameErrors.innerHTML = "<li>El nombre debe tener 5 caracteres o mas</li>";
			return false;
		}
	}
	function checkDescription() {
		if (description.value.length >= 20) {
			description.classList.remove("input-error");
			description.classList.add("input-valid");
			descriptionErrors.innerHTML = "";
			return true;
		} else {
			description.classList.remove("input-valid");
			description.classList.add("input-error");
			descriptionErrors.innerHTML =
				"<li>La descripcion debe tener 20 caracteres o mas</li>";
			return false;
		}
	}

	name.oninput = () => {
		checkName();
	};

	description.oninput = () => {
		checkDescription();
	};

	image.onchange = () => {
		checkImage(image, imageErrors);
	};

	form.onsubmit = (event) => {
		event.preventDefault();
		if (checkName() && checkDescription() && checkImage(image, imageErrors)) {
			form.submit();
		}
	};
});
