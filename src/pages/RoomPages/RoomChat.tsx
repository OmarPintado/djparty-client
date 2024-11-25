import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MainInput from "../../components/common/inputs/MainInput";
import MainButton from "../../components/common/buttons/MainButton";
import "./css/RoomChat.css";

interface RoomChatProps {
    roomId: string;
}

interface ChatForm {
    message: string;
}

const RoomChat: React.FC<RoomChatProps> = ({ roomId }) => {
    const [messages, setMessages] = useState<string[]>([]);
    const { register, handleSubmit, reset } = useForm<ChatForm>();

    const handleSendMessage = (data: ChatForm) => {
        if (data.message.trim()) {
            setMessages([...messages, data.message]);
            reset(); // Limpia el input después de enviar
        }
    };

    return (
        <div>
            <h3>Chat</h3>
            <div className="chat-container">
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <form onSubmit={handleSubmit(handleSendMessage)}>
                <MainInput
                    type="text"
                    name="message"
                    placeholder="Escribe un mensaje..."
                    register={register}
                    validation={{ required: "El mensaje no puede estar vacío" }}
                />
                <MainButton text="Send" type="submit" />
            </form>
        </div>
    );
};

export default RoomChat;
