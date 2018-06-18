var express = require('express');
var async = require("async");
var fs = require('fs');
var nodemailer = require('nodemailer');
var async = require('async');
var images = require('../helpers/images');
var constants = require('../config/constants');
var download = require('download-pdf');
var execPhp = require('exec-php');

var router = express.Router();

/* GET users listing. */

  router.get('/imagetestupload',
    function (req, res) {

      tempNameArray1 =  'report.pdf';


      async.series([
        // function doSomething(callback) {
        //   productImgArray[i].mv('./public/images/' + tempNameArray1, function (err) {
        //     if (err)
        //       return res.status(500).send(err);
        //   });
        //   callback();
        // },
        function uploadone(callback) {
          //upload locally uploaded image on amazon server

          images.newImageCaseUpload(tempNameArray1, "product/images", function (error, results) {});

          callback();
        },
        function deleteImage(callback) {
          fs.unlink('./public/images/' + tempNameArray1, function (err) {});

        }
      ]);
      res.send("upload done")
    })



router.get('/', function (req, res, next) {

  fs.readFile('config/constants.js', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    var obj = {
      TEST_VALUE: 4567
    }

    var valueofconstants = constants.TEST_VALUE;
    var result = data.replace(/asdff/g, obj.TEST_VALUE);
    // delete constants.TEST_VALUE

    fs.writeFile('config/constants.js', result, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });

  res.send('respond with a resource');
});

router.get(
  '/testAsync',
  function (req, res) {

    var items = ['1', '2', '3', '4', '5', '6'];
    async.each(items,
      // 2nd param is the function that each item is passed to
      async function (item, callback) {
        // Call an asynchronous function, often a save() to DB
        await someAsyncCall(function () {
          // Async call is done, alert via callback
          callback();
        });
      },
      // 3rd param is the function to call when everything's done
      function (err) {
        // All tasks are done now
        // doSomethingOnceAllAreDone();
        res.send(items)
        // res.append("process Done")
      }
    );

  })

router.get(
  '/testpdfs',
  function (req, res) {


    var options = {
      directory: "public/images/",
      filename: "2014-11-7.pdf"
    }

    download(pdf, options, function (err) {
      if (err) throw err
      console.log("meow")
    })

  });

async function someAsyncCall() {
  return new Promise(function (resolve, reject) {
    resolve()
    console.log("here")
  })
}

module.exports = router;