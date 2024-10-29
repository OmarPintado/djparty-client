import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import SocialButton from "../components/common/buttons/SocialButton";

export const LoginPage = () => {
    return (
        <div className="flex flex-col gap-2 items-center max-w-80 w-full    ">
            <h2>LoginPage</h2>
            <LoginForm />

            <div className="flex gap-4 items-center mt-4">
                <SocialButton
                    provider="facebook"
                    onClick={() => console.log("login facebook")}
                />
                <SocialButton
                    provider="google"
                    onClick={() => console.log("login google")}
                />
            </div>
            <p className="text-gray-custom-500">
                Not have account?{" "}
                <Link
                    to={"/signup"}
                    className="text-blue-500 hover:text-blue-600 transition-all duration-300"
                >
                    Sign up
                </Link>
            </p>
        </div>
    );
};
