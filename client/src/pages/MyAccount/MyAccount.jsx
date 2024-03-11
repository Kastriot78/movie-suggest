import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import { useSelector, useDispatch } from 'react-redux';
import { handleInputChange } from '../../utils/HandleOnChange';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import { updateUser } from '../../redux/apiCalls';
import { userSlice } from '../../redux/userRedux';
import BtnLoader from '../../utils/BtnLoader';

import './style.css';

const MyAccount = () => {
    const { user, error, loading, success } = useSelector((state) => state.user);

    const [formData, setFormData] = useState({
        username: user ? user.name : '',
        lastName: user ? user.lastName : '',
        email: user.email || '',
        password: ''
    });

    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};

        if (!formData.username) {
            errors.username = 'Username is required';
        }

        if (!formData.lastName) {
            errors.lastName = 'Last Name is required';
        }

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }

        setErrors(errors);


        if (formData.password && confirmPassword && formData.password !== confirmPassword) {
            toast.error('New Password and Confirm Password are not the same!');
            return;
        }

        if (Object.keys(errors).length === 0) {
            updateUser(user._id, { ...formData, currentPassword: currentPassword }, dispatch);
            toast.success("User profile updated successfully.");
        }
    }


    useEffect(() => {
        return (() => {
            dispatch(userSlice.actions.clearState());
        })
    }, [success, dispatch]);

    return (
        <div>
            <BreadCrumb title="My Account" />
            <main className='section'>
                <div className='container'>
                    <div className="row">
                        {
                            error && <div className="heading_error">
                                <p className='text-center mb-0'>{error}</p>
                            </div>
                        }
                        <div className="col-md-12">
                            <ul className='account_list d-flex align-items-center flex-wrap mb--45'>
                                <li className='active'>Account Details</li>
                            </ul>
                        </div>
                        <div className="col-md-12">
                            <div className="account-content">
                                <div className="row">
                                    <div className="col-lg-9 col-xl-10 col-md-9">
                                        <form action="" onSubmit={handleSubmit}>
                                            <div className="account-form-wrap border-bottom-2 pb-4">
                                                <h3>General Information</h3>
                                                <p>By letting us know your name, we can make our support experience much more personal.</p>
                                                <div className="row">
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="">Username</label>
                                                        <input
                                                            name="username"
                                                            type="text"
                                                            className='form-control'
                                                            value={formData.username}
                                                            onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                                                        />
                                                        {
                                                            errors?.username && <div className="heading_error">
                                                                <p className='text-left mb-0'>{errors?.username}</p>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="">Last Name</label>
                                                        <input
                                                            name="lastName"
                                                            type="text"
                                                            className='form-control'
                                                            value={formData.lastName}
                                                            onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                                                        />
                                                        {
                                                            errors?.lastName && <div className="heading_error">
                                                                <p className='text-left mb-0'>{errors?.lastName}</p>
                                                            </div>
                                                        }
                                                    </div>
                                                    <div className="col-md-6 form-group">
                                                        <label htmlFor="">Email Address</label>
                                                        <input
                                                            name="email"
                                                            type="email"
                                                            className='form-control'
                                                            value={formData.email}
                                                            onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                                                        />
                                                        {
                                                            errors?.email && <div className="heading_error">
                                                                <p className='text-left mb-0'>{errors?.email}</p>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="account-form-wrap border-bottom-2 mt--30 mb--30 pb-4">
                                                <h3>Password Change</h3>
                                                <p>By letting us know your name, we can make our support experience much more personal.</p>
                                                <div className="row">
                                                    <div className="col-md-4 form-group">
                                                        <label htmlFor="">Current Password:</label>
                                                        <input
                                                            name="currentPassword"
                                                            type="password"
                                                            className='form-control'
                                                            value={currentPassword}
                                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                                        />
                                                    </div>
                                                    <div className="col-md-4 form-group">
                                                        <label htmlFor="">New Password:</label>
                                                        <input
                                                            name="password"
                                                            type="password"
                                                            className='form-control'
                                                            value={formData.password}
                                                            onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                                                        />
                                                    </div>
                                                    <div className="col-md-4 form-group">
                                                        <label htmlFor="">Confirm Password</label>
                                                        <input
                                                            name='confirmPassword'
                                                            type="password"
                                                            className='form-control'
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="form-group text-center mt-30">
                                                <button type='submit' className="submit-btn" disabled={loading}>
                                                    {
                                                        loading ? <BtnLoader /> : 'Save changes'
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default MyAccount;
