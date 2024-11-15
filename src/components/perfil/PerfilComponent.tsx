import { useState, ChangeEvent, MouseEvent, useContext } from "react";
import ChangePassword from "./ChangePassword";
import UpdateProfile from "./UpdateProfile";
import "./css/perfil.css";
import { UserContext } from "../../context/UserContextProvider";

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
                    profileImage: reader.result as string,
                };
                setUser(data);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); // Evita el comportamiento por defecto

        if (!imageFile) return;

        const formData = new FormData();
        formData.append("profileImage", imageFile);

        try {
            const response = await fetch("/api/upload-profile-image", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Imagen subida exitosamente:", data);
                alert("Imagen de perfil actualizada");
            } else {
                console.error("Error al subir la imagen");
                alert("Hubo un error al subir la imagen");
            }
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
                            <img
                                src={
                                    user?.profileImage ||
                                    "https://via.placeholder.com/150"
                                }
                                alt="Imagen de perfil"
                                className="profile-image"
                            />
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
