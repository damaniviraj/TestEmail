var express = require('express');
var router = express.Router();
var form = require('express-form'),
  field = form.field;
var pdf = require('handlebars-pdf');


//var sg = require('sendgrid');
/* GET home page. */
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



    res.render('index', { title: 'Express' });

  });


router.get('/createpdf',
  function (req, res) {
    let document = {
      template: '<h1>{{msg}}</h1>'+
      '<p style="color:red">Red text</p>'+
      '<img src="http://thinkmarketingmagazine.com/wp-content/uploads/2012/06/silver-apple-logo.png">',
      context: {
          msg: 'Hello world'
      },
      path: "public/javascripts/"+Math.random()+".pdf"
  }

pdf.create(document)
  .then(res => {
      console.log(res)
  })
  .catch(error => {
      console.error(error)
  })
    res.render('index', { title: 'Express' });
    

  })

  router.get('/machineid',
  function (req, res) {
    


    res.render('index', { title: 'Express' });
    

  })

module.exports = router;
