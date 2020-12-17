const express = require('express');
var router = express.Router();
const EasyDocx = require('node-easy-docx');


function parseDocx(value) {
  const easyDocx = new EasyDocx({
    path: 'C:/Github/WEB_Project/back-end/uploads' + value
  })
   
  easyDocx.parseDocx()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      console.error(err)
    })
}

router.post("/", async (req, res) => {

  
const easyDocx = new EasyDocx({
  path: 'C:/Github/WEB_Project/back-end/uploads' + file.filename
})
 
easyDocx.parseDocx()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    console.error(err)
  })
});

module.exports = router;