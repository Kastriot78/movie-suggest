import { useSelector, useDispatch } from 'react-redux';
import { getAllMovies } from '../../../redux/apiCalls';
import { useEffect, useState } from 'react';
import TableSkeleton from '../../../utils/TableSkeleton';
import DeleteModal from '../../../utils/DeleteModal';
import axios from 'axios';
import { apiUrl } from '../../../constants/apiUrl';

const AllMovies = () => {
  const { movies, loading } = useSelector((state) => state.movie);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [loadingDeleted, setLoadingDeleted] = useState(false);
  const [movieId, setMovieId] = useState('');
  const dispatch = useDispatch();

  const handleDeleteMovie = async () => {
    setLoadingDeleted(true);
    setOpenDeleteModal(true);
    setSuccess(false);

    await axios.delete(`${apiUrl}/api/movies/${movieId}`).then(res => {
      setOpenDeleteModal(false);
      setSuccess(true);
      setLoadingDeleted(false);
    })
    .catch(error => {
      setLoadingDeleted(false);
    })
  }

  const handleOpenModal = (id) => {
    setOpenDeleteModal(true);
    setMovieId(id);
  }

  useEffect(() => {
    getAllMovies(dispatch);
  }, [success,dispatch]);

  return (
    <>
      <DeleteModal show={openDeleteModal} setShow={setOpenDeleteModal} handleDelete={handleDeleteMovie} loading={loadingDeleted} />
      <div className="page-header-admin-dashboard">
        <h2 className='title'>All Movies</h2>
      </div>
      <div className='dashboard_card'>
        {
          loading ? <TableSkeleton /> : <div className='table-responsive border border-bottom-0'>
            <table className='table text-nowrap text-md-nowrap mb-0'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Director</th>
                  <th>Released</th>
                  <th>Running Time</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  movies?.map(movie => <tr key={movie?._id}>
                    <td>{movie?.title}</td>
                    <td>{movie?.category}</td>
                    <td>{movie?.director}</td>
                    <td>{movie?.released}</td>
                    <td>{movie?.runningTime} min</td>
                    <td>
                      <button className='btn delete_row' onClick={() => handleOpenModal(movie?._id)}>remove</button>
                    </td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </>
  )
}

export default AllMovies
