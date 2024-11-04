import { ChangeEvent, KeyboardEvent, useState } from "react";
import SearchInput from "./SearchInput";
import SearchButton from "../buttons/SearchButton";
import "./css/SearchBar.css";

type SearchBarProps = {
    onSearch: (query: string) => void;
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
            onSearch(searchTerm);
        }
    };

    return (
        <div
            className={`search-bar ${showInput ? "border-active" : ""}`}
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