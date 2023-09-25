import BreadCrumb from '../BreadCrumb/BreadCrumb';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { handleInputChange } from '../../utils/HandleOnChange';
import { useDispatch, useSelector } from 'react-redux';

import './style.css';
import { validateForm } from '../../utils/ValidateForm';
import { login } from '../../redux/apiCalls';
import BtnLoader from '../../utils/BtnLoader';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const { error, success, loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(formData, false);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      login(formData, dispatch);
    }
  }

  useEffect(() => {
    if(success) {
      setFormData({ email: '', password: '' });
      navigate('/');
    }
  }, [navigate, success]);

  return (
    <div className='login_wrapper'>
      <BreadCrumb title="Login" />
      <div className='section'>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-md-10">
              <div className="padding login_wrap">
                {
                  error && <div className="heading_error">
                    <p>{error}</p>
                  </div>
                }
                <div className="heading_s1">
                  <h3>Login</h3>
                </div>
                <form action="" onSubmit={handleSubmit}>
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
                      name="password"
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
                      {
                        loading ? <BtnLoader /> : 'Log In'
                      }
                    </button>
                  </div>
                </form>
                <div className="form_text text-center">
                  Don't have an account?
                  <Link to="/signup" className='ms-2'>Sign Up now</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
