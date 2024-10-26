type MainButtonProps = {
    text: string;
    action: () => void;
};
const MainButton = ({ text, action }: MainButtonProps) => {
    return (
        <button className="" onClick={() => action()}>
            {text}
        </button>
    );
};

export default MainButton;
