import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../../constants/apiUrl';
import { useDispatch } from 'react-redux';

import './style.css';
import { updateUser } from '../../redux/apiCalls';

const SearchResults = ({ open, searchResults, loading, searchTerm, user }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClickSearch = async (item) => {
        await axios.put(`${apiUrl}/api/users/preferences/${user?._id}`, {category: item?.category}).then(res => {
            navigate(`/movie/${item?._id}`);
            updateUser(user._id, {  }, dispatch);
        })
    }

    return (
        <div className={`search_results_wrapper ${open && searchTerm?.length > 0 ? 'open' : ''}`}>
            <ul>
                {
                    loading ? <li className='skeleton_line'></li> : searchResults?.length > 0 ? searchResults?.map((item, index) => <li key={index}>
                        <Link onClick={() => handleClickSearch(item)}>
                            {item?.title}
                        </Link>
                    </li>
                    ) : <li>No result</li>}
            </ul>
        </div>
    )
}

export default SearchResults
