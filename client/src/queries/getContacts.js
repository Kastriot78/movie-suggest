import { useQuery } from 'react-query';
import { apiUrl } from '../constants/apiUrl';

export const fetchContacts = async () => {
  const response = await fetch(`${apiUrl}/api/contacts`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
};

export const useContactItems = () => {
  return useQuery('contacts', fetchContacts);
};
