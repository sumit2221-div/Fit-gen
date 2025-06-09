// src/hooks/useAuthCheck.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../api/auth.api';

const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getCurrentUser();
        // User is authenticated, do nothing
        console.log(res, "user authenticated");
      } catch (err) {
        console.log('Not authenticated');
        // Redirect to login and save current location for redirect after login
        navigate('/login', { state: { from: location.pathname } });
      }
    };

    checkAuth();
  }, [navigate, location]);
};

export default useAuthCheck;
