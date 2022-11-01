const dotenv = require("dotenv");
require("dotenv/config");
const express = require("express");
const BodyParser = require("body-parser");
const app = express();
const db = require("./db/conn")
const Movie_Data = require("./router/movie_data");
const Admin = require("./router/admin")
const Auth = require("./router/auth")
const PORT = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const indexRouter = require("./router/index");
const path = require("path")
const cors = require("cors")


//----------------------------* view engine setup *----------------------------//

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

//----------------------------* Middlewares *----------------------------//

db.connect();
dotenv.config();
app.use(express.json());
app.use(BodyParser.json());
app.use(cookieParser());
app.use(cors());

//----------------------------* API's *----------------------------//

app.use("/", indexRouter)
app.use("/auth", Auth);
app.use("/movie_data", Movie_Data);
app.use("/admin", Admin);

//----------------------------* Port Listen *----------------------------//

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})