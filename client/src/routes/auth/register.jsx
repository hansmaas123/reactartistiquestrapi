import { Form, useNavigation, useLocation, useActionData, redirect} from "react-router-dom";
import { register } from "../../services/auth";
import ErrorField from "../../components/Errorfield";
import "../../styles/style.css";

const action = async({ request }) => {
    const formData = await request.formData();
    const { email, password, username } = Object.fromEntries(formData);

    if (!username) {
        return {
            error: { username: "Please enter a username" },
        };
    }

    if (!email) {
        return {
            error: { email: "Please enter an email" },
        };
    }

    if (!password) {
        return {
            error: { password: "Pleasde enter a password" },
        };
    }

    try {
        await register(username, password, email);
    } catch (error) {
        return {
            error: { general: error.message },
        };
    }

    let redirectTo = formData.get("redirectTo") | null;
    return redirect(redirectTo || "/");
}


const Register = () => {
    let location = useLocation();
    let params = new URLSearchParams(location.search);
    let from = params.get("from") || "/";
    let navigation = useNavigation();
    let isLoggingIn = navigation.formData?.get("email") != null;
    let actionData = useActionData();

    return (
        <div>
            <div>
                <h2>SIGN UP</h2>
            </div>
            <Form method="post">
                <input type="hidden" name="redirectTo" value={from} />
                <div className="form__group">
                    <label htmlFor="email">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        placeholder="username"
                        autoComplete="username"
                        defaultValue="tester-0"
                    />
                    <ErrorField data={actionData} field="username" />
                </div>
                <div className="form__group">
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
                        placeholder="password"
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
                        className={actionData && actionData.error ? "shake" : null}
                    >
                        {isLoggingIn ? "Sending..." : "Sign up"}
                    </button>
                </div>
            </Form>
        </div>
    );
}

Register.action = action;

export default Register;