// Get all the tabs
const tabs = document.querySelectorAll(".tab");

tabs.forEach((clickedTab) => {
	// Add onClick event listener on each tab
	clickedTab.addEventListener("click", () => {
		console.log(clickedTab);
		tabs.forEach((tab) => {
			if (clickedTab.parentNode.parentNode == tab.parentNode.parentNode)
				tab.classList.remove("active");
		});

		// Add the active class on the clicked tab
		clickedTab.classList.add("active");
		//Ocultar habitaciones cuando la tab de
		//actividades este activa y viceversa
		if (clickedTab.id == "activitiestab") {
			activities = document.querySelector("#activities");
			activities.classList.remove("hidden");
			rooms = document.querySelector("#rooms");
			rooms.classList.add("hidden");
		} else if (clickedTab.id == "roomstab") {
			activities = document.querySelector("#activities");
			activities.classList.add("hidden");
			rooms = document.querySelector("#rooms");
			rooms.classList.remove("hidden");
		}
	});
});

const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".nav");
const closeMenu = document.querySelector(".close-menu");

menuBtn.addEventListener("click", () => {
	menu.classList.toggle("show");
});

closeMenu.addEventListener("click", () => {
	console.log("close");
	menu.classList.remove("show");
});
