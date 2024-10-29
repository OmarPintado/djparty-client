import { ChangeEvent, KeyboardEvent, FocusEvent } from "react";

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
        className={`text-sm outline-none bg-transparent transition-input rounded caret-white text-white ${
            isVisible
                ? "opacity-100 w-full max-w-auto"
                : "opacity-0 w-0 max-w-0"
        }`}
    />
);

export default SearchInput;
