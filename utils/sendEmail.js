const nodemailer = require("nodemailer");
const {senderEmail,emailPassword} = require("../config/kyes");

const sendEmail = async({emailTo, subject,code,content}) =>{
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: senderEmail, // generated ethereal user
            pass:  emailPassword, // generated ethereal password
        },
    });

    const message = {
        to: emailTo,
        subject,
        html: `
            <div>
                <h3>Use this bellow code to ${content}</h3>
                <p><strong>Code: </strong>${code}</p>
            </div>
        `,
    };
    await transporter.sendMail(message);
}

module.exports = sendEmail;
