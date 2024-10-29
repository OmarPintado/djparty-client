import { FaGoogle, FaFacebookF } from "react-icons/fa";

type SocialButtonProps = {
    provider: "google" | "facebook";
    onClick: () => void;
};

const SocialButton = ({ provider, onClick }: SocialButtonProps) => {
    const isGoogle = provider === "google";

    return (
        <button
            onClick={onClick}
            className={`flex items-center text-2xl justify-center w-full py-2 px-4 rounded-lg transition duration-200 text-white hover:opacity-90`}
        >
            {isGoogle ? (
                <>
                    <FaGoogle className="mr-2" />
                </>
            ) : (
                <>
                    <FaFacebookF className="mr-2" />
                </>
            )}
        </button>
    );
};

export default SocialButton;
