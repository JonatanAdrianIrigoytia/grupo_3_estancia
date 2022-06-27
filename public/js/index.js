window.onload = function () {
	const menuBtn = document.querySelector(".menu-btn");
	const menu = document.querySelector(".nav");
	const closeMenu = document.querySelector(".close-menu");

	//Agrega la clase show al menu cuando haces click en el icono
	menuBtn.addEventListener("click", () => {
		menu.classList.toggle("show");
	});

	//Elimina la clase show al menu cuando haces click en el icono de cerrar
	closeMenu.addEventListener("click", () => {
		menu.classList.remove("show");
	});

	//Permite cerrar el menu cuando haces click fuera del mismo
	window.addEventListener("click", (e) => {
		if (
			!menu.contains(e.target) &&
			!menuBtn.contains(e.target) &&
			menu.classList.contains("show")
		) {
			menu.classList.remove("show");
		}
	});

	const options = document.querySelectorAll(".option");
	function select(e, room) {
		console.log(room);
		options.forEach((option) => {
			option.classList.remove("selected-option");
		});
		e.classList.add("selected-option");
	}

	const tabs = document.querySelectorAll(".tab");
	const activities = document.querySelector("#activities");
	const rooms = document.querySelector("#rooms");
	let directions = document.querySelector(".directions");
	function tabclick(e) {
		switch (e.id) {
			case "activitiestab":
				let roomsTab = document.querySelector("#roomstab");
				roomsTab.classList.remove("active");
				e.classList.add("active");
				activities.classList.remove("hidden");
				console.log(activities);
				rooms.classList.add("hidden");
				break;
			case "roomstab":
				let activitiestab = document.querySelector("#activitiestab");
				activitiestab.classList.remove("active");
				e.classList.add("active");
				rooms.classList.remove("hidden");
				activities.classList.add("hidden");
				break;
			case "airporttab":
				let cabatab = document.querySelector("#cabatab");
				cabatab.classList.remove("active");
				e.classList.add("active");
				directions.innerHTML = "Desde el aerpuerto";
				break;
			case "cabatab":
				let airporttab = document.querySelector("#airporttab");
				airporttab.classList.remove("active");
				e.classList.add("active");
				directions.innerHTML = "Desde el CABA";
				break;
		}
	}
};
