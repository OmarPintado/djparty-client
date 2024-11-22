import { useState, ChangeEvent, MouseEvent, useContext } from "react";
import ChangePassword from "./ChangePassword";
import UpdateProfile from "./UpdateProfile";
import "./css/perfil.css";
import { UserContext } from "../../context/UserContextProvider";
import { clientApi } from "../../services/api.";

const PerfilComponent = () => {
    const { user, setUser } = useContext(UserContext);

    const [imageFile, setImageFile] = useState<File | null>(null);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onload = () => {
                const data = {
                    fullName: user?.fullName || "",
                    email: user?.email || "",
                    token: user?.token || "",
                    id: user?.id || "",
                    url_profile: reader.result as string,
                };
                console.log(reader.result as string);
                setUser(data);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!imageFile) return;

        const formData = new FormData();
        formData.append("file", imageFile); // Asegúrate de que "file" sea el nombre correcto del campo

        console.log(formData);

        try {
            // Cambia la solicitud para enviar formData en lugar de un objeto normal
            const { data } = await clientApi.patch(
                `/user/${user?.id}`,
                { file: formData },
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Especifica que el contenido es de tipo "multipart/form-data"
                    },
                }
            );
            console.log(data);
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudo conectar con el servidor");
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
                                        "https://cdn.vectorstock.com/i/500p/33/47/no-photo-available-icon-default-image-symbol-vector-40343347.jpg"
                                    }
                                    alt="Imagen de perfil"
                                    className="profile-image"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="change-container">
                        <input
                            type="file"
                            accept="image/*"
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
                        <button
                            className="btn-save-change"
                            onClick={handleImageUpload}
                        >
                            Guardar Cambio
                        </button>
                    </div>
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
