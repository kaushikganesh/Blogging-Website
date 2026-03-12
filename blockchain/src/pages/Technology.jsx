import React, { useState } from 'react';
import { Lock, Cpu, ShieldAlert, Fingerprint } from 'lucide-react';
import './Technology.css';

const tabs = [
  {
    id: 'zkp',
    label: 'Zero-Knowledge Proofs (ZKP)',
    icon: <Lock size={20} />,
    title: 'Zero-Knowledge Proofs (ZKP)',
    description: 'Allows a voter to mathematically prove they have the right to vote without revealing their identity or how they voted.',
    steps: [
      'Prover (Voter) generates a proof using their secret key and election public parameters.',
      'Verifier (Smart Contract) checks the proof without seeing the secret key.',
      'Ensures 100% voter privacy while maintaining 100% public verifiability.'
    ]
  },
  {
    id: 'pqc',
    label: 'Post-Quantum Cryptography',
    icon: <Cpu size={20} />,
    title: 'Post-Quantum Cryptography',
    description: 'Secures the voting platform against future quantum computer attacks using advanced lattice-based cryptography algorithms.',
    steps: [
      'Key generation utilizes CRYSTALS-Dilithium standard.',
      'Signatures are resilient to Shor\'s algorithm.',
      'Protects long-term integrity of the election ledger.'
    ]
  },
  {
    id: 'ai',
    label: 'AI Fraud Detection',
    icon: <ShieldAlert size={20} />,
    title: 'AI Fraud Detection',
    description: 'Real-time machine learning models monitoring for anomalous voting patterns and network behaviors.',
    steps: [
      'Analyzes transaction timing, frequency, and network origin.',
      'Flags suspicious activities for manual review or automatic block.',
      'Continuously learning from global threat intelligence.'
    ]
  },
  {
    id: 'mfa',
    label: 'Biometric MFA',
    icon: <Fingerprint size={20} />,
    title: 'Biometric MFA',
    description: 'Hardware-backed biometric authentication ensuring the person casting the vote is the registered human voter.',
    steps: [
      'WebAuthn standard for phishing-resistant login.',
      'Secure Enclave / TPM hardware checks.',
      'No biometric data ever leaves the user\'s local device.'
    ]
  }
];

function Technology() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="tech-container">
      <div className="tech-header">
        <h2 className="tech-title">Technology Stack</h2>
        <p className="tech-subtitle">Dive deep into the simulated cryptographic layers and security modules that power our decentralized voting prototype.</p>
      </div>
      
      <div className="tech-layout">
        <div className="tech-tabs-sidebar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tech-tab-btn ${activeTab.id === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              <span className={`tech-tab-icon ${tab.id}`}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="tech-content-area">
          <div className="tech-content-card">
            <div className="tech-content-header">
              <div className={`tech-content-icon ${activeTab.id}`}>
                {activeTab.icon}
              </div>
              <h3>{activeTab.title}</h3>
            </div>
            
            <p className="tech-content-desc">{activeTab.description}</p>
            
            <h4 className="tech-content-section-title">Implementation Details</h4>
            
            <div className="tech-steps-list">
              {activeTab.steps.map((step, index) => (
                <div key={index} className="tech-step-item">
                  <div className="tech-step-number">{index + 1}</div>
                  <div className="tech-step-text">{step}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Technology;
