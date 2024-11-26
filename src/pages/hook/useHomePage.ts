import { useNavigate } from 'react-router-dom';

const useHomePage = () => {
    const navigate = useNavigate();

    const handleSearch = (query: string) => {
        console.log("Realizando búsqueda con el término:", query);
    };

    const handleCreateRoomClick = () => {
        navigate('/create-room');
    };

    return { handleSearch, handleCreateRoomClick };
};

export default useHomePage;
