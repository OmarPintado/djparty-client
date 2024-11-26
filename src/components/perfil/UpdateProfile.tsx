import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../types";

type UpdateProfileProps = {
    user: User|undefined;
};
type UpdateProfileFormInputs = {
    fullName: string;
    email: string;
};
const UpdateProfile = ({ user }: UpdateProfileProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateProfileFormInputs>({
        defaultValues: {
            fullName: user?.fullName,
            email: user?.email,
        },
    });

    const onSubmit: SubmitHandler<UpdateProfileFormInputs> = (data) => {
        console.log("Datos enviados:", data);
    };

    return (
        <div className="update-profile">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="form-update-profile"
            >
                <div className="form-change-camp">
                    <label className="fw-normal text-white fs-5">
                        Full Name
                    </label>
                    <input
                        type="text"
                        {...register("fullName", {
                            required: "El nombre completo es obligatorio",
                        })}
                        className="form-input"
                    />
                    {errors.fullName && (
                        <p className="error-message-form">
                            {errors.fullName.message}
                        </p>
                    )}
                </div>

                <div className="form-change-camp">
                    <label className="fw-normal text-white fs-5">Email</label>
                    <input
                        type="email"
                        {...register("email", {
                            required: "El correo electrónico es obligatorio",
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                                message: "El formato del correo es inválido",
                            },
                        })}
                        className="form-input"
                    />
                    {errors.email && (
                        <p className="error-message-form">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <button className="btn-save-change mt-3" type="submit">
                    Actualizar Perfil
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;
