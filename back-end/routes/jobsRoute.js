var express = require("express");
var router = express.Router();

const request = require("request");
const cheerio = require("cheerio");

const Technologies = require("../models/resumeModel");


router.post("/description", async (req, res) => {
  //console.log('job desc %%%%%%%%%%%%', req.body.link);
  request(req.body.link,
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const heading = $(".jobsearch-jobDescriptionText")
          //.find("div")
          .html();
        // var desc = [];
        // $(".jobsearch-jobDescriptionText").each((i, el) =>{
        //   let test = $(el)
        //   .find("p")
        //   .text();
        //   console.log('each step......', test);
        //   desc.push(test);
        // })

        // const company = $(".sjcl") jobsearch-JobComponent icl-u-xs-mt--sm jobsearch-JobComponent-bottomDivider
        //   .find("a")  jobsearch-jobDescriptionText
        //   .text(); jobsearch-jobDescriptionText
        // var test = [];
        // $(".jobsearch-SerpJobCard").each((i, el) => {
        //   let jobTitle = $(el)
        //     .find(".title")
        //     .text()
        //     .replace(/\s\s+/g, "");
        //   let companyName = $(el)
        //     .find(".company")
        //     .text()
        //     .trim();
        //   let companyRating = $(el)
        //     .find(".ratingsContent")
        //     .text()
        //     .trim();
        //   let location = $(el)
        //     .find(".location")
        //     .text()
        //     .trim();
        //   //.replace(/\s\s+/g, '');
        //   let summary = $(el)
        //     .find(".summary")
        //     .text()
        //     .trim();
        //   let link = $(".title")
        //     .find("a")
        //     .attr('href');
        //   //.attr('href'); location
        //   // const date = $(el)
        //   //   .find('.post-date')
        //   //   .text()
        //   //   .replace(/,/, '');
        //   let linkPrefix = 'https://www.indeed.com' + link;
        //   let one = {
        //     name: jobTitle,
        //     company: companyName,
        //     rating: companyRating,
        //     location: location,
        //     summary: summary,
        //     link: linkPrefix
        //   };
        //   test.push(one);
        // });

        //console.log("Scraping Done...", heading);
        //res.send(heading);
        res.status(200).json(heading);
      } else {
        res.status(500).json("Error in fetching job description.");
      }
    }
  );

})

router.post("/custom", async (req, res) => {
  //console.log('custo url here....', req.body.url);
  //req.body.url = 'https://www.indeed.com/jobs?q=full+stack+developer&l=New+York%2C+NY';
  request(
    req.body.url,
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        var test = [];
        $(".jobsearch-SerpJobCard").each((i, el) => {
          let jobTitle = $(el)
            .find(".title")
            .text()
            .replace(/\s\s+/g, "");
          let companyName = $(el)
            .find(".company")
            .text()
            .trim();
          let companyRating = $(el)
            .find(".ratingsContent")
            .text()
            .trim();
          let location = $(el)
            .find(".location")
            .text()
            .trim();
          //.replace(/\s\s+/g, '');
          let summary = $(el)
            .find(".summary")
            .text()
            .trim();
          let link = $(el)
            .find(".title")
            .find("a")
            .attr('href');
          let linkPrefix = 'https://www.indeed.com' + link;
          // console.log('link prefix@@@@@@@@@', linkPrefix); viewJobButtonLinkContainer
          // if(jobTitle == 'Software Engineer' && companyName == 'Capital One') {
          //   console.log('link prefix@@@@@@@@@', applyLink);
          // }
          // if(applyLink == null || applyLink == undefined){
          //   applyLink = linkPrefix;
          // }
          let one = {
            name: jobTitle,
            company: companyName,
            rating: companyRating,
            location: location,
            summary: summary,
            link: linkPrefix
          };
          test.push(one);
        });

        res.send(test);
        
      }
    }
  );
});


router.post("/technologies", async (req, res) => {
 // console.log('technologies hitting here....', req.body.id);
  Technologies.find({ userid : req.body.id})
  .then( techs =>{
    //console.log('technologies hitting here.... result', techs);
    //res.status(200).json(res);
    res.send(techs);
  }, err =>{
    //console.log('technologies hitting here.... error', err);
    //res.status(500).json(err);
    res.send(err);
  })
});

router.get("/", function(req, res, next) {

  var tech;

  var defaultUrl = 'https://www.indeed.com/jobs?q=+software+developer&l=Kansas+City%2C+MO';

  // var url = 'https://www.indeed.com/jobs?q=';

  // Technologies.findOne({ userid : "5e7d4e9dc9a9d2110004adfb"})
  // .then(techRes => {
  //   tech = techRes.technologies;
  //   console.log('result of technologies@@@@@@@@##########$$$$$$$', tech);
  //   console.log('result of technologies Length @@@@@@@@##########$$$$$$$', tech.length);

    
    
  //   if (tech.length != 0) {
  //     tech.forEach(element => {
  //       url = url + '+'+ element;   
  //     });
  //   } else {
  //     url = defaultUrl;
  //   }
  
  //   console.log('url @@@@@!!!!!!!!@@@@@@#######', url);
  // }, err => {
  //   url = defaultUrl;
  //   console.log('userid not found@@@@@@@@@!!!!!####$$$$', url);
  // })

  request(
    defaultUrl,
    (error, response, html) => {
      if (!error && response.statusCode == 200) {
        const $ = cheerio.load(html);

        const heading = $(".title")
          .find("a")
          .text();
        const company = $(".sjcl")
          .find("a")
          .text();
        // console.log('checking data.......', heading);
        var test = [];
        $(".jobsearch-SerpJobCard").each((i, el) => {
          let jobTitle = $(el)
            .find(".title")
            .text()
            .replace(/\s\s+/g, "");
          let companyName = $(el)
            .find(".company")
            .text()
            .trim();
          let companyRating = $(el)
            .find(".ratingsContent")
            .text()
            .trim();
          let location = $(el)
            .find(".location")
            .text()
            .trim();
          //.replace(/\s\s+/g, '');
          let summary = $(el)
            .find(".summary")
            .text()
            .trim();
          let link = $(".title")
            .find("a")
            .attr('href');
          //.attr('href'); location
          // const date = $(el)
          //   .find('.post-date')
          //   .text()
          //   .replace(/,/, '');
          let linkPrefix = 'https://www.indeed.com' + link;
          let one = {
            name: jobTitle,
            company: companyName,
            rating: companyRating,
            location: location,
            summary: summary,
            link: linkPrefix
          };
          test.push(one);
        });

        // console.log("Scraping Done...", test);
        res.send(test);
        // console.log('Heading..........', heading);
        // console.log('Company..........', company);
      }
    }
  );

});

module.exports = router;
