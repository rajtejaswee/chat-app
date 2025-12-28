import { Button } from "../components/Button"
import { Input } from "../components/Input"
import { useEffect, useRef, useState } from "react"

interface ChatProps {
    roomId: string,
    socket: WebSocket
}


export const Chat = (props: ChatProps) => {
    const [message, setMessage] = useState<{text: string, isMe: boolean}[]>([])
const inputRef = useRef<HTMLInputElement>(null)
useEffect(() => {
    props.socket.onmessage = (event) => {
        const newChat = {
            text: event.data,
            isMe: false
        };
        setMessage((prev) => [...prev, newChat])
    }
},[])

function sendMessage() {
    if(!inputRef.current) return;

    const text = inputRef.current.value;

    props.socket.send(JSON.stringify({
        type: "chat",
        payload: {
            message:text,
            roomId: props.roomId
        }
    }));

    setMessage((prev) => [...prev, {text: text, isMe: true}])
    inputRef.current.value = ""
}

    return (
        <div className="h-screen bg-black flex items-center justify-center text-white">
            
            {/* Main Chat Container */}
            <div className="w-full max-w-3xl bg-gray-950 rounded-xl border border-gray-800 overflow-hidden flex flex-col h-[80vh]">
                
                {/* 1. Header */}
                <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <h2 className="font-bold text-lg">Room: <span className="text-gray-400 font-mono">{props.roomId}</span></h2>
                    </div>
                </div>

                {/* 2. Chat Area (Messages) */}
                {/* flex-1 makes this take up all remaining space */}
                <div className="flex-1 p-6 overflow-y-auto space-y-4">
                    {message.map((msg, index) => (
                        <div key={index} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                            <div className={`${msg.isMe ? "bg-blue-600" : "bg-gray-800"} text-white px-4 py-2 rounded-lg max-w-xs`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>

                {/* 3. Input Area */}
                <div className="p-4 border-t border-gray-800 bg-gray-900 flex gap-4">
                    <div className="flex-1">
                        <input 
                        ref = {inputRef}
                        type="text" 
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Type a message...."
                        />
                    </div>
                    <div onClick={sendMessage}>
                         {/* Reusing our Button Component */}
                        <Button 
                        text="Send" />
                    </div>
                </div>

            </div>
        </div>
    )
}