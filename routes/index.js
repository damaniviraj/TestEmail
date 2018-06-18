var express = require('express');
var router = express.Router();
var form = require('express-form'),
  field = form.field;
var fs = require('fs');
var csv = require("fast-csv");
var pdf = require('handlebars-pdf');
var multer = require('multer');
var path = require('path');
var xlsx = require('node-xlsx');
var json2csv = require('json2csv');
const screenshot = require('screenshot-desktop')
const os = require('os');


//var sg = require('sendgrid');
/* GET home page. */


var exec = require("child_process").exec;
router.get('/failure',
  function (req, res) {
    exec("php success.php",
      function (error, stdout, stderr) {
        console.log(error)
        res.send(stdout);
      });
  });

router.get('/testxlxs',
  function (req, res, next) {


    var obj = xlsx.parse("public/images/excel-to-json.xlsx"); // parses a file

    var obj = xlsx.parse(fs.readFileSync("public/images/excel-to-json.xlsx")); // parses a buffer

    // console.log(obj[0].data);


    // function convertToJSON(array) {
    var first = obj[0].data.join()
    var headers = first.split(',');

    var jsonData = [];
    for (var i = 1, length = obj[0].data.length; i < length; i++) {
      var myRow = obj[0].data[i].join();
      var row = myRow.split(',');

      var data = {};
      for (var x = 0; x < row.length; x++) {
        data[headers[x]] = row[x];
      }
      jsonData.push(data);

    }
    console.log(jsonData);
    //  };


    //  var importedData = JSON.stringify(convertToJSON(data));

  })


router.get('/',

  function (req, res, next) {

    var helper = require('sendgrid').mail;
    var fromEmail = new helper.Email('test@example.com');
    var toEmail = new helper.Email('demo@techcetra.com');
    var subject = 'Sending with SendGrid is Fun';
    var content = new helper.Content('text/plain', 'and easy to do anywhere, even with Node.js');
    var mail = new helper.Mail(fromEmail, subject, toEmail, content);

    var sg = require('sendgrid')("SENGRID.APIKEY");
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON()
    });

    sg.API(request, function (error, response) {
      if (error) {
        console.log('Error response received');
      }
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    });
    let data = {
      title: 'Express',
      random: Math.random()
    }


    res.render('index', data);

  });


router.get('/createpdf',
  function (req, res) {
    let document = {
      template: '<h1>{{msg}}</h1>' +
        '<p style="color:red">Red text</p>' +
        '<img src="http://thinkmarketingmagazine.com/wp-content/uploads/2012/06/silver-apple-logo.png">',
      context: {
        msg: 'Hello world'
      },
      path: "public/javascripts/" + Math.random() + ".pdf"
    }

    pdf.create(document)
      .then(res => {
        console.log(res)
      })
      .catch(error => {
        console.error(error)
      })
    res.render('index', {
      title: 'Express'
    });


  })

router.get('/machineid',
  function (req, res) {
    var stream = fs.createReadStream("public/images/random.csv");
    var newArray = [];
    csv
      .fromStream(stream, {
        headers: true
      })
      .on("data", function (data) {
        newArray.push(data.mobile)
        console.log(data);
      })
      .on("end", function () {
        console.log(newArray)
        console.log("done");
      });

  })


router.get('/screenshot',
  async function (req, res) {

    let rand = Math.random();

    let vari = await screenshot({
      filename: 'public/images/' + rand + '.png'
    });


    // screenshot({ filename: 'public/images/'+rand+'.png' });

    fs.readFile(vari, function (err, imageData) {
      if (err) throw err;
      res.contentType("image/png");
      res.send(imageData);
    });
  })

router.get('/multerImg',
  async function (req, res) {
    console.log("testing image route")
    res.render('image')
  })

router.get('/csvwrite',
  async function (req, res) {

    var json = [{
      "car": "Audi",
      "price": 40000,
      "color": "blue"
    }, {
      "car": "BMW",
      "price": 35000,
      "color": "black"
    }, {
      "car": "Porsche",
      "price": 60000,
      "color": "green"
    }];


    json2csv({
      data: json,
      fields: ['car', 'price', 'color']
    }, function (err, csv) {
      if (err) console.log(err);
      fs.writeFile('file.csv', csv, function (err) {
        if (err) throw err;
        console.log('file saved');
      });
    });

  })
router.get('/charts',
  async function (req, res) {
    var day = 1000 * 60 * 60 * 24;
    date1 = new Date('2013-07-30');
    date2 = new Date("2013-09-04");


    var diff = (date2.getTime() - date1.getTime()) / day;
    for (var i = 0; i <= diff; i++) {
      var xx = date1.getTime() + day * i;
      var yy = new Date(xx);

      console.log(yy.getFullYear() + "-" + (yy.getMonth() + 1) + "-" + yy.getDate());
    }

    res.render('charts')
  })

router.get('/bar-chart',
  async function (req, res) {

    res.render('barchart')
  })
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, 'public/images/')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

router.post('/multerImg',
  async function (req, res) {
    var upload = multer({
      storage: storage,
      fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname)
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
          return callback(res.end('Only images are allowed'), null)
        }
        callback(null, true)
      }
    }).array('userFile', 2);
    upload(req, res, function (err) {
      res.end('File is uploaded')
    })

  })




module.exports = router;