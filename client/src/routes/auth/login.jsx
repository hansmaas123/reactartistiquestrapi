import { useLocation, useActionData, useNavigation, Link, Form } from "react-router-dom";
import "../../styles/style.css";
import ErrorField from "../../components/Errorfield"

const Login = () => {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let from = params.get("from") || "/";

    let navigation = useNavigation();
    let isLoggingIn = navigation.formData?.get("email") != null;

    let actionData = useActionData();

    return (
        <section>
            <hgroup className="signin__header">
                <h2>Sign in</h2>
                {from != "/" ? (
                    <p>You must log in to view the page at {from}</p>
                ) : (
                    <p>Get access to all the features</p>
                )}
            </hgroup>
            <Form method="post">
                <div className="form__group">
                    <input type="hidden" name="redirectTo" value={from} />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="e-mail"
                        autoComplete="email"
                        defaultValue="tester@devine.be"
                    />
                    <ErrorField data={actionData} field="email" />
                </div>
                <div className="form__group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        defaultValue="tester"
                    />
                    <ErrorField data={actionData} field="password" />
                </div>
                <div className="form__group">
                    <ErrorField data={actionData} field="general" />
                    <button
                        type="submit"
                        disabled={isLoggingIn}
                        className="login__button"
                    >
                        {isLoggingIn ? "Logging in..." : "Login"}
                    </button>
                    <Link to="/auth/register" className="login__register">
                        ...or Sign up!
                    </Link>
                </div>
            </Form>
        </section>
    );
};


export default Login;
