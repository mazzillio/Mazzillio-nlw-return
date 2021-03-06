import { ArrowLeft} from "phosphor-react"
import { FormEvent, useState } from "react"
import { FeedbackType, feedBackTypes } from ".."
import { CloseButton } from "../../CloseButton"
import { ScreenshootButton } from "../SreenshootButton"

interface FeedbackContentStepProps {
    feedbackType: FeedbackType
    onFeedBackRestartRequested:()=>void
    onFeedbackSent:()=>void
}
export function FeedbackContentStep({ feedbackType,onFeedBackRestartRequested,onFeedbackSent}: FeedbackContentStepProps) {
    const feedbackTypeInfo = feedBackTypes[feedbackType]
    const [screenShoot,setScreenShoot]=useState<string|null>(null)
    const [comment,setComment] =useState('')
    const handleSubmitFeedBack=(event:FormEvent)=>{
        event.preventDefault()
        console.log({screenShoot,comment})
        onFeedbackSent()
       
    }
    return (
        <>
            <header>
                <button type="button" className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100">
                    <ArrowLeft weight="bold" className="w-4 h-4"
                    onClick={onFeedBackRestartRequested}    
                />
                </button>
                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt}
                        className='w-6 h-6'
                    />
                    {feedbackTypeInfo.title}
                </span>
                <CloseButton />
            </header>
            <form className="my-4 w-full" onSubmit={handleSubmitFeedBack}>
                <textarea 
                    onChange={(event)=> setComment(event.target.value)}
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 boder-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none
                     scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin
                    "
                    placeholder="Conte com detalhes o que est?? acontecendo"
                />
                <footer className="flex gap-2 mt-2">
                    <ScreenshootButton
                        screenShoot={screenShoot}
                        onScreenshootTok={setScreenShoot}
                    />
                    <button
                        type="submit"
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300
                            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors
                            disabled:opacity-50 disabled:hover:bg-brand-500                       
                            "
                        disabled={comment.length === 0 }
                    >
                        Enviar Feedback
                    </button>
                </footer>
            </form>
        </>
    )
}