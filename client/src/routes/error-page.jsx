import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page" style={{ padding: "3rem" }}>
            <h1>BUMMER!</h1>
            <p>Something went wrong!</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}
