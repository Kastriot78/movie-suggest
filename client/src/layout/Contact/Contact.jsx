import { useState } from 'react';
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb';
import axios from 'axios';
import {apiUrl} from '../../constants/apiUrl';
import { toast } from 'react-toastify';

import './style.css';
import BtnLoader from '../../utils/BtnLoader';

const Contact = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, seErrors] = useState({});

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        seErrors({ ...errors, [name]: '' });
    }

    const validateForm = () => {
        const errors = {};

        if (!formData?.firstName) {
            errors.firstName = 'First Name is required'
        }

        if (!formData?.lastName) {
            errors.lastName = 'Last Name is required'
        }

        if (!formData?.email) {
            errors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = "Email is invalid";
        }

        if (!formData?.subject) {
            errors.subject = 'Subject is required'
        }

        if (!formData?.message) {
            errors.message = 'Message is required'
        }

        return errors;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        seErrors(errors);

        if(Object.keys(errors).length === 0) {
            setLoading(true);
            await axios.post(`${apiUrl}/api/contacts`, formData).then(res => {
                setLoading(false);
                toast.success('Thank you for getting in touch!');
                setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
            });
        }

    }

    return (
        <section className='contact_section'>
            <BreadCrumb title="Contact US" />
            <div className="container">
                <main className='section'>
                    <form action="" onSubmit={handleSubmit} className='section'>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input
                                        name="firstName"
                                        type="text"
                                        placeholder='First Name'
                                        className='form-control'
                                        value={formData?.firstName}
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                    {
                                        errors?.firstName && <div className="heading_error">
                                            <p className='text-left mb-0'>{errors?.firstName}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input
                                        name="lastName"
                                        type="text"
                                        placeholder='Last Name'
                                        className='form-control'
                                        value={formData?.lastName}
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                    {
                                        errors?.lastName && <div className="heading_error">
                                            <p className='text-left mb-0'>{errors?.lastName}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input
                                        name="email"
                                        type="text"
                                        placeholder='Enter Your Email'
                                        className='form-control'
                                        value={formData?.email}
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                    {
                                        errors?.email && <div className="heading_error">
                                            <p className='text-left mb-0'>{errors?.email}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <input
                                        name="subject"
                                        type="text"
                                        placeholder='Subject'
                                        className='form-control'
                                        value={formData?.subject}
                                        onChange={(e) => handleOnChange(e)}
                                    />
                                    {
                                        errors?.subject && <div className="heading_error">
                                            <p className='text-left mb-0'>{errors?.subject}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group">
                                    <textarea name="message" placeholder='Message' value={formData?.message} onChange={(e) => handleOnChange(e)}></textarea>
                                    {
                                        errors?.message && <div className="heading_error">
                                            <p className='text-left mb-0'>{errors?.message}</p>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="contact-submit-btn text-center">
                            <button type='submit' className='submit-btn' disabled={loading}>
                                {
                                    loading ? <BtnLoader /> : 'Send message'
                                }
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </section>
    )
}

export default Contact
