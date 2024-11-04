import SocialButton from "./SocialButton";
import "./css/SocialButtonGroup.css";
const SocialButtonGroup = () => {
    return (
        <div className="social-buttons">
            <SocialButton
                provider="facebook"
                onClick={() => console.log("login facebook")}
            />
            <SocialButton
                provider="google"
                onClick={() => console.log("login google")}
            />
        </div>
    );
};

export default SocialButtonGroup;
