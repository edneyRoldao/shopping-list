import nodeMailer from 'nodemailer';

export default async (options) => {
    const transport = nodeMailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USER_SENDER,
            pass: process.env.MAIL_PASS
        }
    });
    
    try {
        const sent = await transport.sendMail({
            from: `${process.env.MAIL_USERNAME} <${process.env.MAIL_USER_SENDER}>`,
            to: options.email,
            subject: options.subject,
            html: `${options.content} ${options.html}`
        });

        return (sent.rejected && sent.rejected.length);

    } catch (err) {
        console.log(err);
        return false;
    }

}
