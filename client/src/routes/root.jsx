import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import { getAuthData } from '../services/auth';

const loader = async () => {
    const data = getAuthData();
    return data;
};

const Root = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
        </>
    );
}
Root.loader = loader;
export default Root;