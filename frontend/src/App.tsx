import { Home } from "./pages/Home"
import { Chat } from "./pages/Chat"
import {useState, useRef, useEffect} from "react"

function App() {

  const [joined, setJoined] = useState(false)
  const [roomId, setRoomId] = useState("")
  const socketRef = useRef<WebSocket | null>(null)
  
    function joinRoom(roomId: string) {
      const socket = new WebSocket("ws://localhost:8000")

      socket.onopen = () => {
        socket.send(JSON.stringify({
          type:"join",
          payload: {
            roomId: roomId
          }
        }))
      }

      socketRef.current = socket
      setRoomId(roomId)
      setJoined(true)
    }

  return (
    <div>
      {joined ? (
        <Chat roomId={roomId} socket={socketRef.current!} />
      ) : (
        <Home onJoin={joinRoom} />
      )}
    </div>
  )
}

export default App