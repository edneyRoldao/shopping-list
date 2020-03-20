import nodeMailer from 'nodemailer';
import envVariables from '../config/environment.config';

const transporter = nodeMailer.createTransport({
    service: envVariables.variables.mailSenderService,
    auth: {
        user: process.env.USER_MAIL_SENDER,
        pass: process.env.PASS_MAIL_SENDER
    }
});

export default async (options) => {
    try {
        const sent = await transporter.sendMail({
            from: `${envVariables.variables.usernameMailSender} <${process.env.USER_MAIL_SENDER}>`,
            to: options.mail,
            subject: options.subject,
            text: options.content,
            html: options.html
        });

        return (sent.rejected && sent.rejected.length);

    } catch (err) {
        console.log(err);
        return false;
    }

}
