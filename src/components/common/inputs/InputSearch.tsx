import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

type SearchInputProps = {
    placeholder?: string;
    onSearch: (value: string) => void;
};

const SearchInput = ({ placeholder = "Search...", onSearch }: SearchInputProps) => {
    const [query, setQuery] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value); // Ejecuta la función de búsqueda en tiempo real
    };

    return (
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%', maxWidth: '400px' }}>
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={handleInputChange}
                style={{
                    width: '100%',
                    padding: '10px 40px 10px 15px', // Espacio para el ícono a la derecha
                    borderRadius: '25px',
                    border: '1px solid #ccc',
                    outline: 'none',
                    backgroundColor: 'transparent',
                    color: 'white',
                    fontSize: '16px'
                }}
            />
            <IoSearchSharp 
                style={{
                    position: 'absolute',
                    right: '15px', // Mueve el ícono al lado derecho
                    color: 'white',
                    fontSize: '20px',
                }}
            />
        </div>
    );
};

export default SearchInput;
