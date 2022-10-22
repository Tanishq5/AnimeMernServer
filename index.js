const dotenv = require("dotenv");
require("dotenv/config");
const express = require("express");
const BodyParser = require("body-parser");
const app = express();
const db = require("./db/conn")

db.connect();


dotenv.config();


app.use(express.json());

app.use(require("./router/auth"))
const Movie_Data = require("./router/movie_data");
const Admin = require("./router/admin");

app.use("/movie_data", Movie_Data);
app.use("/admin", Admin);

const PORT = process.env.PORT || 4000;

app.use(BodyParser.json());

app.get("/login", (req, res) => {
    res.send("Hello login world from the server");
})

app.get("/signup", (req, res) => {
    res.send("Hello signup world from the server");
})

app.get("/main", (req, res) => {
    console.log("Hello main")
    res.send("Hello main world from the server");
})

if(process.env.NODE_ENV == "production"){
    app.use(express.static("client/build"));
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})