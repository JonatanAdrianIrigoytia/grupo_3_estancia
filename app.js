const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.resolve(__dirname, "public")));

app.set("view engine", "ejs"); //Preparando el projecto para usar EJS.

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

app.get("/productCart", (req, res) =>
	res.sendFile(path.resolve(__dirname, "views/productCart.html")),
);

app.get("/productDetail", (req, res) =>
	res.sendFile(path.resolve(__dirname, "views/productDetail.html")),
);
