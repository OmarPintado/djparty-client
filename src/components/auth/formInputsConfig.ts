export const dataInputsRegister = [
    {
        id: "1",
        name: "fullName",
        placeholder: "Enter your full name",
        type: "text",
        validation: {
            required: "Full Name is required",
            minLength: {
                value: 8,
                message: "Full name must be at least 8 characters",
            },
        },
    },
    {
        id: "2",
        name: "email",
        placeholder: "Enter your email",
        type: "email",
        validation: {
            required: "Email is required",
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
            },
        },
    },
    {
        id: "3",
        name: "password",
        placeholder: "Enter your password",
        type: "password",
        validation: {
            required: "Password is required",
            minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
            },
        },
    },
];

export const dataInputsLogin = [
    {
        id: "1",
        name: "email",
        placeholder: "Enter your email",
        type: "email",
        validation: {
            required: "Email is required",
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
            },
        },
    },
    {
        id: "2",
        name: "password",
        placeholder: "Enter your password",
        type: "password",
        validation: {
            required: "Password is required",
            minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
            },
        },
    },
];
