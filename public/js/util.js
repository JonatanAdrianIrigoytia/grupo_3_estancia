export async function checkIfEmailExists() {
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
