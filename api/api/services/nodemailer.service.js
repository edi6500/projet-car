"use strict";
const nodemailer = require("nodemailer");

const {smtp_address, smtp_port, smtp_user, smtp_password} = require('../../config/environment.config')

// async..await is not allowed in global scope, must use a wrapper
exports.sendMail = async (data, type) => {
  // console.log(user);
  try
  { 
    let content = ``;
    let mailOptions = {};
    if (type === 'user')
    {
      content = `
      <h1>Welcome to Car Travel</h1>
      <br>
      <p>Follow <a href="http://localhost:4200/tokenauth/${data.token}">this link</a> to finish your account creation</p>
      `
      // setup email data with unicode symbols
      mailOptions = {
        from: 'Car Travel', // sender address
        to: smtp_user, // list of receivers
        subject: "Bienvenue chez Car Travel", // Subject line
        html: content // html body
      };
    }
    else if (type === 'treated')
    {
      content = `
      <h1>Information devis</h1>
      <br>
      <p>Un de vos devis a été traité par un de nos agent</p>
      `
      mailOptions = {
        from: 'Car Travel', // sender address
        to: smtp_user, // list of receivers
        subject: "Informations devis", // Subject line
        html: content // html body
      };
    }
    else if (type === 'message')
    {
      content = `
      <p>${data.com}</p>
      <p>${data.firstname} ${data.lastname} (${data.email})</p>
      <p>${data.phone}</p>
      `
      mailOptions = {
        from: `${data.firstname} ${data.lastname} (${data.email})`, // sender address
        to: smtp_user, // list of receivers
        subject: "Demande de contact", // Subject line
        html: content // html body
      };
    }
    
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let account = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: smtp_address,
      port: smtp_port,
      secure: false, // true for 465, false for other ports
      auth: {
        user: smtp_user, // generated ethereal user
        pass: smtp_password // generated ethereal password
      }
    });

    

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions)

    // console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }
  catch(e)
  {
    console.log(e.message);
  }
}

// main().catch(console.error);