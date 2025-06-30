import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { resetPassword } from '../services/AuthService';

const ResetPasswordComponent = () => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token');
    const navigate = useNavigate();
    
    const validateForm = () => {
        const newErrors = {};
        
        if (!newPassword.trim()) {
            newErrors.newPassword = 'New password cannot be empty';
        } 
        
        if (!confirmPassword.trim()) {
            newErrors.confirmPassword = 'Please confirm your password';
        }else if (newPassword !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    async function handleResetPassword(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            await resetPassword(token, newPassword);
            setSuccess('Password reset successfully! Redirecting to login...');
            setErrors({});
            setTimeout(() => navigate('/login'), 3000);
        } catch (err) {
            setErrors({
                serverError: err.response?.data.message || 'Error resetting password'
            });
            setSuccess('');
        }
    }

    return (
        <div className='container'>
            <br /><br />
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className="card">
                        <div className="card-header">
                            <h2 className='text-center'>Reset Password</h2>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="row mb-3">
                                    <label className='col-md-3 control-label'>New Password</label>
                                    <div className="col-md-9">
                                        <input
                                            type='password'
                                            name='newPassword'
                                            className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                                            placeholder='Enter new password'
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                        {errors.newPassword && 
                                            <div className="text-danger small mt-1">{errors.newPassword}</div>
                                        }
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <label className='col-md-3 control-label'>Confirm Password</label>
                                    <div className="col-md-9">
                                        <input
                                            type='password'
                                            name='confirmPassword'
                                            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                                            placeholder='Confirm new password'
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                        />
                                        {errors.confirmPassword && 
                                            <div className="text-danger small mt-1">{errors.confirmPassword}</div>
                                        }
                                    </div>
                                </div>
                                
                                <div className="form-group mb-3">
                                    <button 
                                        className='btn btn-warning' 
                                        onClick={handleResetPassword}
                                    >
                                        Reset Password
                                    </button>
                                </div>
                            </form>

                            {errors.serverError && (
                                <div className="alert alert-danger mt-3">
                                    {errors.serverError}
                                </div>
                            )}
                            
                            {success && (
                                <div className="alert alert-success mt-3">
                                    {success}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordComponent