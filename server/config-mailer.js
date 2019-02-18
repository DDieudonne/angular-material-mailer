const nodemailer = require('nodemailer');

module.exports = (formsdata) => {

    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'xxxxxxx@gmail.com',
            pass: 'xxxxxxxxxxxxxxxxx'
        }
    });

    const mailOptions = {
        from: '"youname" <xxxxxx@example.com>',
        to: formsdata.emails,
        subject: formsdata.subject,
        text: formsdata.message,
        html: formsdata.message
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            return err;
        else
            return info;
    });

}