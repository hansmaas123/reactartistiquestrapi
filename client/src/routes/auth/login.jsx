import { useLocation, useActionData, useNavigation, Link, Form, redirect } from "react-router-dom";
import "../../styles/style.css";
import ErrorField from "../../components/Errorfield"
import { authenticate, getAuthData } from "../../services/auth";

const loader = async () => {
    const { user } = getAuthData();
    if (user) {
        return redirect("/");
    }
    return null;
};

const action = async ({ request }) => {
    const formData = await request.formData();
    const { email, password } = Object.fromEntries(formData);

    if (!email) {
        return {
            error: { email: "Please enter an email" },
        };
    }

    if (!password) {
        return {
            error: { password: "Please enter a password" },
        };
    }

    try {
        await authenticate(email, password);
    } catch (error) {
        return {
            error: { general: error.message },
        };
    }

    let redirectTo = formData.get("redirectTo") | null;
    return redirect(redirectTo || "/");
};

const Login = () => {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let from = params.get("from") || "/";

    let navigation = useNavigation();
    let isLoggingIn = navigation.formData?.get("email") != null;

    let actionData = useActionData();

    return (
        <div className="login__wrapper">
            <div className="login__header">
                <h2 className="login__title">SIGN IN</h2>
                {from != "/" ? (
                    <p>You must log in to view the page at {from}</p>
                ) : (
                    <p>Get access to all the features</p>
                )}
            </div>
            <Form method="post">
                <div className="login__group">
                    <input type="hidden" name="redirectTo" value={from} />
                    <label className="login__item" htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="e-mail"
                        autoComplete="email"
                        defaultValue="tester@devine.be"
                        className="login__input"
                    />
                    <ErrorField data={actionData} field="email" />
                </div>
                <div className="login__group">
                    <label className="login__item" htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        defaultValue="tester"
                        className="login__input"
                    />
                    <ErrorField data={actionData} field="password" />
                </div>
                <div className="login__group login__buttons">
                    <ErrorField data={actionData} field="general" />
                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="login__button"
                    >
                        {isLoggingIn ? "LOGGING IN..." : "LOG IN"}
                    </button>
                    <Link to="/auth/register" className="login__button">
                        SIGN UP
                    </Link>
                </div>
            </Form>
        </div>
    );
};
Login.action = action;
Login.loader = loader;

export default Login;
