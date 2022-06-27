let category = document.querySelector("#category");
let services = document.querySelector("#services-container");

if (category.options[category.selectedIndex].id === "activity")
	services.classList.add("hidden");

category.addEventListener("change", (e) => {
	if (e.target.options[e.target.selectedIndex].id === "activity") {
		services.classList.add("hidden");
	} else services.classList.remove("hidden");
});
