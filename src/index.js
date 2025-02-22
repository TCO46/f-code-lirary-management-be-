const cors = require("cors")
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const { Database } = require("./config/index");
const { route } = require("./routes/index");

const UserModel = require("./app/models/User");

const app = express();
const port = 3000;

app.use(cors());

// connect to database
const db = new Database();
db.connect();

// setup express
app.use(express.static(path.join(__dirname, "../public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

// route
app.get("/", (req, res, next) => {
	res.json({ msg: "Home" });
});
route(app);

// app listen
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
