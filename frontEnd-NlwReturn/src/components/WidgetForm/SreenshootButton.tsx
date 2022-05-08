import { Camera, Trash } from "phosphor-react";
import html2canvas from 'html2canvas'
import { useState } from "react";
import { Loading } from "../Loading";
interface ScreenshootButtonProps {
    onScreenshootTok: (screenShoot: string| null) => void
    screenShoot: string |null
}
export function ScreenshootButton({ onScreenshootTok, screenShoot }:ScreenshootButtonProps) {
    const [isTakingScreenShoot, setIsTakingScreenShoot] = useState(false)
    const handleTakeScreenShot = async () => {
        setIsTakingScreenShoot(true)
        const canvas = await html2canvas(document.querySelector('html')!)
        const base64Image = canvas.toDataURL('image/png')
        onScreenshootTok(base64Image)
        console.log(base64Image)
        setIsTakingScreenShoot(false)
    }
    if (screenShoot) {
        return (
            <button type="button"
                className="p-1 w-10 h-10 rounded-md border:transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
                onClick={()=>onScreenshootTok(null)}
                style={{
                    backgroundImage: `url(${screenShoot})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: 180
                }}
            >
                <Trash weight="fill" />
            </button>
        )
    }
    return <button type="button"
        onClick={handleTakeScreenShot}
        className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors 
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 
    "
    >
        {isTakingScreenShoot ? <Loading /> : <Camera className="w-6 h-6" />}
    </button>
}