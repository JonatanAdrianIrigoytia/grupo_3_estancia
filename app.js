const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.resolve(__dirname, "public")));

app.listen(3000, () => console.log("Corriendo en http://localhost:3000"));

app.get("/", (req, res) =>
	res.sendFile(path.resolve(__dirname, "views/index.html")),
);

app.get("/login", (req, res) =>
	res.sendFile(path.resolve(__dirname, "views/login.html")),
);

app.get("/register", (req, res) =>
	res.sendFile(path.resolve(__dirname, "views/register.html")),
);
