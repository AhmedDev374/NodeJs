const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const Article = require("./models/Article");

const app = express();

// Middleware
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// MongoDB Connection
mongoose.connect("mongodb+srv://Ahmed:12345@nodejsdatabase.7twfljr.mongodb.net/?retryWrites=true&w=majority&appName=NodeJsDataBase")
  .then(() => console.log("✅ Connected to MongoDB successfully"))
  .catch((error) => console.error("❌ MongoDB connection failed:", error));

// Basic Routes
app.get("/", (req, res) => res.send("Hello in Node.js"));

app.get("/hello", (req, res) => res.send("hello"));
app.get("/hi", (req, res) => res.send("hi"));
app.get("/now", (req, res) => res.send("now"));
app.put("/test", (req, res) => res.send("hello in test js"));
app.post("/addComment", (req, res) => res.send("post request on add comment"));

// Body and Query Examples
app.get("/say", (req, res) => {
  console.log(req.body.name);
  res.send(`Hello ${req.body.name}`);
});

app.get("/query", (req, res) => {
  console.log(req.query);
  res.send(`Hello ${req.body.name}, Age is: ${req.query.age}`);
});

app.get("/json", (req, res) => {
  res.json({
    name: req.body.name,
    age: req.query.age,
    language: "Arabic"
  });
});

// HTML / Views
app.get("/html", (req, res) => res.send("<h1>Hello World</h1>"));
app.get("/html2", (req, res) => res.render("numbers.ejs"));
app.get("/html3", (req, res) => res.sendFile(path.join(__dirname, "views", "numbers.html")));
app.get("/html4", (req, res) => res.render("numberss.ejs", { name: "test" }));

// Math Routes
app.get("/findSummation/:number1/:number2", (req, res) => {
  console.log(req.params);
  res.send("ok done");
});

app.get("/findSummation1/:number1/:number2", (req, res) => {
  const { number1, number2 } = req.params;
  res.send(`ok done: ${number1} / ${number2}`);
});

app.get("/findSummation2/:number1/:number2", (req, res) => {
  const total = Number(req.params.number1) + Number(req.params.number2);
  res.send(`ok done: ${total}`);
});

// Article Routes
app.post("/articles", async (req, res) => {
  const newArticle = new Article({
    title: "my first article",
    body: "this is the body",
    numberOfLikes: 100
  });

  await newArticle.save();
  res.send("The new article has been stored");
});

app.post("/articles2", async (req, res) => {
  const { articleTitle, articleBody } = req.body;
  const newArticle = new Article({
    title: articleTitle,
    body: articleBody,
    numberOfLikes: 100
  });

  await newArticle.save();
  res.send("The new article has been stored");
});

app.get("/articles3", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

app.get("/articles5/:articleId", async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId);
    res.json(article);
  } catch (error) {
    console.error("Error while reading article ID:", error);
    res.status(500).send("Error");
  }
});

app.delete("/articles6/:articleId", async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.articleId);
    res.json(article);
  } catch (error) {
    console.error("Error while deleting article ID:", error);
    res.status(500).send("Error");
  }
});

app.get("/showArticles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.render("articles.ejs", { allArticles: articles });
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).send("Server Error");
  }
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`));
