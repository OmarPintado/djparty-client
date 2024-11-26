import { ChangeEvent } from "react";
import SearchInput from "./SearchInput";
import SearchButton from "../buttons/SearchButton";
import "./css/SearchBar.css";

type SearchBarProps = {
    onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: SearchBarProps) => {
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        onSearch(e.target.value);
    };
    return (
        <div className={`search-bar`}>
            <SearchInput
                placeholder={"Search Rooms..."}
                onChange={handleInputChange}
            />
            <SearchButton />
        </div>
    );
};

export default SearchBar;
