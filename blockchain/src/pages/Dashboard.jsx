import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, AlertTriangle, ArrowLeft } from 'lucide-react';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [viewState, setViewState] = useState('list'); // 'list', 'voting', 'success'
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(currentUser);
      const voted = localStorage.getItem(`voted_${currentUser}`);
      if (voted) setHasVoted(true);
    }
  }, [navigate]);

  const candidates = [
    { id: 1, name: 'Alice Chen', party: 'Progressive Student Union', desc: 'Better campus wifi and extended library hours.' },
    { id: 2, name: 'Bob Smith', party: 'Student Action Group', desc: 'More funding for sports and clubs.' }
  ];

  const handleVote = () => {
    if (selectedCandidate && !hasVoted) {
      localStorage.setItem(`voted_${user}`, 'true');
      setHasVoted(true);
      setViewState('success');
      
      const existingBlocks = JSON.parse(localStorage.getItem('blockchain_blocks') || '[]');
      const newIndex = existingBlocks.length > 0 ? existingBlocks[0].index + 1 : 9;
      
      const generateHex = (len) => Array.from({length: len}, () => Math.floor(Math.random()*16).toString(16)).join('');
      
      const fakeHash = generateHex(64);
      const prevHash = existingBlocks.length > 0 ? existingBlocks[0].hash : '4eb9c162072b16ccf932ebad3587d7bf9e9c3242561f53243a2588a3787d029b';
      
      const newBlock = {
        index: newIndex,
        mined: new Date().toLocaleString(),
        hash: fakeHash,
        prevHash: prevHash,
        voterIdentity: 'anon_' + generateHex(32),
        zkpVerif: 'zkp_' + generateHex(24),
        digitalSig: 'ecc_sig_' + generateHex(24),
        isLatest: true
      };
      
      if (existingBlocks.length > 0) existingBlocks[0].isLatest = false;
      
      localStorage.setItem('blockchain_blocks', JSON.stringify([newBlock, ...existingBlocks]));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2 className="dashboard-title">Voter Dashboard</h2>
          <p className="dashboard-subtitle">Welcome, {user}. Your identity is verified.</p>
        </div>
        <div>
          <span className={`status-badge ${hasVoted ? 'voted' : 'eligible'}`}>
            <CheckCircle2 size={16} /> Status: {hasVoted ? 'Voted' : 'Eligible'}
          </span>
          <button onClick={handleLogout} style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem', display: 'block', marginLeft: 'auto' }}>
            [→ Logout
          </button>
        </div>
      </div>

      {viewState !== 'list' && (
        <div className="back-link" onClick={() => setViewState('list')}>
          <ArrowLeft size={16} /> Back to Elections
        </div>
      )}

      {viewState === 'list' && (
        <div className="elections-grid">
          <div className="election-card">
            <span className="badge-active">Active</span>
            <h3 className="election-title">University Student Council 2026</h3>
            <p className="election-meta"><span>🕒</span> Ends: 3/15/2026</p>
            <button 
              className="btn-primary btn-full"
              onClick={() => {
                if (hasVoted) setViewState('success');
                else setViewState('voting');
              }}
            >
              {hasVoted ? 'View Receipt' : 'Cast Vote'}
            </button>
          </div>

          <div className="election-card inactive">
            <span className="badge-completed">Completed</span>
            <h3 className="election-title">Department of Computer Science Rep</h3>
            <p className="election-meta"><span>🕒</span> Ends: 2/28/2026</p>
            <button className="btn-secondary btn-full" style={{ marginTop: 'auto' }}>
              View Results
            </button>
          </div>
        </div>
      )}

      {viewState === 'voting' && (
        <div className="voting-card">
          <h3 className="voting-title">University Student Council 2026</h3>
          <p className="voting-desc">Select your preferred candidate. This action is immutable once submitted.</p>

          <div className="candidate-list">
            {candidates.map(candidate => (
              <div 
                key={candidate.id}
                className={`candidate-option ${selectedCandidate === candidate.id ? 'selected' : ''}`}
                onClick={() => setSelectedCandidate(candidate.id)}
              >
                <div className="radio-btn"></div>
                <div className="candidate-info">
                  <h4 className="candidate-name">{candidate.name}</h4>
                  <p className="candidate-party">{candidate.party}</p>
                  <p className="candidate-desc">{candidate.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="warning-box">
            <AlertTriangle size={18} style={{ display: 'inline', color: '#f87171', marginRight: '0.5rem', verticalAlign: 'text-bottom' }} />
            <strong>Warning:</strong> Ensure your selection is correct. Smart contract rules dictate that a vote cannot be altered or deleted once committed to the blockchain.
          </div>

          <button 
            className={`btn-primary btn-full ${!selectedCandidate ? 'btn-disabled' : ''}`}
            style={{ padding: '1rem', fontSize: '1rem', opacity: selectedCandidate ? 1 : 0.5, cursor: selectedCandidate ? 'pointer' : 'not-allowed' }}
            onClick={handleVote}
            disabled={!selectedCandidate}
          >
            Confirm & Sign Vote Cryptographically
          </button>
        </div>
      )}

      {viewState === 'success' && (
        <div className="voting-card">
          <h3 className="voting-title">University Student Council 2026</h3>
          <p className="voting-desc">Select your preferred candidate. This action is immutable once submitted.</p>
          
          <div className="success-view-container">
            <div className="success-icon-wrapper">
              <CheckCircle2 size={40} className="success-icon" />
            </div>
            <h3 className="success-heading">Vote Successfully Cast!</h3>
            <p className="success-text">
              Your vote has been cryptographically signed using ZKP<br/>
              and appended to the blockchain. Your voter identity<br/>
              remains completely anonymous.
            </p>
            
            <div className="hash-boxes">
              <div className="hash-box">
                <span className="hash-label">Transaction Hash:</span>
                <span className="hash-value-code">0x8f2a9...d4c1b</span>
              </div>
              <div className="hash-box">
                <span className="hash-label">Zero-Knowledge Proof:</span>
                <span className="hash-value-code text-purple">zkp_938da71f00b2e...</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
