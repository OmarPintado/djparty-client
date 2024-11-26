import CreateRoomForm from "../components/room/CreateRoomForm";
import './css/CreateRoom.css'
const CreateRoom = () => {
    return (
        <div className="create-room-container">
            <h1>Create Room</h1>
            <CreateRoomForm />
        </div>
    );
};

export default CreateRoom;
