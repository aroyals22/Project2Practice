var express = require("express");
var exphbs = require("express-handlebars");
var mysql = require("mysql");

var app = express();

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "taketwo_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get("/", function(req, res) {
    connection.query("SELECT * FROM movies;", function(err, data) {
    if (err) {
      return res.status(500).end();
    }
    res.render("index", { movies: data });
  });});


  app.get("/:title",function(req, res) {
    var hdbObject ={};
    connection.query("SELECT * FROM movies WHERE title = ?;",
    [req.params.title], function(err, data) {
      if (err) {
        console.log(err)
        return res.status(500).end();
      }
      hdbObject.data =data[0];

      connection.query("SELECT * FROM actors;", function(err, actors) {
      if (err) {
        console.log(err)
        return res.status(500).end();
      }
      hdbObject.actors = actors;
      res.render("recast",hdbObject);
    });
      // res.render("recast",  data[0]);
    });
  
  });
  
  

app.post("/api/movies", function(req, res){
  connection.query("INSERT INTO movies (title,role1,role2,role3,role4,actor1,actor2,actor3,actor4) VALUES (?,?,?,?,?,?,?,?,?)",
  [req.body.title,req.body.role1,req.body.role2,req.body.role3,req.body.role4,req.body.actor1,req.body.actor2,req.body.actor3,req.body.actor4],function(err, result){
    if (err){
      return res.status(500).end();
    }
    
    res.json({id:result.insertId});
    console.log({id:result.insertId})
  });
})



  app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });