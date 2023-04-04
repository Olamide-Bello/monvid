import React, { useContext, useRef } from 'react'
import { useForm } from 'react-hook-form';
import { Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import './SignUp.css'
import './Mobile.css'
import { toast } from 'react-toastify';
import { GlobalContext } from '../GlobalContext.js';

function SignUpModal() {
    const {logUser, handleUser, handleSignUpModal, handleModal, matches} = useContext(GlobalContext)
    const dataRef = useRef(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = () => {
        handleSignUpModal()
        handleModal()
    }

    const toggleModal = () => {
        handleSignUpModal()
    }
    const OnSubmit = async (data) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "https://monvid.pages.dev");
        const updated = {...data, userType: "user"}
        console.log(updated)
        const raw = JSON.stringify(updated);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            mode: 'cors'
        };
        const response = await fetch('https://api-monvid.onrender.com/users/signup', requestOptions)
        const result = await response.json()
        dataRef.current= result
        logUser(dataRef.current.token)
        handleUser(dataRef.current.user)
        console.log(dataRef.current.token)
        toast.success("Welcome back!")
        handleSignUpModal()

    }

    return (
        <div className={matches ? "mobile-modal-container" : 'modal-container'}>
            <div className={ matches ? 'mobile-sign-in-modal' :'sign-in-modal'}>
                <Container>
                    <div className={matches ? 'mobile-modal-header' : 'modal-header'}>
                        <h1><strong>Create a Monvid user account</strong></h1>
                        <p><em>Sign up to shop for your hotel supplies</em></p>
                        <FontAwesomeIcon className={matches ? 'mobile-modal-exit' : 'modal-exit'} icon={faXmark} size={matches ? 'lg' :  '2x'} onClick={toggleModal} />

                    </div>
                    <form onSubmit={handleSubmit(OnSubmit)}>
                        <div className='form-group'>
                            <input 
                                type="name"
                                name="name"
                                id="name"
                                placeholder="username"
                                {...register("name",
                                    {
                                        required: "Username is required"
                                    })
                                }
                            />
                            {errors.username && (<p className="errorMsg">{errors.username.message}</p>)}
                        </div>
                        <div className='form-group'>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="enter your email here"
                                {...register("email",
                                    {
                                        required: "Email is required.",
                                        pattern: {
                                            value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                                            message: "Email is not valid."
                                        }
                                    })
                                }
                            />
                            {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                        </div>
                        <div className='form-group'>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="password"
                                {...register("password",
                                    {
                                        required: true, minLength: {
                                            value: 6,
                                            message: "Password should be at-least 6 characters."
                                        }
                                    })
                                }
                            />
                            {errors.password?.type === "required" && (<p className="errorMsg">Password is required.</p>)}
                            {errors.password && (<p className="errorMsg">{errors.password.message}</p>)}
                        </div>
                        <button type='submit' id='submit-btn'><strong>Sign up</strong></button>
                        <br/>
                        <br/>
                        <p>Already have an account? <span style={{color: 'blue', cursor: 'pointer'}} onClick={handleLogin}>Login Here</span></p>

                    </form>
                </Container>
            </div>
        </div>

    )
}

export default SignUpModal