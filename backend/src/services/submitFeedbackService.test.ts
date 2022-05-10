import { SubmitFeedbackService } from "./submitFeedbackService"
const createFeedbackSpy = jest.fn()
const sendMailSpy = jest.fn()
const submitFeedback = new SubmitFeedbackService(
    { create:createFeedbackSpy},
    { sendMail:sendMailSpy}
)
describe('Submit feedback',()=>{
    it('should be able to submit a feedback',async ()=>{
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'example',
            screenshot:'data:image/png;base64/teste.jpg'
        })).resolves.not.toThrow()
        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendMailSpy).toHaveBeenCalled()
    })
    it('should no able to submit feedback without type',async()=>{
        await expect(submitFeedback.execute({
            type:'',
            comment:'example',
            screenshot:'data:image/png;base64/teste.jpg'
        })).rejects.toThrow()
    })
    it('should no able to submit feedback without comment',async()=>{
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'',
            screenshot:'data:image/png;base64/teste.jpg'
        })).rejects.toThrow()
    })
    it('should no able to submit feedback with an invalid format image',async()=>{
        await expect(submitFeedback.execute({
            type:'BUG',
            comment:'oi vó',
            screenshot:'datsadsda:image/png;base64/teste.jpg'
        })).rejects.toThrow()
    })
})