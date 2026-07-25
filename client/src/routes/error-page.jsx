import { useRouteError } from "react-router-dom";
import "../styles/style.css";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" className="error__page">
            <h1>BUMMER!</h1>
            <p>Something went wrong!</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}
