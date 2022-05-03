const express = require("express");
const app = express();
const path = require("path");
const mainRouter = require("./routes/mainRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const methodOverride = require("method-override");

app.use(express.static(path.resolve(__dirname, "../public")));
app.set("view engine", "ejs");

//Se puso una lista de rutas para poder separar las distintas vistas en carpetas
app.set("views", [
	path.resolve(__dirname, "views"),
	path.resolve(__dirname, "views/products"),
	path.resolve(__dirname, "views/users"),
]);
app.use(methodOverride("_method"));

app.use("/", mainRouter);
app.use("/user", userRouter);
app.use("/products", productRouter);

app.listen(3000, () => console.log("Corriendo en http://localhost:3000"));

app.get("/login", (req, res) =>
	res.sendFile(path.resolve(__dirname, "views/login.html")),
);

app.get("/register", (req, res) =>
	res.sendFile(path.resolve(__dirname, "views/register.html")),
);
