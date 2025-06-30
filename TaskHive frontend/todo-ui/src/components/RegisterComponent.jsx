import React, { useState } from 'react'
import { registerUser } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'

const RegisterComponent = () => {
    const [name, setName]= useState('')
    const [username, setUsername]= useState('')
    const [email, setEmail]= useState('')
    const [password, setPassword]= useState('')
    const [errors, setErrors] = useState({}); // To store validation errors

    const validateForm = () => {
        const newErrors = {}
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (!name.trim()) {newErrors.name = 'Name cannot be empty';}
        if (!username.trim()) newErrors.username = 'Username cannot be empty'


        if (!email.trim()) {
            newErrors.email = 'Email cannot be empty';
        }
        else if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }
    
        if (!password.trim()) newErrors.password = 'Password cannot be empty'
        
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const navigator = useNavigate()
    function handleRegistrationForm(e){
        e.preventDefault();
        if (!validateForm()) {
            return; // Don't proceed if validation fails
        }

        const newUser = {name, username, email, password}
        registerUser(newUser).then((response) => {
            // alert(response.data);
            navigator('/login')
        }).catch(error => {
            console.error(error);
        })
    }

  return (
    <div className='container mt-5'>
        <br /><br />
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <div className="card">
                    {/* <div className="card-header">
                        <h2 className='text-center'>User Registration Form</h2>
                    </div> */}
                    <div className="card-body">
                        <form>
                            <div className="row mb-3">
                                <label className='col-md-3 control-label'>Name</label>
                                <div className="col-md-9">
                                    <input
                                        type='text'
                                        name='name'
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                        placeholder='enter name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    ></input>
                                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className='col-md-3 control-label'>Username</label>
                                <div className="col-md-9">
                                    <input
                                        type='text'
                                        name='username'
                                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        placeholder='enter username'
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    ></input>
                                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className='col-md-3 control-label'>Email</label>
                                <div className="col-md-9">
                                    <input
                                        type='text'
                                        name='email'
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                        placeholder='enter email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    ></input>
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label className='col-md-3 control-label'>Password</label>
                                <div className="col-md-9">
                                    <input
                                        type='password'
                                        name='password'
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        placeholder='enter password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    ></input>
                                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                                </div>
                            </div>

                            <div className="form-group mb-3 d-flex justify-content-center">
                                <button className='btn btn-success' onClick={(e) => handleRegistrationForm(e)}>Submit</button>
                            </div>
                            <hr/>
                            <div className='d-flex justify-content-center'>
                                <p style={{marginRight:"5px"}}>Already a Member?</p>
                                <a href='/login'>LogIn</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default RegisterComponent