import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer'
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "7db4af68788ac3",
        pass: "defb3ca4413dcd"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <mazzillio@feedget.com>',
            to: 'Mattheus mazzillio <mattheus@gmail.com>',
            subject,
            html: body
        })
    }
}