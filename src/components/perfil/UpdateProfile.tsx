import { SubmitHandler, useForm } from "react-hook-form";
import { User } from "../../types";
import { useContext } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { clientApi } from "../../services/api.";
import { isAxiosError } from "axios";

type UpdateProfileProps = {
    user: User | undefined;
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
    const { setToastProps } = useContext(UserContext);
    const onSubmit: SubmitHandler<UpdateProfileFormInputs> = async (
        updateUserDataDto
    ) => {
        try {
            const { data } = await clientApi.patch(
                `/user/${user?.id}`,
                updateUserDataDto
            );
            console.log("Respuesta del servidor:", data);
            /*  setToastProps({
                class: "success",
                message: "Imagen actualizada con éxito.",
            });*/
        } catch (error) {
            if (isAxiosError(error)) {
                setToastProps({
                    class: "error",
                    message: error?.response?.data.message,
                });
            }
        }
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
