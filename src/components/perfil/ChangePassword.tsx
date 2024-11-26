import  { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import "./css/perfil.css";

// Definimos la interfaz para los datos del formulario
interface ChangePasswordFormInputs {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

const ChangePassword = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<ChangePasswordFormInputs>();
    const [message, setMessage] = useState<string>("");

    // Definimos el tipo de datos esperado para el manejador de envío
    const onSubmit: SubmitHandler<ChangePasswordFormInputs> = (data) => {
        if (data.newPassword !== data.confirmPassword) {
            setMessage("Las contraseñas no coinciden.");
            return;
        }
        setMessage("Contraseña cambiada exitosamente.");
    };

    const newPassword = watch("newPassword");

    return (
        <div className="change-password-container">
            <form onSubmit={handleSubmit(onSubmit)} className="form-change-password">
                {/* Contraseña Actual */}
                <div className="form-change-camp">
                    <label className="fw-normal text-white fs-5">
                        Contraseña Actual
                    </label>
                    <input
                        type="password"
                        {...register("currentPassword", {
                            required: "La contraseña actual es obligatoria",
                        })}
                        className="form-input"
                    />
                    {errors.currentPassword && (
                        <p className="error-message-form">
                            {String(errors.currentPassword.message)}
                        </p>
                    )}
                </div>

                {/* Nueva Contraseña */}
                <div className="form-change-camp">
                    <label className="fw-normal text-white fs-5">
                        Nueva Contraseña
                    </label>
                    <input
                        type="password"
                        {...register("newPassword", {
                            required: "La nueva contraseña es obligatoria",
                            minLength: {
                                value: 8,
                                message: "La nueva contraseña debe tener al menos 8 caracteres",
                            },
                        })}
                        className="form-input"
                    />
                    {errors.newPassword && (
                        <p className="error-message-form">
                            {String(errors.newPassword.message)}
                        </p>
                    )}
                </div>

                {/* Confirmar Nueva Contraseña */}
                <div className="form-change-camp">
                    <label className="fw-normal text-white fs-5">
                        Confirmar Nueva Contraseña
                    </label>
                    <input
                        type="password"
                        {...register("confirmPassword", {
                            required: "Debes confirmar la nueva contraseña",
                            validate: (value) =>
                                value === newPassword || "Las contraseñas no coinciden",
                        })}
                        className="form-input"
                    />
                    {errors.confirmPassword && (
                        <p className="error-message-form">
                            {String(errors.confirmPassword.message)}
                        </p>
                    )}
                </div>

                <button className="btn-save-change mt-3" type="submit">
                    Cambiar Contraseña
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ChangePassword;