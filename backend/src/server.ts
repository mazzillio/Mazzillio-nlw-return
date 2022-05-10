import express from 'express'
import nodemailer from 'nodemailer'
import { prisma } from './prisma';


const app=express()
app.use(express.json())

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "7db4af68788ac3",
      pass: "defb3ca4413dcd"
    }
});
app.post('/feedbacks',async (req,res)=>{
    const {type,comment,screenshot}=req.body;
    const feedback = await prisma.feedback.create({
        data:{
            type,
            comment,
            screenshot
        }
    })
    await transport.sendMail({
        from:'Equipe Feedget <mazzillio@feedget.com>',
        to:'Mattheus mazzillio <mattheus@gmail.com>',
        subject:'novo feedback',
        html:[
            `<div style="font-family:sans-serif; font-size:16px; color:#122">`,
            `<p>Tipo do feedback:${type}</p>`,
            `<p>Comentario: ${comment}</p>`,
            `</div>`           
        ].join('\n')
    })
    res.status(201).json(feedback)
})

app.listen(3333,()=>{
    console.info('Server is ruinnig in port 3333');
})