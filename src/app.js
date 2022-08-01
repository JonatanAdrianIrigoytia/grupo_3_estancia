const express = require("express");
const session = require("express-session");
const cookies = require("cookie-parser");
const app = express();
const path = require("path");
const mainRouter = require("./routes/mainRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const productAPIRouter = require("./routes/api/productAPIRouter");
const methodOverride = require("method-override");
const userLoggedMiddleware = require("./middlewares/userLoggedMiddleware");

app.use(
	session({
		secret: "Secret for session",
		resave: false,
		saveUninitialized: false,
	}),
);

app.use(cookies());

app.use(userLoggedMiddleware);

app.use(express.static(path.resolve(__dirname, "../public")));
app.set("view engine", "ejs");

//Se puso una lista de rutas para poder separar las distintas vistas en carpetas
app.set("views", [
	path.resolve(__dirname, "views"),
	path.resolve(__dirname, "views/products"),
	path.resolve(__dirname, "views/users"),
]);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));

app.use("/", mainRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/api/products", productAPIRouter);

app.listen(3001, () => console.log("Corriendo en http://localhost:3001"));
