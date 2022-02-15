const cors = require("cors");
const https = require("https");
const path = require("path");
const axios = require("axios");
let ejs = require("ejs");

const express = require("express");
const app = express();

const url = "https://zenquotes.io/api/quotes/";
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());
app.set("view engine", "ejs");

async function genquote(url) {
  let res = await axios.get(url);
  return res.data;
}

app.get("/", (req, res) => {
  res.render("index", {
    quote: `Click the button below to generate a quote!`,
    author: "",
  });
});

app.get("/gen", async (req, res) => {
  let data = await genquote(url);
  res.render("index", { quote: `"${data[0].q}"`, author: `- ${data[0].a}` });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}...`));
