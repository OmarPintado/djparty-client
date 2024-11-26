import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import MainInput from "../../components/common/inputs/MainInput";
import MainButton from "../../components/common/buttons/MainButton";
import { useSocket } from "../../context/SocketContextProvider"; // Importa el contexto del socket
import "./css/RoomChat.css";
import { UserContext } from "../../context/UserContextProvider";
import { getCurrentTime, MessageData } from "../../services/socketService";

interface RoomChatProps {
    roomId: string;
}

interface ChatForm {
    message: string;
}

const RoomChat: React.FC<RoomChatProps> = ({ roomId }) => {
    const [messages, setMessages] = useState<MessageData[]>([]);
    const { register, handleSubmit, reset } = useForm<ChatForm>();
    const { socket, sendMessage } = useSocket();
    const { user } = useContext(UserContext);
    // Escucha los mensajes recibidos a través del socket
    useEffect(() => {
        const handleReceiveMessage = (message: MessageData) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        };
        socket?.on("SENDMESSAGEROOM", handleReceiveMessage);
        return () => {
            socket?.off("SENDMESSAGEROOM", handleReceiveMessage);
        };
    }, [socket]);

    const handleSendMessage = (data: ChatForm) => {
        if (data.message.trim()) {
            sendMessage({
                roomId,
                message: data.message,
                userName: user?.fullName!,
                userId: user?.id!,
                time: getCurrentTime(),
            });
            reset();
        }
    };
    useEffect(() => {
        console.log(messages);
    }, [messages]);
    return (
        <div>
            <h3>Chat</h3>
            <div className="chat-container">
                <div className="chat">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`chat-message ${
                                msg.userName === user?.fullName
                                    ? "my-message"
                                    : "other-message"
                            }`}
                        >
                            <p className="message-username">{msg.userName}</p>
                            <p className="message">{msg.message}</p>
                            <p className="message-time">{msg.time}</p>
                        </div>
                    ))}
                </div>
            </div>
            <form
                className="form-chat"
                onSubmit={handleSubmit(handleSendMessage)}
            >
                <MainInput
                    className="mb-3"
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
