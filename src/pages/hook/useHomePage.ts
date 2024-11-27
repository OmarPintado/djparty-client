import { useNavigate } from 'react-router-dom';

const useHomePage = () => {
    const navigate = useNavigate();


    const handleCreateRoomClick = () => {
        navigate('/create-room');
    };

    return { handleCreateRoomClick };
};

export default useHomePage;
