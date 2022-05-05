import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from "../mail-adapter";


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "74777f73a95fb9",
    pass: "7f63858c447d7a"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@feedget.com>',
      to: 'Manoel Carlos <carlosmarx27@gmail.com>',
      subject: subject,
      html: body
    })
  }
}