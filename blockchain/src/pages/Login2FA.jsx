import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Fingerprint } from 'lucide-react';

function Login2FA() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('authenticator');
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp === '123456') {
      const voterId = localStorage.getItem('tempVoterId') || 'User';
      localStorage.setItem('currentUser', voterId);
      navigate('/dashboard');
    } else {
      alert('Invalid OTP. Use 123456 for simulation.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2 className="auth-title">Secure Login</h2>
          <p className="auth-subtitle">Complete 2-Factor Authentication</p>
        </div>

        <div className="auth-tabs">
          <button 
            className={`auth-tab ${activeTab === 'authenticator' ? 'active' : ''}`}
            onClick={() => setActiveTab('authenticator')}
          >
            <Smartphone size={24} />
            Authenticator
          </button>
          <button 
            className={`auth-tab ${activeTab === 'biometric' ? 'active' : ''}`}
            onClick={() => setActiveTab('biometric')}
          >
            <Fingerprint size={24} />
            Biometric
          </button>
        </div>

        {activeTab === 'authenticator' ? (
          <form onSubmit={handleSubmit}>
            <div className="otp-container">
              <label className="otp-label">Enter 6-digit OTP Code</label>
              <input 
                type="text" 
                className="otp-input"
                maxLength="6"
                placeholder="- - - - - -"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                required
              />
              <p className="otp-hint">Simulation: Use "123456"</p>
            </div>
            
            <button type="submit" className="btn-primary btn-full">
              Verify & Login
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <Fingerprint 
              size={64} 
              style={{ color: '#0ea5e9', margin: '0 auto 1.5rem', cursor: 'pointer' }} 
              onClick={() => {
                const voterId = localStorage.getItem('tempVoterId') || 'User';
                localStorage.setItem('currentUser', voterId);
                navigate('/dashboard');
              }}
            />
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Click the fingerprint icon or verify below</p>
            <button 
              type="button"
              className="btn-primary"
              onClick={() => {
                const voterId = localStorage.getItem('tempVoterId') || 'User';
                localStorage.setItem('currentUser', voterId);
                navigate('/dashboard');
              }}
            >
              Verify Biometric
            </button>
          </div>
        )}


        <button 
          className="btn-cancel"
          onClick={() => navigate('/login')}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Login2FA;
