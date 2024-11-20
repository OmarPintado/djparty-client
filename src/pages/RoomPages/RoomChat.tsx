import React, { useState } from "react";

interface RoomChatProps {
    roomId: string;
}

const RoomChat: React.FC<RoomChatProps> = ({ roomId }) => {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);

    const handleSendMessage = () => {
        if (message.trim()) {
            setMessages([...messages, message]);
            setMessage("");
        }
    };

    return (
        <div>
            <h3>Chat</h3>
            <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px" }}>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe un mensaje..."
            />
            <button onClick={handleSendMessage}>Enviar</button>
        </div>
    );
};

export default RoomChat;
