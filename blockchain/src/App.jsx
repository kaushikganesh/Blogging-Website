import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Shield, Fingerprint, Lock, ShieldCheck, CheckCircle2, ChevronRight, HardDrive, Cpu, LogOut, Search } from 'lucide-react';
import './index.css';
import Landing from './pages/Landing';
import Register from './pages/Register';
import Login from './pages/Login';
import Login2FA from './pages/Login2FA';
import Dashboard from './pages/Dashboard';
import Explorer from './pages/Explorer';
import Technology from './pages/Technology';

function Header() {
  return (
    <header className="navbar">
      <Link to="/" className="logo">
        <ShieldCheck size={28} />
        BlockVote
      </Link>
      <nav className="nav-links">
        <Link to="/explorer" className="nav-item">
          <HardDrive size={18} /> Explorer
        </Link>
        <Link to="/technology" className="nav-item">
          <Cpu size={18} /> Technology
        </Link>
        <Link to="/login" className="nav-item">
          <Fingerprint size={18} /> Login
        </Link>
        <Link to="/register" className="btn-primary">
          Register
        </Link>
      </nav>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      &copy; 2026 Secure Blockchain Voting System. Quantum Ready.
    </footer>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/login/2fa" element={<Login2FA />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/explorer" element={<Explorer />} />
            <Route path="/technology" element={<Technology />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
