import MainButton from "../common/buttons/MainButton";
import InputGroup from "../common/inputs/InputGroup";
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
        <form className="w-full flex items-center flex-col gap-2">
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
