import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CredentialsModel from "../../../Models/CredentialsModel";
import authService from "../../../Services/AuthServices";
import notify from "../../../Utils/Notify";
import "./Login.css";

function Login(): JSX.Element {

    const { register, handleSubmit, formState } = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await authService.login(credentials);
            notify.success(`Welcome back!`);
            navigate("/vacations-list");
        }
        catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Login">


            <form className="AuthForm" onSubmit={handleSubmit(send)}>
                <h1>WELCOME</h1>

                <label>Email: </label>
                <input type="email" {...register("email", CredentialsModel.emailValidation)} />
                <span className="Err">{formState.errors.email?.message}</span>

                <label>Password: </label>
                <input type="password" {...register("password", CredentialsModel.passwordValidation)} />
                <span className="Err">{formState.errors.password?.message}</span>

                <button>Login</button>

                <p>If not a user, please <NavLink to={"/register"}>Register</NavLink></p>

            </form>

        </div>
    );
}

export default Login;
