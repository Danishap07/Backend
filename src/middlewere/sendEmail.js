import { createTransport } from "nodemailer";

export const sendMail = async (email, otp, firstName) => {
  const transport = createTransport({
    service: 'gmail',
    port: 8000,
    secure: false,
    // secure: true,
    auth: {
      user: "danishp.1999@gmail.com",
      pass: "sobvytudonbptdtw"
    }
  })
  await transport.sendMail({
    from: '"Danish at Shopper Bees" <danishp.1999@gmail.com>',
    to: email,
    subject: "Shopper Bees Verify OTP",
    // text: "hello this is my first email from node.js.",
    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                <div style="margin:50px auto;width:70%;padding:20px 0">
                  <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Your Brand</a>
                  </div>
                  <p style="font-size:1.1em">Hi ${firstName},</p>
                  <p>Thank you for choosing Shopper Bees. Use the following OTP to complete your Sign Up procedures. OTP is valid for 10 minutes</p>
                  <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                  <p style="font-size:0.9em;">Regards,<br />Danish at Shopper Bees </p>
                  <hr style="border:none;border-top:1px solid #eee" />
                  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                    <p>Your Brand Inc</p>
                    <p>1600 Amphitheatre Parkway</p>
                    <p>California</p>
                  </div>
                </div>
              </div>`
  }).then(() => {
    console.log({ message: "Email sent successfully."})
  }).catch(err => {
    console.log({ message: err})
  })
}