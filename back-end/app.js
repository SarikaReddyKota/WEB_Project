var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var session = require("express-session");
const multer = require("multer");
fs = require("fs");
const extractDocx = require("./docx");

var passport = require("passport");

require("./config/passport")(passport);
const technologiesModel = require("./models/resumeModel.js");
var usersRouter = require("./routes/users");
var loginRouter = require("./routes/loginRoute");
var registerRouter = require("./routes/registerRoute");
var config = require("./config/config");
var docxRouter = require("./routes/docxRoute");
var jobsRouter = require("./routes/jobsRoute");
var statsRouter = require("./routes/jobStatsRoute");


var app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public/dist/phase1/")));

mongoose
  .connect(config.MongoUri, { useNewUrlParser: true })
  .then(() => console.log("Conected to MogonDB"))
  .catch(err => console.log("Error in connectin to MongoDB"));

var storage = multer.diskStorage({
  destination: function(cb) {
    cb(null, "uploads");
  },
  filename: function(file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

var upload = multer({ storage: storage });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); 
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Request-Method", "*");
  next();
});

app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/users", usersRouter);
app.use("/docx-convert", docxRouter);
app.use("/jobs", jobsRouter);
app.use("/carrer", statsRouter);

app.post("/uploadfile", upload.single("profile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  let destFilePath = "./uploads/" + file.filename;
  extractDocx.extract(destFilePath).then(function(res, err) {
    if (err) {
      console.log(err);
    }
    var docxResult = res;
    var words = [
      "Angular",
      "Node",
      "Html",
      "Css",
      "Java",
      "script",
      "HTML",
      "CSS",
      "Bootstrap",
      "Java Script",
      "JS",
      "Mulesoft",
      "Python",
      "python",
      "Django",
      "dell boomi",
      "aws",
      "informatica",
      "java",
      "unix",
      "batch",
      "script",
      "powershell",
      "REST",
      "SOAP",
      "oracle",
      "SQL Server",
      "salesforce",
      "ERP",
      "snowflake",
      "MYSQL",
      "Tableau",
      ".net",
      "microsoft",
      "framework",
      "hadoop",
      "flask",
      "spark",
      "java",
      "Big Data",
      "React",
      "php",
      "pl/sql",
      "Spark",
      "Software Engineer",
      "Blockchain",
      "Cloud Computing",
      "Express",
      "Artificial Intelligence"
    ];

    var resultWords = [];
    var splitwords = docxResult.split(" ");
    words.forEach(ele => {
      if (splitwords.includes(ele)) {
        resultWords.push(ele);
      }
    });
    const resumeKeywords = new technologiesModel({
      userid: req.body.userId,
      technologies: resultWords
    });

    resumeKeywords.save();
  });

  res.send("File Uploaded Successfully!");
});
app.use(function(next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
