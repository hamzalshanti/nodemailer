var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.post('/send', async function(req, res, next) {
  const output = `
  <p>You have new message</p>
  <h3>The Details</h3>
  <ul>
  <li>Name: ${req.body.name}</li>
  <li>company: ${req.body.company}</li>
  <li>phone: ${req.body.phone}</li>
  <li>emailName: ${req.body.email}</li>
  </ul>
  <h3>The Message</h3>
  <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'bette.connelly48@ethereal.email', // generated ethereal user
      pass: '2gfFE25VekkjvfJevW', // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "hamza2000pal@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: output, // html body
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  res.render('index', {msg: 'Email Sent'});
});

module.exports = router;
