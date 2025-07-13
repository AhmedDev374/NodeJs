	const express = require("express"); // fixed 'required' to 'require'

const app = express();

//for get body
app.use(express.json())

//mongodb+srv://Ahmed:<db_password>@nodejsdatabase.7twfljr.mongodb.net/?retryWrites=true&w=majority&appName=NodeJsDataBase


const mongoose = require("mongoose"); 

const Article = require("./models/Article")
mongoose.connect("mongodb+srv://Ahmed:12345@nodejsdatabase.7twfljr.mongodb.net/?retryWrites=true&w=majority&appName=NodeJsDataBase")
  .then(() => {
    console.log("Connected to MongoDB successfully"); 
  })
  .catch((error) => {
    console.error("MongoDB connection failed", error); 
  });



app.get("/say", (req, res) => {
  console.log(req.body.name)
  res.send(`hello ${req.body.name}`);
});


app.get("/query", (req, res) => {
  console.log(req.query)
  res.send(`hello ${req.body.name}, Age is: ${req.query.age}`);
});


app.get("/json", (req, res) => {
  console.log(req.query)
  res.json({
	name: req.body.name,
	age: req.query.age,
	language: "Arabic"
	});
});


app.get("/html", (req, res) => {
  console.log(req.query)
  res.send("<h1>hello world</h1>");
});

app.get("/html2", (req, res) => {
  console.log(req.query)
  res.render("numbers.ejs");
});


app.get("/html3", (req, res) => {
  console.log(req.query)
  res.sendFile(__dirname + "/views/numbers.html");
});


//Article End point

app.post("/articles", async (req, res) => {
  const newArticle = new Article();
  newArticle.title = "my first articles";
  newArticle.body = "this is the body";
  newArticle.numberOfLikes = 100;
  await newArticle.save();

  res.send("the new article has been stored");
});


app.post("/articles2", async (req, res) => {
  const newArticle = new Article();

  const artTitle = req.body.articleTitle;
  const artBody = req.body.articleBody;

  newArticle.title = artTitle;
  newArticle.body = artBody;
  newArticle.numberOfLikes = 100;
  await newArticle.save();

  res.send("the new article has been stored");
});



app.get("/articles3", async (req, res) => {
  const articles = await Article.find();
  console.log("the articles are", articles);
  res.json(articles);
});

app.get("/articles5/:articleId", async (req, res) => {
  const id = req.params.articleId;

  try {
    const article = await Article.findById(id);
    res.json(article);
  } catch (error) {
    console.log("error while reading article id:", id);
    return res.send("error");
  }
});

app.delete("/articles6/:articleId", async (req, res) => {
  const id = req.params.articleId;

  try {
    const article = await Article.findByIdAndDelete(id);
    res.json(article);
    return;
  } catch (error) {
    console.log("error while reading article of id ", id);
    return res.send("error");
  }
});

app.get("/showArticles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.render("articles.ejs", { allArticles: articles });
  } catch (error) {
    console.log("Error fetching articles:", error);
    res.status(500).send("Server Error");
  }
});




app.get("/html4", (req, res) => {
  console.log(req.query);
  res.render("numberss.ejs", {
    name: "test"
  });
});



app.listen(3000, () => {
  console.log("I am listening to port 3000"); // fixed quote and typo in "listening"
});

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.get("/", (req, res) => {


  res.send("hello in node js");
});

app.get("/findSummation1/:number1/:number2", (req, res) => {
  const num1 = req.params.number1
  const num2 = req.params.number2
  res.send(`ok done: ${num1} / ${num2}`);
});

app.get("/findSummation/:number1/:number2", (req, res) => {
  console.log(req.params)
  res.send("ok done");
});

app.get("/findSummation2/:number1/:number2", (req, res) => {
  const num1 = req.params.number1
  const num2 = req.params.number2
  const total = Number(num1) + Number(num2)
    res.send(`ok done: ${total}`);

});



app.put("/test", (req, res) => {
  res.send("hello in test js");
});

app.post("/addComment", (req, res) => {
  res.send("post request on add comment");
});


app.get("/hi", (req, res) => {
  res.send("hi");
});

app.get("/now", (req, res) => {
  res.send("now");
});