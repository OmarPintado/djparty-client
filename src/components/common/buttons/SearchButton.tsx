import { IoSearchSharp } from "react-icons/io5";
import "./css/SearchButton.css";

type SearchButtonProps = {
    onClick: () => void;
};

const SearchButton = ({ onClick }: SearchButtonProps) => {
    return (
        <IoSearchSharp
            className="search-button-icon"
            onClick={onClick}
        />
    );
};

export default SearchButton;