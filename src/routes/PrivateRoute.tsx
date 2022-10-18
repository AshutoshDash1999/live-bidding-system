import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../utils/firebaseConfig';

const PrivateRoute = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
  }, []);

  return user ? <Outlet /> : <Navigate to='/login' />;
};
export default PrivateRoute;
