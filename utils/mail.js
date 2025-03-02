const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});


const main=async function (email,name) {
  try {
  const info = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: email, // list of receivers
    subject: "Welcome to Our Website!",
    text: `Hello ${name},\n\nWelcome aboard! 🎉  

We are thrilled to have you as part of our community. Get ready to explore, connect, and make the most out of your journey with us.  

If you ever need help or have any questions, we’re just an email away!  

Happy exploring! 🚀  

Best Regards,  
The [Your Website Name] Team`,
      html: `<div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2 style="color: #4CAF50;">Hello ${name}, Welcome Aboard! 🎉</h2>
        <p>We are absolutely delighted to have you join us! Get ready to explore exciting features and be part of an amazing community.</p>
        <p>If you ever need assistance, feel free to <a href="mailto:${process.env.EMAIL}" style="color: #008CBA; text-decoration: none;">reach out to us</a>. We're here to help!</p>
        <p>Enjoy your journey with us! 🚀</p>
        <br>
        <p style="color: #777;">Best Regards,<br>The explore_journey Team</p>
      </div>`,
    });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }catch(e){
    console.log(e);
    
  }
}

module.exports = main;