import { Progress } from "@/components/ui/progress"

interface User {
    playerNumber: number;
    progress: number;
}


export default function progressBar({ user }: { user: User}) {
    return (
        <div className='flex-col p-2'>
            <h1 className='text-2xl text-[#394760]'>Monkey {user.playerNumber}</h1>
            <div className='w-full'>
                <Progress className='h-[0.5rem] rounded-[1.5rem] bg-[#394760]' value={user.progress} />
            </div>
        </div>
    )
}