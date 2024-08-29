import { FormEvent, useState } from "react";
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useFormInputValue } from "../../components/hook/useFormInputValue";
import axios from "../../api";

interface FormState {
    email: string;
    password: string;
}

const initialState: FormState = {
    email: "",
    password: ""
};
const Login = () => {

    const navigate = useNavigate();
    const [eye, setEye] = useState<boolean>(false);
    const { handleChange, setState, state } = useFormInputValue<FormState>(initialState);
    // let isLogin = localStorage.getItem("x-auth-token")
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user={
            email: state.email,
            password: state.password
        }
        console.log(user);  
        setState(initialState)
        axios
        .post(`/users/login`, user)
        .then((response) => {
          localStorage.setItem("x-auth-token", response.data.access_token);
          toast.success('Successfully toasted!')
          navigate("/resumi");
        })
        .catch((error) => {
          console.error(error);
          toast.error("This didn't work.")
        });
      
    };
    return (
        <div className="hom" >
            <div className="container">
                <div className="flex justify-center items-center h-[100vh]">
                    <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-sm w-full">
                        <form action="" className="flex flex-col" onSubmit={handleSubmit}>
                            <h1 className="text-center text-4xl py-[20px]">Sign in</h1>
                            <div className="form-group mb-1">
                                <label className="text-lg font-semibold">Email address</label>  <br />
                                <input type="email"
                                   value={state.email}
                                   onChange={handleChange}
                                   name="email"
                                className="form-control border outline-none focus:border-sky-500 border-gray-300 p-2 rounded mt-1 w-full" id="email" required />
                            </div>
                                <label className="text-lg font-semibold">Password</label> 
                                <div className="form-group mb-6 flex justify-between items-center relative ">
                                <input 
                                  value={state.password}
                                  onChange={handleChange}
                                  name="password"
                                  type={eye ? "text" : "password"} className="form-control border outline-none focus:border-sky-500 border-gray-300 p-2 rounded mt-1 w-full" id="password" required />
                                <div className="absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer" onClick={() => setEye(prev => !prev)}>
                                 {eye ? <PiEyeSlashFill /> : <PiEyeFill />}
                        </div>
                            </div>
                            <button type="submit" className="btn btn-primary bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">Login</button>
                            <p className="text-center py-[5px]">Already signed up? <Link className="text-blue-600" to={'/signup'}>Go to sign up</Link></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
