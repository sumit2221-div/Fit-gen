// src/hooks/useAuthCheck.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { getCurrentUser } from '../api/auth.api';


const useAuthCheck = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await getCurrentUser();
        console.log(res,"user authenticated");
       
      } catch (err) {
        console.log('Not authenticated');
      }
        

        // Redirect to login and save current location
        navigate('/login')
    

    checkAuth();
}}, []);
};

export default useAuthCheck;
