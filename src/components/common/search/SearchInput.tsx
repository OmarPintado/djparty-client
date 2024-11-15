import { ChangeEvent} from "react";
import "./css/SearchInput.css";

type SearchInputProps = {
    placeholder:string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
    placeholder,
    onChange,
}) => (
    <input
        type="text"
        onChange={onChange}
        placeholder={placeholder}
        className={`search-input`}
    />
);

export default SearchInput;