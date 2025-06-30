import React, { useState } from 'react'
import { Await, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/AuthService';

const ForgotPasswordComponent = () => {
    
    const [emailOrUsername, setEmailOrUsername] = useState('');
    // const [resetLink, setResetLink] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [unAuthReset, setunAuthReset] = useState(false);
    const[checkField, setCheckField] = useState({});
    const navigate = useNavigate();

    const validateField = ()=>{
        const newErorrs = {};
        if(!emailOrUsername.trim()){
            newErorrs.emailOrUsername = 'Email/Username cannot be empty';
        }

        setCheckField(newErorrs);
        return Object.keys(newErorrs).length === 0;
    }

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    const shortDelay = async(dur)=>{await delay(dur);}
    async function generateResetLink(e){
        e.preventDefault();

        if(!validateField()){
            return;
        }

        if(isProcessing) return;
        setIsProcessing(true);
        setError('');
        setSuccess("Generating Link.....");
        
        await forgotPassword(emailOrUsername).then((response) => {
            if(response.data === "Users registered using google cannot use this functionality"){
                setunAuthReset(true);
                setError(response.data);
                // delay(2000);
                return;
            }
            setSuccess(response.data);
            setError('');
        }).catch((err) => {
            setError(err.response?.data.message || 'Error generating reset link!');
            setSuccess('');
            // setResetLink('');
        }).finally(() =>{
            setIsProcessing(false);
        })
    }

  return (
    <div className='container'>
        <br /><br />
        <div className='row'>
            <div className='col-md-6 offset-md-3'>
                <div className="card">
                    <div className="card-header">
                        <h2 className='text-center'>Forgot Password</h2>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="row mb-3">
                                <label className='col-md-3 control-label'>Username/Email</label>
                                <div className="col-md-9">
                                    <input
                                        type='text'
                                        name='usernameOrEmail'
                                        className={`form-control ${checkField.emailOrUsername?"is-invalid":""}`}
                                        placeholder='enter username or email'
                                        value={emailOrUsername}
                                        onChange={(e) => setEmailOrUsername(e.target.value)}
                                        required
                                    ></input>
                                    {checkField.emailOrUsername && <div className="invalid-feedback">{checkField.emailOrUsername}</div>}
                                </div>
                            </div>
                            
                            <div className="form-group mb-3">
                                <button className='btn btn-success' onClick={(e) => generateResetLink(e)} disabled= {isProcessing}>
                                Generate Reset Link
                                </button>
                            </div>
                        </form>

                        {error && <div className="text-danger">{error}</div>}

                    
                        {unAuthReset && <a href='/login'>Go Back to LogIn </a>}

                        
                        {success && !error && <div className="success-message">{success}</div>}
                    </div>
                </div>
            </div>

        </div>
    </div>
  )
}

export default ForgotPasswordComponent