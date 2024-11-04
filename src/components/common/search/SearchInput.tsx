import { ChangeEvent, KeyboardEvent, FocusEvent } from "react";
import "./css/SearchInput.css";

type SearchInputProps = {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: FocusEvent<HTMLInputElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
    isVisible: boolean;
};

const SearchInput: React.FC<SearchInputProps> = ({
    value,
    onChange,
    onBlur,
    onKeyDown,
    isVisible,
}) => (
    <input
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        placeholder="Escribe tu búsqueda..."
        className={`search-input ${isVisible ? "visible" : "hidden"}`}
    />
);

export default SearchInput;