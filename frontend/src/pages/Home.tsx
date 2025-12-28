import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { Logo } from "../icons/Logo"
import {useState} from "react"

interface HomeProps {
    onJoin: (roomId: string) => void;
}

export const Home = (props: HomeProps) => {

    const[roomCode, setRoomCode] = useState("")

    const generateRandomCode = () => {
        const characters = 'QWERTYUIOPLKJHGFDSAZXCVBNM'
        let result=''
        for(let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        return result;
    }

    const handleCreateRoom = () => {
        const newCode = generateRandomCode();
        props.onJoin(newCode)
    }

    const handleJoinRoom = () => {
        if(roomCode.trim()) {
            props.onJoin(roomCode)
        }
    }
    return (
        <div className="h-screen flex items-center justify-center bg-black text-white">
            <div className="bg-gray-950 p-10 rounded-xl border border-gray-800 w-full max-w-md">
                
                {/* Header */}
                <div className="flex flex-col items-center mb-8">
                    <Logo />
                    <h1 className="text-2xl font-bold mt-4">Real Time Chat</h1>
                    <p className="text-gray-400 text-sm mt-2">
                        Temporary room that expires after users exit
                    </p>
                </div>

                {/* Actions */}
                <div className="space-y-6">
                    
                    {/* BUTTON 1: Create Room */}
                    {/* We wrap the Button in a div to capture the onClick event */}
                    <div onClick={handleCreateRoom}>
                        <Button text="Create New Room" fullWidth={true} variant="primary" />
                    </div>
                    
                    {/* Divider */}
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] bg-gray-800 flex-1"></div>
                        <span className="text-gray-500 text-sm">OR</span>
                        <div className="h-[1px] bg-gray-800 flex-1"></div>
                    </div>

                    {/* INPUT & JOIN */}
                    <div className="flex gap-2">
                        <div className="flex-1">
                            {/* We use a standard HTML input here for easy access to onChange */}
                            <input 
                                type="text" 
                                placeholder="Enter Room Code"
                                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                
                                // A. Bind value to state (Controlled Component)
                                value={roomCode}
                                // B. Update state on every keystroke
                                onChange={(e) => setRoomCode(e.target.value)}
                            />
                        </div>
                        
                        {/* BUTTON 2: Join Existing Room */}
                        <div onClick={handleJoinRoom}>
                             <Button text="Join" variant="secondary" />
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}