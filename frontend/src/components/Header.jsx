import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaWhatsapp, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check if user is logged in
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/status', {
          credentials: 'include'
        });
        const data = await response.json();
        if (data.authenticated) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      }
    };

    // Check auth status immediately and then every 5 seconds
    checkAuth();
    const authInterval = setInterval(checkAuth, 5000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(authInterval);
    };
  }, []);

  const isHomePage = location.pathname === '/';
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
  const isSettingsPage = location.pathname === '/settings';

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/logout', {
        method: 'GET',
        credentials: 'include'
      });
      
      if (response.ok) {
        // Clear any local storage items
        localStorage.removeItem('token');
        
        // Reset user state
        setUser(null);
        setIsProfileOpen(false);
        
        // Force a page reload to clear any cached state
        window.location.href = '/';
      } else {
        console.error('Logout failed');
        const data = await response.json();
        console.error('Logout error:', data.message);
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <>
      <header className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
        <nav className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            {/* Logo/Title - Shows logo on mobile, text on desktop */}
            <div className="flex items-center">
              <Link to="/" onClick={scrollToTop} className="flex items-center">
                <img 
                  src="/logo_no_background.png" 
                  alt="Japan Auto Service" 
                  className="h-10 w-auto md:hidden"
                />
                <span className={`text-2xl font-bold hidden md:block ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}>
                  Japan Auto Service
                </span>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              {isHomePage ? (
                <>
                  <a href="#home" className={`hover:text-[#d72638] hidden md:block ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}>Home</a>
                  <a href="#about" className={`hover:text-[#d72638] hidden md:block ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}>About</a>
                  <a href="#services" className={`hover:text-[#d72638] hidden md:block ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}>Services</a>
                  <a href="#reviews" className={`hover:text-[#d72638] hidden md:block ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}>Reviews</a>
                  <a href="#gallery" className={`hover:text-[#d72638] hidden md:block ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}>Gallery</a>
                  <a href="#contact" className={`hover:text-[#d72638] hidden md:block ${
                    isScrolled ? 'text-gray-900' : 'text-white'
                  }`}>Contact</a>
                </>
              ) : null}
              
              {!user ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => navigate('/login')}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#d72638] hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d72638]"
                  >
                    Login
                  </button>
                </div>
              ) : !isSettingsPage && (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 focus:outline-none"
                  >
                    <span>{user.name}</span>
                    <svg
                      className={`h-5 w-5 transform ${isProfileOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <div className="px-4 py-2 text-sm text-gray-700 border-b">
                        {user.email}
                      </div>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <FaCog className="w-4 h-4 mr-2" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                      >
                        <FaSignOutAlt className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* WhatsApp Button - Fixed to bottom right corner */}
      <a
        href="https://wa.me/40123456789"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 md:hidden z-50"
        aria-label="Contact on WhatsApp"
      >
        <FaWhatsapp className="w-6 h-6" />
      </a>
    </>
  );
}

export default Header; 