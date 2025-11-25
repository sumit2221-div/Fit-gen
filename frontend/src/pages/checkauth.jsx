// src/hooks/useAuthCheck.js

import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getCurrentUser } from '../api/auth.api';

// PUBLIC ROUTES (no login required)
const PUBLIC_ROUTES = ['/', '/login', '/register', '/motivation-wellness'];

const useAuthCheck = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;

    // Skip auth check for public pages
    if (PUBLIC_ROUTES.includes(currentPath)) return;

    // Check if token exists
    const token = localStorage.getItem("accessToken");

    if (!token) {
      // No token → redirect immediately
      navigate("/login", { state: { from: currentPath } });
      return;
    }

    // Validate token by hitting backend
    const verifyUser = async () => {
      try {
        await getCurrentUser();  // Valid token
      } catch (err) {
        // Token invalid or expired → clear storage & redirect
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        navigate("/login", { state: { from: currentPath } });
      }
    };

    verifyUser();
  }, [location.pathname]);
};

export default useAuthCheck;
