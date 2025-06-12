import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AuthForm from './components/AuthForm';
import Register from './components/Register';
import AuthCallback from './components/AuthCallback';

function App() {
  return (
    <Router basename="/japan-auto-service">
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<div>Home Page</div>} />
            <Route path="/login" element={<AuthForm type="login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 