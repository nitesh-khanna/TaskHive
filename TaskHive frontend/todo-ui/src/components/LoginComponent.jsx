import React, { useState } from 'react'
import { isUserLoggedIn, loginUser, saveLoggedInUser, storeToken } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

const LoginComponent = () => {

    const [usernameOrEmail, setUsernameOrEmail]= useState('')
    const [password, setPassword]= useState('')
    const [error, setError] = useState('');
    const [formCheck, setFormCheck] = useState({});

    const navigator = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!usernameOrEmail.trim()) newErrors.usernameOrEmail = 'Username/Email cannot be empty';
        if (!password.trim()) newErrors.password = 'Password cannot be empty';
        
        setFormCheck(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleLoginForm(e){
        e.preventDefault();
        if(!validateForm()){
            return;
        }
        await loginUser(usernameOrEmail, password).then((response) => {

            // const token = 'Basic ' + window.btoa(usernameOrEmail + ":" + password);
            const token = 'Bearer ' + response.data.accessToken;
            const role = response.data.role;

            storeToken(token);

            saveLoggedInUser(usernameOrEmail, role)
            navigator('/todos')
            window.location.reload(false)
        }).catch(error => {
            console.error(error);
            setError('Invalid Credentials');
        })
    }


  return (
    <div className='container mt-5'>
        <br /><br />
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <div className="card">
                    {/* <div className="card-header">
                        <h2 className='text-center'>Login Form</h2>
                    </div> */}
                    <div className="card-body">
                        <form>
                            <div className="row mb-3">
                                <label className='col-md-3 control-label'>Username/Email</label>
                                <div className="col-md-9">
                                    <input
                                        type='text'
                                        name='usernameOrEmail'
                                        className={`form-control ${formCheck.usernameOrEmail ? 'is-invalid' : ''}`}
                                        placeholder='enter username or email'
                                        value={usernameOrEmail}
                                        onChange={(e) => setUsernameOrEmail(e.target.value)}
                                    />
                                    {formCheck.usernameOrEmail && <div className="invalid-feedback">{formCheck.usernameOrEmail}</div>}
                                </div>
                            </div>
                            
                            <div className="row mb-3">
                                <label className='col-md-3 control-label'>Password</label>
                                <div className="col-md-9">
                                    <input
                                        type='password'
                                        name='password'
                                        className={`form-control ${formCheck.password ? 'is-invalid' : ''}`}
                                        placeholder='enter password'
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {formCheck.password && <div className="invalid-feedback">{formCheck.password}</div>}
                                </div>
                            </div>
                            
                            <div className="d-flex justify-content-center">
                                <button className='btn btn-success' onClick={(e) => handleLoginForm(e)}>Submit</button>
                            </div>

                            {error && <div className="text-danger text-center mt-2">{error}</div>}
                                
                                <div className='d-flex justify-content-center mt-2'>
                                    <a href='/forgot-password'>Forgot Password</a>
                                </div>
                                <hr/>
                                <div className='d-flex justify-content-center'>
                                <p style={{marginRight:"5px"}}>New User?</p>
                                <a href='/register'>Sign Up</a>
                                </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default LoginComponent