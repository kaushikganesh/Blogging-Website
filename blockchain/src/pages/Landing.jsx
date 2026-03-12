import { ShieldCheck, Lock, Shield, Fingerprint, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="hero">
      <div className="hero-icon">
        <ShieldCheck size={32} />
      </div>
      <h1 className="hero-title">
        Next-Gen <span className="text-gradient-blue">Blockchain</span><br />
        Voting
      </h1>
      <p className="hero-subtitle">
        Experience the future of democracy. Immutable ledgers, zero-<br/>
        knowledge proofs, and post-quantum cryptography ensuring every<br/>
        vote counts securely.
      </p>
      
      <div className="hero-actions">
        <Link to="/register" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: '30px' }}>
          Register to Vote <ChevronRight size={18} />
        </Link>
        <Link to="/explorer" className="btn-secondary" style={{ padding: '0.75rem 1.5rem', borderRadius: '30px' }}>
          View Public Ledger
        </Link>
      </div>

      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Fingerprint size={28} className="text-secondary" />
          </div>
          <h3 className="feature-title">Biometric MFA</h3>
          <p className="feature-desc">
            Advanced multifactor authentication simulating biometric hardware keys.
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Lock size={28} className="text-secondary" style={{ color: '#10b981' }} />
          </div>
          <h3 className="feature-title">Zero-Knowledge</h3>
          <p className="feature-desc">
            Prove you have the right to vote without revealing your identity.
          </p>
        </div>

        <div className="feature-card">
          <div className="feature-icon-wrapper">
            <Shield size={28} className="text-secondary" style={{ color: '#8b5cf6' }} />
          </div>
          <h3 className="feature-title">Quantum Proof</h3>
          <p className="feature-desc">
            Simulated CRYSTALS-Dilithium signatures to protect against future attacks.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Landing;
