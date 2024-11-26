import "./DjPartyApp.css";
import "bootstrap/dist/css/bootstrap.min.css";
//import {LoginRouter} from "./router/LoginRouter.tsx";
//import {RoomHome} from "./pages/RoomHome.tsx";
import { AuthRouter } from "./router/AuthRouter.tsx";

function DjPartyApp() {
    return (
        <>
            {/*<RoomHome/>*/}
            {<AuthRouter />}
        </>
    );
}

export default DjPartyApp;
