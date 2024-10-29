// SearchBar.js
import { ChangeEvent, KeyboardEvent, useState } from "react";
import SearchInput from "./SearchInput"; // Asegúrate de importar el componente correcto
import SearchButton from "../buttons/SearchButton"; // Asegúrate de importar el componente correcto
type SearchBarProps = {
    onSearch: (query: string) => void; // Define que onSearch es una función que toma un string y no devuelve nada
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [showInput, setShowInput] = useState<boolean>(false);

    const handleIconClick = () => {
        if (showInput && searchTerm.trim()) {
            onSearch(searchTerm);
        } else {
            setShowInput(true);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const handleInputBlur = () => {
        if (!searchTerm) {
            setShowInput(false);
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            onSearch(searchTerm); // Llama a la función de búsqueda al presionar Enter
        }
    };

    return (
        <div
            className={`flex items-center justify-end hover:border-white/50 transition-all duration-500  border-2 border-white/20 rounded-xl  p-2 gap-2 bg-transparent shadow-sm ${
                showInput ? "border-white/50" : " "
            }`}
            onClick={() => setShowInput(true)}
        >
            {showInput && (
                <SearchInput
                    value={searchTerm}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    onKeyDown={handleKeyDown}
                    isVisible={showInput}
                />
            )}

            <SearchButton onClick={handleIconClick} />
        </div>
    );
};

export default SearchBar;
