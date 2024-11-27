import { useState, ChangeEvent, useContext, FormEvent } from "react";
import ChangePassword from "./ChangePassword";
import UpdateProfile from "./UpdateProfile";
import "./css/perfil.css";
import { UserContext } from "../../context/UserContextProvider";
import { clientApi } from "../../services/api.";
import { isAxiosError } from "axios";

const PerfilComponent = () => {
    const { user, setToastProps, setUser } = useContext(UserContext);

    const [file, setImageFile] = useState<File | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const maxSize = 4 * 1024 * 1024;
            if (file.size > maxSize) {
                setToastProps({
                    class: "error",
                    message: "El tamaño del archivo excede el límite de 4MB.",
                });
                return;
            }

            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                setUser({ ...user!, url_profile: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!file) return;

            // Crear el objeto FormData
            const formData = new FormData();
            formData.append("file", file); // El nombre debe coincidir con el definido en el backend

            const { data } = await clientApi.patch(
                `/user/${user?.id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            setUser({ ...user, ...data });
            setToastProps({
                class: "success",
                message: "Imagen actualizada con éxito.",
            });
        } catch (error) {
            if (isAxiosError(error)) {
                setToastProps({
                    class: "error",
                    message: "No se pudo cargar la imagen",
                });
            }
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-info-container">
                <div className="profile-image-change">
                    <div className="profile-image-container">
                        <div className="profile-border">
                            <div className="img-content">
                                <img
                                    src={
                                        user?.url_profile ||
                                        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1732677740~exp=1732681340~hmac=0569628e1294ee5ba641581e0e3bc8facdde3430ba3453e1e55ab28dbedaeab2&w=740"
                                    }
                                    alt="Imagen de perfil"
                                    className="profile-image"
                                />
                            </div>
                        </div>
                    </div>
                    <form
                        onSubmit={(e) => onSubmit(e)}
                        className="change-container"
                    >
                        <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.gif"
                            onChange={handleImageChange}
                            id="upload-button"
                            style={{ display: "none" }}
                        />
                        <label
                            htmlFor="upload-button"
                            className="change-image-button text-white"
                        >
                            Cambiar Imagen
                        </label>
                        <button className="btn-save-change" type="submit">
                            Guardar Cambio
                        </button>
                    </form>
                </div>
                <h2 className="profile-heading">Información Personal</h2>
                <UpdateProfile user={user} />
                <h2 className="profile-heading">Cambiar Contraseña</h2>
                <ChangePassword />
            </div>
        </div>
    );
};

export default PerfilComponent;
