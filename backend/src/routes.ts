import express from 'express'
import { SubmitFeedbackService } from './services/submitFeedbackService';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapater';

const routes = express.Router()



routes.post('/feedbacks',async (req,res)=>{
    const {type,comment,screenshot}=req.body;
    const prismaFeedbackRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()
    const submitFeedback = new SubmitFeedbackService(prismaFeedbackRepository,nodemailerMailAdapter)
    await submitFeedback.execute({
        type,
        comment,
        screenshot
    })
    
    res.status(201).send()
})



export {routes}