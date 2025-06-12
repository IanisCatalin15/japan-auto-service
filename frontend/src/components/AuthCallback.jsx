import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const AuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      // Store the token in localStorage
      localStorage.setItem('token', token);
      
      // Redirect to home page
      navigate('/');
    } else {
      // Handle error case
      navigate('/login', { state: { error: 'Authentication failed' } });
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Completing authentication...
        </h2>
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
      </div>
    </div>
  );
};

export default AuthCallback; 