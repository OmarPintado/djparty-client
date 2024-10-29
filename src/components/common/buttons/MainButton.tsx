import { Link } from "react-router-dom"; // Asegúrate de tener react-router-dom instalado

type MainButtonProps = {
    text: string;
    onClick?: () => void;
    type?: "button" | "submit";
    link?: string;
};

const MainButton = ({
    text,
    onClick,
    type = "button",
    link,
}: MainButtonProps) => {
    const buttonContent = (
        <div className="mx-auto bg-primary-gradient min-w-[12rem] py-3 tracking-wider rounded-2xl text-white font-semibold text-sm px-10 hover:bg-primary-gradient-hover transition duration-500 ease-in-out">
            {text}
        </div>
    );

    return (
        <>
            {link ? (
                <Link
                    to={link}
                    className="p-0.5 focus:bg-stroke-gradient outline-none rounded-2xl"
                >
                    {buttonContent}
                </Link>
            ) : (
                <button
                    type={type}
                    onClick={onClick}
                    className="p-0.5 focus:bg-stroke-gradient outline-none rounded-2xl"
                >
                    {buttonContent}
                </button>
            )}
        </>
    );
};

export default MainButton;
