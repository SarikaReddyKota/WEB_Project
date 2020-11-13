const express = require('express');
var router = express.Router();
const docx4js = require('docx4js');
// const ResumeParser = require('simple-resume-parser');
const ResumeParser = require('resume-parser');
const EasyDocx = require('node-easy-docx');


function parseDocx(value) {
  const easyDocx = new EasyDocx({
    path: 'D:/Masters-UMKC/ASE/Project/Express/ASE_Project/back-end/uploads' + value
    // path: 'C:/Users/resume.docx'
    // path: 'https://testbucketase5.s3.us-east-2.amazonaws.com/resume.docx' D:\Masters-UMKC\ASE\Project\Express\ASE_Project\back-end\uploads
  })
   
  easyDocx.parseDocx()
    .then(data => {
      // JSON data as result
      //console.log('JSON data2222222222!!!!!!!!', data);
      res.send(data);
    })
    .catch(err => {
      console.error(err)
    })
}

router.post("/", async (req, res) => {

  
const easyDocx = new EasyDocx({
  path: 'D:/Masters-UMKC/ASE/Project/Express/ASE_Project/back-end/uploads' + file.filename
  // path: 'C:/Users/resume.docx'
  // path: 'https://testbucketase5.s3.us-east-2.amazonaws.com/resume.docx' D:\Masters-UMKC\ASE\Project\Express\ASE_Project\back-end\uploads
})
 
easyDocx.parseDocx()
  .then(data => {
    // JSON data as result
    //console.log('JSON data2222222222!!!!!!!!', data);
    res.send(data);
  })
  .catch(err => {
    console.error(err)
  })

  //   ResumeParser
  // .parseResumeFile('./resume.docx', './files/co') // input file, output dir
  // .then(file => {
  //   console.log("Yay! " + file);
  // })
  // .catch(error => {
  //   console.error(error);
  // });

// From file
// const resume = new ResumeParser("./resume");


// From URL
//  const resume = new ResumeParser("https://writing.colostate.edu/guides/documents/resume/functionalSample.pdf");

// //Convert to JSON Object
//   resume.parseToJSON()
//   .then(data => {
//     console.log('Yay! ', data);
//   })
//   .catch(error => {
//     console.error(error);
//   });

//Save to JSON File
// resume.parseToFile('converted') //output subdirectory
//   .then(file => {
//     console.log('Yay! ', file);
//   })
//   .catch(error => {
//     console.error(error);
//   });

//     console.log('#########file body.....', req.body);

//    // docx4js.load(req.body.file).then(res => console.log('File output.......', res));

//     docx4js.load("C:/Users/Manikonda's/Desktop/resume").then(function(doc){
//         console.log(doc);
//         var nothingFactory=DOCX.createVisitorFactory();
//     });

// docx4js.load(req.body.file).then(docx=>{
// 	//you can render docx to anything (react elements, tree, dom, and etc) by giving a function
// 	docx.render(function createElement(type,props,children){
// 		return {type,props,children}
// 	})

// 	//or use a event handler for more flexible control
// 	const ModelHandler=require("docx4js/openxml/docx/model-handler").default
// 	class MyModelhandler extends ModelHandler{
// 		onp({type,children,node,...}, node, officeDocument){

// 		}
// 	}
// 	let handler=new MyModelhandler()
// 	handler.on("*",function({type,children,node,...}, node, officeDocument){
// 		console.log("found model:"+type)
// 	})
// 	handler.on("r",function({type,children,node,...}, node, officeDocument){
// 		console.log("found a run")
// 	})

// 	docx.parse(handler)

// 	//you can change content on docx.officeDocument.content, and then save
// 	docx.officeDocument.content("w\\:t").text("hello")
// 	docx.save("~/changed.docx")

// })

// //you can create a blank docx
// docx4js.create().then(docx=>{
// 	//do anything you want
// 	docx.save("~/new.docx")
// })
});

module.exports = router;