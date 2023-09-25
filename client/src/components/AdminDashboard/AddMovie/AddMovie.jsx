import { useState } from 'react'
import { handleInputChange } from '../../../utils/HandleOnChange';
import BtnLoader from '../../../utils/BtnLoader';
import axios from 'axios';
import { apiUrl } from '../../../constants/apiUrl';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    director: '',
    starring: '',
    released: '',
    runningTime: '',
    description: '',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!formData.title) {
      errors.title = 'Title is required'
    }

    if (!formData.category) {
      errors.category = 'Category is required'
    }

    if (!formData.director) {
      errors.director = 'Director is required'
    }

    if (!formData.starring) {
      errors.starring = 'Starring is required'
    }

    if (!formData.released) {
      errors.released = 'Released is required'
    }

    if (!formData.runningTime) {
      errors.runningTime = 'Running Time is required'
    }

    if (!formData.description) {
      errors.description = 'Description is required'
    }

    if (!formData.image) {
      errors.image = 'Image is required'
    }

    return errors;
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      setLoading(true);

      await axios.post(`${apiUrl}/api/movies`, formData, { withCredentials: true })
        .then(res => {
          setLoading(false);
          toast.success('Movie created successfully');
          navigate('/admin/all-movies');
        })
        .catch(error => {
          setLoading(false);
          setError(error);
        })
    }
  }

  return (
    <>
      <div className="page-header-admin-dashboard">
        <h2 className='title'>Add Movie</h2>
      </div>
      <div className='add_movie dashboard_card'>
        <form action="" onSubmit={handleSubmit}>
          <div className="row account-form-wrap">
            {
              error && <div className="heading_error">
                <p>{error}</p>
              </div>
            }
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="">Title</label>
                <input
                  name="title"
                  type="text"
                  className='form-control'
                  value={formData.title}
                  onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                />
                {
                  errors?.title && <div className="heading_error">
                    <p className='text-left mb-0'>{errors?.title}</p>
                  </div>
                }
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="">Category</label>
                <input
                  name="category"
                  type="text"
                  className='form-control'
                  value={formData.category}
                  onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                />
                {
                  errors?.category && <div className="heading_error">
                    <p className='text-left mb-0'>{errors?.category}</p>
                  </div>
                }
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="">Director</label>
                <input
                  name="director"
                  type="text"
                  className='form-control'
                  value={formData.director}
                  onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                />
                {
                  errors?.director && <div className="heading_error">
                    <p className='text-left mb-0'>{errors?.director}</p>
                  </div>
                }
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="">Starring</label>
                <input
                  name="starring"
                  type="text"
                  className='form-control'
                  value={formData.starring}
                  onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                />
                {
                  errors?.starring && <div className="heading_error">
                    <p className='text-left mb-0'>{errors?.starring}</p>
                  </div>
                }
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="">Released</label>
                <input
                  name="released"
                  type="text"
                  className='form-control'
                  value={formData.released}
                  onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                />
                {
                  errors?.released && <div className="heading_error">
                    <p className='text-left mb-0'>{errors?.released}</p>
                  </div>
                }
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="form-group">
                <label htmlFor="">Running Time</label>
                <input
                  name="runningTime"
                  type="text"
                  className='form-control'
                  value={formData.runningTime}
                  onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}
                />
                {
                  errors?.runningTime && <div className="heading_error">
                    <p className='text-left mb-0'>{errors?.runningTime}</p>
                  </div>
                }
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="">Description</label>
                <textarea name="description" value={formData.description} onChange={(e) => handleInputChange(e, formData, setFormData, errors, setErrors)}></textarea>
                {
                  errors?.description && <div className="heading_error">
                    <p className='text-left mb-0'>{errors?.description}</p>
                  </div>
                }
              </div>
            </div>
            <div className="col-md-12">
              <div className="form-group">
                <label htmlFor="">Image</label>
                <div className='upload_image_wrapper'>
                  <div className="image mb-4">
                    <img src={formData.image} alt="" />
                  </div>
                  <button className='position-relative'>
                    Upload Image
                    <input type="file" onChange={handleFileChange} />
                  </button>
                </div>
                {
                  errors?.image && <div className="heading_error">
                    <p className='text-left mb-0'>{errors?.image}</p>
                  </div>
                }
              </div>
            </div>
          </div>

          <div className='text-center'>
            <button type='submit' className='submit-btn' disabled={loading}>
              {loading ? <BtnLoader /> : 'Add Movie'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddMovie
