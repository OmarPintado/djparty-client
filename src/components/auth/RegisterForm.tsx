import InputGroup from "../common/inputs/InputGroup";
import MainButton from "../common/buttons/MainButton";
const dataInputs = [
    {
        id: "1",
        placeholder: "Enter your username",
        type: "text",
    },
    {
        id: "2",
        placeholder: "Enter your email",
        type: "email",
    },
    {
        id: "3",
        placeholder: "Enter your password",
        type: "password",
    },
];
const RegisterForm = () => {
    return (
        <form className="flex flex-col gap-2 items-center max-w-80 w-full    ">
            <InputGroup
                onChange={(index, value) => {
                    console.log(index + ") value: " + value);
                }}
                values={[]}
                inputs={dataInputs}
            />
            <MainButton text="Next" type="button" />
        </form>
    );
};

export default RegisterForm;
