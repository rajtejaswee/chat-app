import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8000 });
const rooms = new Map();
wss.on("connection", (socket) => {
    socket.on("message", (message) => {
        try {
            const parsedMessage = JSON.parse(message.toString());
            if (parsedMessage.type === "chat") {
                const chatMessage = parsedMessage.payload.message;
                const roomId = parsedMessage.payload.roomId;
                console.log(`Sending the message to the room ${roomId} : ${chatMessage}`);
                const roomSockets = rooms.get(roomId);
                if (roomSockets) {
                    roomSockets.forEach((client) => {
                        if (client.readyState === WebSocket.OPEN) {
                            client.send(chatMessage);
                        }
                    });
                }
                else {
                    console.log("Room not found or empty");
                }
            }
            if (parsedMessage.type === "join") {
                const roomId = parsedMessage.payload.roomId;
                console.log("User joined room :");
                if (!rooms.has(roomId)) {
                    rooms.set(roomId, new Set());
                }
                rooms.get(roomId)?.add(socket);
            }
        }
        catch (error) {
            console.log("Invalid JSON received");
            socket.send("Error. Please send valid JSON");
        }
    });
});
//# sourceMappingURL=index.js.map