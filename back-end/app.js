var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var session = require("express-session");
var bodyParser = require("body-parser");
const multer = require("multer");
fs = require("fs");
const EasyDocx = require("node-easy-docx");
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

//const request = require('request');
//const cheerio = require('cheerio');

var app = express();

// view engine setup
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
  destination: function(req, file, cb) {
    //console.log("disk storage!!!!!!!!!!", req, file);
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});

var upload = multer({ storage: storage });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
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
  //console.log("file request body@@@@@@@@@@@###########", req.body);
  const file = req.file;
  // path.extname('index.html');
  // let filepath = fs.readFileSync(req.file.path);
  // console.log('@@@@@@@@@@@@ file path @@@@@@@@@@@@', path.extname(file.originalname));
  // // req.file.filename = req.file.filename + path.extname(file.originalname);
  // console.log('@@@@@@@@@@@@ file path @@@@@@@@@@@@', file);
  //console.log("session object#############", req.session);
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
    //console.log(res)
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
      // "Jenkins",
      // "R",
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
    //console.log('words.......', splitwords);
    words.forEach(ele => {
      if (splitwords.includes(ele)) {
        resultWords.push(ele);
      }
    });

    // const testNew = new app.Technologies({
    //   'userid' : null,
    //   'technologies' : resultWords
    // })
    // testNew.save();
    // console.log('req@@####$$$$$%%%%%%',req.body,req.body.userId);
    const resumeKeywords = new technologiesModel({
      userid: req.body.userId,
      technologies: resultWords
    });

    resumeKeywords.save();

    //console.log("result words.........", req.session);

    // var word = 'Angular';
    // function compare(elm, word) {
    //   var i = 0
    //   elm.split('').forEach(c => { //tokenize elm of book into array
    //     if (word.indexOf(c) > -1) //check if charecter in present in the word
    //       i += 1 //if yes, increment
    //   })
    //   return i === word.length - 1 ? true : false //return true if length of i is (length of word - 1),
    // }

    // function offOne(word, docxResult) {
    //   console.log('testing inside.........');
    //   return docxResult.filter(elm =>
    //     // check, if the length of both strings are not same and
    //     // both strings are not same and
    //     // compare strings, true will be returned if the condition is satisfied in compare()
    //     elm.length === word.length && elm !== word && compare(elm, word)
    //   )
    // }

    // console.log('testing#########..........',offOne(word, docxResult));
  });

  res.send("File Uploaded Successfully!");
  //res.status(200).json(res);
  // var parseDocxPath = 'D:/Masters-UMKC/ASE/Project/Express/ASE_Project/back-end/uploads/' + file.filename;
  // // console.log('%%%%%%$$$$$$$$$$$$$$', parseDocxPath);
  // getJson(parseDocxPath);
  // // function parseDocx(value) {
  //   const easyDocx = new EasyDocx({
  //     path: parseDocxPath
  //     // path: 'C:/Users/resume.docx'
  //     // path: 'https://testbucketase5.s3.us-east-2.amazonaws.com/resume.docx' D:\Masters-UMKC\ASE\Project\Express\ASE_Project\back-end\uploads
  //   })

  //   // console.log('easy docx..........%%%%%%$$$$$$$$$$$$$$', easyDocx);

  //   easyDocx.parseDocx()
  //     .then(data => {
  //       // JSON data as result
  //       // console.log('JSON data2222222222!!!!!!!!', data);
  //       res.send(data);
  //     })
  //     .catch(err => {
  //       console.error(err)
  //     })
  // }
  //res.send(file)
});

// function getJson(params) {

//   // console.log('easy docx..........%%%%%%$$$$$$$$$$$$$$', params);

//   var urlPath = params;
//   const easyDocx = new EasyDocx({
//     path: urlPath
//   })

//   easyDocx.parseDocx()
//     .then(data => {
//       // JSON data as result
//       // console.log('JSON data2222222222!!!!!!!!', data);
//       res.send(data);
//     })
//     .catch(err => {
//       console.error(err)
//     })
// }

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// request('https://www.indeed.com/jobs?q=software+developer&l=Kansas+City%2C+MO', (error, response, html) => {
//   if (!error && response.statusCode == 200) {
//     const $ = cheerio.load(html);

//     const heading = $('.title').find('a').text();
//     const company = $('.sjcl').find('a').text();
//     var test = [];
//     $('.jobsearch-SerpJobCard').each((i, el) => {
//       let jobTitle = $(el)
//         .find('.title')
//         .text()
//         .replace(/\s\s+/g, '');
//       let companyName = $(el)
//         .find('.company')
//         .text()
//         .trim();
//       let companyRating = $(el)
//         .find('.ratingsContent')
//         .text()
//         .trim();
//       let location = $(el)
//         .find('.location')
//         .text()
//         .trim();
//         //.replace(/\s\s+/g, '');
//       let summary = $(el)
//         .find('.summary')
//         .text()
//         .trim();
//         //.attr('href'); location
//       // const date = $(el)
//       //   .find('.post-date')
//       //   .text()
//       //   .replace(/,/, '');
//       let one = {
//         'name' : jobTitle,
//         'company' : companyName,
//         'rating' : companyRating,
//         'location' : location,
//         'summary': summary
//       }
//       test.push(one);
//     });

//     console.log('Scraping Done...', test);
//     // console.log('Heading..........', heading);
//     // console.log('Company..........', company);
//   }
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
