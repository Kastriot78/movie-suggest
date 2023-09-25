import BreadCrumb from '../BreadCrumb/BreadCrumb';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { handleInputChange } from '../../utils/HandleOnChange';
import { validateForm } from '../../utils/ValidateForm';
import { register } from '../../redux/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import BtnLoader from '../../utils/BtnLoader';

import './style.css';
import { userSlice } from '../../redux/userRedux';
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { error, loading, success } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const errors = validateForm(formData, true);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      register(formData, dispatch);
    }
  }

  useEffect(() => {
    if(success) {
      setFormData({ username: '', lastName: '', email: '', password: '' });
      navigate('/login');
    }
    return (() => {
      dispatch(userSlice.actions.clearState());
    });
    
  }, [success, navigate, dispatch]);

  return (
    <div className='login_wrapper'>
      <BreadCrumb title="Sign Up" />
      <div className='section'>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-md-10">
              <div className="padding login_wrap">
                {error && <div className="heading_error">
                  <p>{error}</p>
                </div>
                }
                <div className="heading_s1">
                  <h3>Create An Account</h3>
                </div>
                <form action="" onSubmit={handleSignUp}>
                  <div className="form-group">
                    <input
                      name="username"
                      type="text"
                      className='form-control'
                      placeholder='Your Name'
                      value={formData.username}
                      onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                    />
                    {
                      errors?.username && <div className="heading_error">
                        <p className='text-left mb-0'>{errors?.username}</p>
                      </div>
                    }
                  </div>
                  <div className="form-group">
                    <input
                      name='lastName'
                      type="text"
                      className='form-control'
                      placeholder='Your Last Name'
                      value={formData.lastName}
                      onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                    />
                    {
                      errors?.lastName && <div className="heading_error">
                        <p className='text-left mb-0'>{errors?.lastName}</p>
                      </div>
                    }
                  </div>
                  <div className="form-group">
                    <input
                      name="email"
                      type="email"
                      className='form-control'
                      placeholder='Your Email'
                      value={formData.email}
                      onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                    />
                    {
                      errors?.email && <div className="heading_error">
                        <p className='text-left mb-0'>{errors?.email}</p>
                      </div>
                    }
                  </div>
                  <div className="form-group">
                    <input
                      name='password'
                      type="password"
                      className='form-control'
                      placeholder='Password'
                      value={formData.password}
                      onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                    />
                    {
                      errors?.password && <div className="heading_error">
                        <p className='text-left mb-0'>{errors?.password}</p>
                      </div>
                    }
                  </div>
                  <div className="form-group text-center">
                    <button className="submit-btn">
                      {loading ? <BtnLoader /> : 'Sign Up'}
                    </button>
                  </div>
                </form>
                <div className="form_text text-center">
                  Already have an account?
                  <Link to="/login" className='ms-2'>Login now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;
