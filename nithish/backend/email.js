const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "fb588e9c3912b8",
      pass: "32ea7df5db9bc7"
    }
  });


 message = {
    from: "example123@email.com",
    to: "kranthikumarjogu@email.com",
    subject: "Subject",
    text: "Hello SMTP Email"
}

transporter.sendMail(message, **function**(err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }