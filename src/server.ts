import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma'

const app = express()

app.use(express.json())


const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "74777f73a95fb9",
    pass: "7f63858c447d7a"
  }
});

app.post('/feedbacks', async (req, res) => {

  const {type, comment, screenshot} = req.body

  const feedback = await prisma.feedback.create({
    data: {
      type,
      comment,
      screenshot
    }
  })

  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Manoel Carlos <carlosmarx27@gmail.com>',
    subject: 'Novo feedback',
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>ID do Feedback: ${feedback.id}</p>`,
      `<p>Tipo do Feedback: ${feedback.type}</p>`,
      `<p>Comentário: ${feedback.comment}</p>`,
      `<p>Screenshot: ${feedback.screenshot}</p>`,
      `</div>`,
    ].join('\n')
  })

  return res.status(201).json({data: feedback})
})

app.listen(3333, () => {
  console.log('HTTP server running')
})