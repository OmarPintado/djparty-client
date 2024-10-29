import { IoSearchSharp } from "react-icons/io5";

type SearchButtonProps = {
    onClick: () => void;
};

const SearchButton = ({ onClick }: SearchButtonProps) => {
    return (
        <IoSearchSharp
            className="text-white text-xl cursor-pointer"
            onClick={onClick}
        />
    );
};

export default SearchButton;
