import { Link } from "react-router-dom";
import RegisterForm from "../components/auth/RegisterForm";

const SignUpPage = () => {
    return (
        <div className="flex flex-col gap-2 items-center max-w-80 w-full    ">
            <h2>Register</h2>
            <p className="text-white  text-center text-sm mb-8">
                Enter your information below or register with a social media
                account
            </p>
            <RegisterForm />

            <p className="text-gray-custom-500">
                Alredy have account?{" "}
                <Link
                    to={"/login"}
                    className="text-blue-500 hover:text-blue-600 transition-all duration-300"
                >
                    Login
                </Link>
            </p>
        </div>
    );
};

export default SignUpPage;
