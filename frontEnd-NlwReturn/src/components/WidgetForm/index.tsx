import bugImageUrl from '../../assets/bug.svg'
import ideaImageUrl from '../../assets/idea.svg'
import otherImageUrl from '../../assets/thought.svg'
import { useState } from "react";
import { FeedbackTypeStep } from "./Steps/FeedBackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSucessStep } from './Steps/FeedbackSucessStep';
export const feedBackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem de um inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem de uma lâmpada'
        }
    },
    OTHER: {
        title: 'Outro',
        image: {
            source: otherImageUrl,
            alt: 'Imagem de um balão de pensamento'
        }
    }
}
export type FeedbackType = keyof typeof feedBackTypes;
export function WidgetForm() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null)
    const [feedbackSent, setFeedbackSent] = useState(false)
    const handleRestartFeedBack = () => {
        setFeedbackType(null)
        setFeedbackSent(false)
    }
    return (
        <div className="bg-zinc-900 p-4 relative rounded-2xl mb-4 flex flex-col items-center drop-shadow-lg w-[calc(100vw-2rem)] md:w-auto">
            {
                feedbackSent ? <FeedbackSucessStep onFeedBackRestartRequested={handleRestartFeedBack} />
                    :
                    <>
                        {
                            !feedbackType ? (
                                <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
                            ) : (
                                <FeedbackContentStep
                                    feedbackType={feedbackType}
                                    onFeedBackRestartRequested={handleRestartFeedBack}
                                    onFeedbackSent={() => setFeedbackSent(true)}
                                />
                            )
                        }
                    </>
            }
            <footer className="text-xs text-neutral-400">
                Feito com amor por Mattheus Mazzillio mentorado pela <a className=' underline underline-offset-2' href="https://rocketseat.com.br/">Rocktseat.</a>
            </footer>
        </div>
    )
}