import {Route, Routes} from 'react-router-dom';
import {LoginPage} from '../pages/LoginPage.tsx';

export const LoginRouter = () => {
    return (
        <>
            <Routes>
                <Route path='' element={<LoginPage />} />
            </Routes>
        </>
    );
};
