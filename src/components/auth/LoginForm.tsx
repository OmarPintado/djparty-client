import MainButton from "../common/buttons/MainButton";
import InputGroup from "../common/inputs/InputGroup";
import "./css/LoginForm.css"; 

const dataInputs = [
    {
        id: "1",
        placeholder: "Enter your email",
        type: "email",
    },
    {
        id: "2",
        placeholder: "Enter your password",
        type: "password",
    },
];

const LoginForm = () => {
    return (
        <form className="login-form">
            <InputGroup
                onChange={(index, value) => {
                    console.log(index + ") value: " + value);
                }}
                values={[]}
                inputs={dataInputs}
            />
            <MainButton text="Login" type="submit" />
        </form>
    );
};

export default LoginForm;