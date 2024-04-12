import React, { useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './login.css';
const Login = () => {
    const [formData, setFormData] = useState({
        name: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if (!formData.name.trim()) {
            formIsValid = false;
            errors.name = "Name is required";
        }

        if (!formData.password.trim()) {
            formIsValid = false;
            errors.password = "Password is required";
        }
        if( formData.password.length < 6){
            formIsValid = false;
            errors.password = "Password must be at least 6 characters long";
        }

        setErrors(errors);
        return formIsValid;
    };

    const onFormData = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log(formData);
            fetch(`${process.env.REACT_APP_API_URL}/login/admin`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
                method: 'POST'
            }).then(res => res.json())
                .then(data => {
                    console.log(data.status);
                    if (data.status === 'ok') {
                        localStorage.setItem('token', data.token);
                        localStorage.setItem('isLoggedIn', true);
                        window.location.href = '/';  
                    }
                    
                    alert(data.message);
                    
                })
                .catch(err => console.log(err));
            // You can submit the form data here
        }
    };

    return (
        <>
        <div className='login container flex justify-center flex-col items-center login ' style={{height:'100vh'}}>
            <form className='w-2/5 m-10 rounded-md py-5 shadow-md shadow-slate-600  bg-blend-lighten flex-col  justify-center flex text-white' method='post' action='/login' style={{ width: '27%', background:'rgba(10,10,30,0.5)'}} onSubmit={onFormData}>
                <h1 className=' text-2xl place-content-center text-center font-bold m-3'>Login</h1>
                <div className='  border-b border-slate-100 '></div>
                <div className='p-4  pb-0 m-0'>
                    <div className='Name m-2 flex justify-start flex-col p-1'>
                        <input type='text' id='name' placeholder='Enter Name' className={`outline-none border-slate-200 bg-transparent placeholder:text-white w-full p-2 my-2 rounded-sm border-b-2 ${errors.name ? 'border-red-500' : 'border-slate-500'}`} onChange={handleChange} />
                        {errors.name && <p className="text-red-500">{errors.name}</p>}
                    </div>
                    <div className='password m-2 flex justify-self-start flex-col p-1 relative  items-start'>
                        <div className='password flex justify-between items-center w-full p-1'>
                            <input type={showPassword ? 'text' : 'password'} id='password' placeholder='Enter Password' className={`outline-none w-full p-2 my-2 rounded-sm border-b-2 border-slate-200 bg-transparent placeholder:text-white ${errors.password ? 'border-red-500' : 'border-slate-500'}`} onChange={handleChange} />
                            <button type="button" className=" bg-blend-normal" onClick={toggleShowPassword}>
                                {showPassword ? <VisibilityOff color='' /> : <Visibility />}
                            </button>
                        </div>
                        {errors.password && <p className="text-red-500">{errors.password}</p>}
                        <a href='/login' className='text-left text-slate-50 font-serif my-3 hover:text-slate-200  hover:underline' >Forgot Password?</a>
                    </div>
                    <button type='submit' className=' rounded-full my-4 m-1 p-2  font-semibold text-lg w-full outline-2 outline-black hover:bg-slate-500 focus:outline outline' >Login</button>
                </div>
                <div className='text-center m-0 p-0'>
                    Not a member? <a href='/signup' className='text-sky-400 hover:text-slate-500 hover:underline'>Sign Up</a>
                </div>
            </form>
        </div>
        <div className=''></div>
        </>
    )
}

export default Login;
