import { Link, useRouteLoaderData } from "react-router-dom";
import "../styles/style.css"

const AuthStatus = () => {
    let { user } = useRouteLoaderData("root");

    return user ? (
        <Link className="header__button" to="/artwork/create">CREATE</Link>
    ) : (
        <Link className="header__button" to="/auth/login">Sign in</Link>
    );
}

export default AuthStatus;