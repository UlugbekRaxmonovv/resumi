import axios from "../../api";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";
import { PiEyeFill, PiEyeSlashFill } from "react-icons/pi";

interface FormState {
    email: string;
    password: string;
    phone_number: string;
  }

  const initialState: FormState = {
    email: "",
    phone_number: "",
    password: "",
  };
  
const SignUp = () => {
    const [eye, setEye] = useState<boolean>(false);
    const [state, setState] = useState<FormState>(initialState);


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };



      const handleSubmit =  (e: React.FormEvent) => {
        e.preventDefault();
        const product = {
            email: state.email,
            password: state.password,
            phone_number: state.phone_number,
        };
           axios
          .post("/users", product)
          .then((response) => {
             console.log(response);
             toast("Registration Successful!");
           })
            .catch((error) => {
             console.error("Error:", error);
             toast("Registration failed!");
           });
           

      };
    return (
        <div className="hom" >
            <div className="container">
                <div className="flex justify-center items-center h-[100vh]">
                    <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-lg max-w-sm w-full">
                        <form action="" className="flex flex-col" onSubmit={handleSubmit}>
                            <h1 className="text-center text-4xl py-[20px]">Sign up</h1>
                            <div className="form-group mb-1">
                                <label className="text-lg font-semibold">Email address</label>  <br />
                                <input 
                                  name="email"
                                  onChange={handleChange}
                                  value={state.email}
                                type="email" className="form-control border outline-none focus:border-sky-500 border-gray-300 p-2 rounded mt-1 w-full" id="email" required />
                            </div>
                                <label className="text-lg font-semibold">Full name</label>
                            <div className="form-group">
                                <input
                                 name="phone_number"
                                 onChange={handleChange}
                                 value={state.phone_number}
                                type="text" className="form-control border outline-none focus:border-sky-500 border-gray-300 p-2 rounded mt-1 w-full" id="email" required />
                            </div>
                                <label className="text-lg font-semibold ">Password</label> 
                                <div className="form-group mb-6 flex justify-between items-center relative  ">
                                <input 
                                 name="password"
                                 onChange={handleChange}
                                 value={state.password}
                                type={eye ? "text" : "password"} className="form-control border outline-none focus:border-sky-500 border-gray-300 p-2 rounded mt-1 w-full " id="password" required />
                                <div className="absolute right-2 top-[50%] -translate-y-[50%] cursor-pointer" onClick={() => setEye(prev => !prev)}>
                                 {eye ? <PiEyeSlashFill /> : <PiEyeFill />}
                        </div>
                            </div>
                            <button type="submit" className="btn btn-primary bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
