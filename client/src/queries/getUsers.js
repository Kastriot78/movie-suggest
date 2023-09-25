import { useQuery } from 'react-query';
import { apiUrl } from '../constants/apiUrl';

export const fetchUsers = async () => {
  const response = await fetch(`${apiUrl}/api/users`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const useItems = () => {
  return useQuery('users', fetchUsers);
};
