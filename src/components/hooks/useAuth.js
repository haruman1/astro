import { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext.jsx';

export default function useAuth() {
  return useContext(AuthContext);
}
