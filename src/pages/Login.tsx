import { useNavigate } from "react-router-dom";
import ClothifyHeader from "./clothifyHeader.1";
import HeaderCompo from "./HeaderCompo";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";


interface IFormInput {
    email: string,
    password: string,
}

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
    const nav = useNavigate();

    const submitForm: SubmitHandler<IFormInput> = (loginData) => {
        console.log(loginData);
        axios.post('http://localhost:8081/login/login-validation', loginData)
            .then((response) => {
                switch (response.data) {
                    case ("Email and Password are correct"):
                        //say to navigate into navigate in to his main page with his name mentioned "welcome Tharika"
                        break;
                    case ("Password is incorrect. Please enter the correct Password"):
                        //Show the notification
                        var para = document.getElementById("password-incorrect");
                        para?.hidden == false;
                        //say to clear fields
                        break;
                    case ("Your email does not have an account"):
                        //Show the notification
                        var para = document.getElementById("email-not-existing");
                        para?.hidden == false;
                        //say to clear fields
                        break;
                    // default:
                    //     break;

                }
            })
    };

    return (

        <div>
            <div className="container">
                <div className="raw text-center text-capitalize">
                    <HeaderCompo />
                </div>
            </div>
            <div className="conrainer">
                <div className="raw text-center" >
                    <ClothifyHeader />
                </div>
            </div>

            <div className="container">
                <div className="raw ">
                    <h4 className="text-center"> <strong>Welcome to Clothify Store! Please Log in.</strong></h4>
                    <main className="form-signin w-100 m-auto " style={{ backgroundColor:"yellow" }}>
                        <form className="col-md-7 col-lg-8 " style={{ }}>

                            <div className="form-floating" style={{}}>

                                <input style={{}}                           
                                    type="email" className="form-control" id="floatingInput"
                                    placeholder="name@example.com"
                                    {...register("email", { required: true })}
                                    aria-invalid={errors.email ? "true" : "false"} 
                                    />
                                {errors.email?.type === "required" && (
                                    <p role="alert">Email is required</p>
                                )}

                                <label htmlFor="floatingInput">Email address</label>

                            </div>

                            <div className="form-floating">

                                <input type="password" className="form-control" id="floatingPassword"
                                    placeholder="Password"
                                    {...register("password", { required: true })}
                                    aria-invalid={errors.password ? "true" : "false"} />
                                {errors.password?.type === "required" && (
                                    <p role="alert">Password is required</p>
                                )}

                                <label htmlFor="floatingPassword">Password</label>

                            </div>

                            <button onClick={handleSubmit(submitForm)} className="btn btn-primary w-30 py-2 m-1 mb-3" type="submit"  > Log in </button>

                        </form>

                        <p className="top-mg-5">If you do not have account, First Sign Up for Free here &nbsp;
                            <button onClick={() => {nav("/register")}} className="btn btn-primary w-8 py-1" type="submit" > Sign Up </button>
                            &nbsp; & then Log in .</p>

                        <p id="password-incorrect" hidden>Password is incorrect. Please enter the correct Password</p>
                        <p id="email-not-existing" hidden >Your email does not have an account</p>

                    </main>
                </div>
            </div>
        </div>
    );
}





