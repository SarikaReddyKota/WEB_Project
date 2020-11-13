var express = require("express");
var router = express.Router();

const request = require("request");
const cheerio = require("cheerio");

router.post("/stats", async (req, res) => {
    //console.log('job desc %%%%%%%%%%%%', req.body.data);
    
    var defaultUrl = 'https://www.indeed.com/career/software-engineer/' + req.body.data;
    //var defaultUrl = 'https://www.indeed.com/career/software-engineer/New-York--NY';
    // var defaultUrl = 'https://www.indeed.com/jobs?q=full+stack+developer&l=United+States&from=career';

    request(defaultUrl,
      (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);

        //   var statsData = $(".rc-list.content-wrapper.content-wrapper--for-cards.with-padding.related-career-cards-widget").html()
            
        //   console.log('stats data indeed @@@@####$$$$$$%%%%', statsData);
          var statsData = [];
          $(".flex-scrollable__child.related-career-card").each((i, el) => {
            let jobTitle = $(el)
              .find(".related-career__header-title")
              .text()
              .replace(/\s\s+/g, "");
            let openings = $(el)
              .find(".related-career__subtitle")
              .text()
              .trim();
            let average = $(el)
              .find(".related-career__indicator")
              .text()
              .trim();
            let location = $(el)
              .find(".related-career__location")
              .text()
              .trim();
            //.replace(/\s\s+/g, '');
            let salary = $(el)
              .find(".related-career__salary")
              .text()
              .trim();
            let period = $(el)
              .find(".related-career__period")
              .text()
            let jobsLink = $(el)
              .find(".related-career__cta")
              .next()
              .attr('href');
            //.attr('href'); location
            // const date = $(el)
            //   .find('.post-date')
            //   .text()
            //   .replace(/,/, '');
            //let linkPrefix = 'https://www.indeed.com' + link; ranked-list__list
            let one = {
                jobTitle: jobTitle, 
                openings: openings,
                average: average, 
                location: location, 
                salary: salary, 
                period: period, 
                jobsLink: jobsLink
            };
            //console.log('each logs###$$$$$$$', one);
            statsData.push(one);
          });
  
          res.status(200).json(statsData);
        } else {
          res.status(500).json("Error in fetching jobs stats.");
        }
      }
    );
  
  })

  router.post("/topsalaries", async (req, res) => {
    //console.log('job desc %%%%%%%%%%%%', req.body);
    
    var defaultUrl = 'https://www.indeed.com/career/software-engineer/salaries/' + req.body.data;
    
    request(defaultUrl,
      (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);

          var companyList = [];
          $(".top-paying-companies-list")
          .find(".ranked-list__item").each((i, el) => {
            let companyName = $(el)
              .find(".ranked-list__item-title-text")
              .text();
            let salary = $(el)
              .find(".ranked-list__item-subtitle-text")
              .text();
            let link = $(el)
              .find(".ranked-list__icon")
              .find("a")
              .attr('href');
      
            let one = {
                companyName: companyName,
                salary: salary,
                link: link
            };

            //console.log('each logs###$$$$$$$', one);
            companyList.push(one);
          });
  
          res.status(200).json(companyList);
        } else {
          res.status(500).json("Error in fetching companies list.");
        }
      }
    );
  
  })

  // 

  router.post("/topcompanies", async (req, res) => {
    //console.log('job desc %%%%%%%%%%%%', req.body);
    
    var defaultUrl = 'https://www.indeed.com/career/software-engineer/companies/' + req.body.data;
    
    request(defaultUrl,
      (error, response, html) => {
        if (!error && response.statusCode == 200) {
          const $ = cheerio.load(html);

          var companyList = {};
          $(".companies__content").find(".ranked-list.top-rated__ranking-item").each((i, el) => {

            var listHeader = $(el).find(".ranked-list__header-text").text();
            //console.log('each Header name########',listHeader);
            companyList[listHeader] = [];
            $(el).find(".ranked-list__item").each((j, item) => {
              let companyName = $(item).find(".ranked-list__item-title-text.top-rated__title").text();
              //console.log('each companyName name########',companyName);
              companyList[listHeader].push(companyName);
            })
            // let companyName = $(el)
            //   .find(".ranked-list__item-title-text")
            //   .text();
            // let salary = $(el)
            //   .find(".ranked-list__item-subtitle-text")
            //   .text();
            // let link = $(el)
            //   .find(".ranked-list__icon")
            //   .find("a")
            //   .attr('href');
      
            // let one = {
            //     companyName: companyName,
            //     salary: salary,
            //     link: link
            // };

            // //console.log('each logs###$$$$$$$', one);
            // companyList.push(one);
          });

          //top = $('.ranked-list__list').html()
  
          res.status(200).json(companyList);
        } else {
          res.status(500).json("Error in fetching companies list.");
        }
      }
    );
  
  })

  module.exports = router;