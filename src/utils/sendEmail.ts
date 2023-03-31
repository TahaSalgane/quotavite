import nodemailer from 'nodemailer';

const sendEmail = async (userEmail: string, subject: string, htmlTemplate: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: subject,
            html: htmlTemplate,
        };

        const info: any = await transporter.sendMail(mailOptions);
        console.log('Email Sent: ' + info.response);
    } catch (error: any) {
        console.log(error);
        throw new Error('Internal Server Error (nodemailer)');
    }
};

export default sendEmail;
