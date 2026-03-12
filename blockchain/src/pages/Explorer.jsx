import React, { useState, useEffect } from 'react';
import { Search, HardDrive, CheckCircle2 } from 'lucide-react';
import './Explorer.css';

const initialBlocks = [
  {
    index: 8,
    mined: '3/10/2026, 12:39:35 AM',
    hash: '4eb9c162072b16ccf932ebad3587d7bf9e9c3242561f53243a2588a3787d029b',
    prevHash: 'b53b17b93dc1a4b6a08dd4f6b2bc21cf64bc8aaf4340cfc81f556306777f3260',
    voterIdentity: 'e75af00ffd425fc6e97222453d6b360ed4ae6828c1cd9dc29b064a54e1430edf',
    zkpVerif: 'zkp_a849439abedc2bd05c6f004c',
    digitalSig: 'ecc_sig_d972dd7ea5b0b958',
    isLatest: true
  },
  {
    index: 7,
    mined: '3/10/2026, 12:36:16 AM',
    hash: 'b53b17b93dc1a4b6a08dd4f6b2bc21cf64bc8aaf4340cfc81f556306777f3260',
    prevHash: 'a12bc9f...f901',
    voterIdentity: '2b99fe2e7772e5a6ddc282e1a7e56ac4981ab592dc94bca2541e0836dc4adb2d',
    zkpVerif: 'zkp_b324...8910',
    digitalSig: 'ecc_sig_a982...b321',
    isLatest: false
  }
];

function Explorer() {
  const [blocks, setBlocks] = useState(initialBlocks);

  useEffect(() => {
    const storedBlocks = JSON.parse(localStorage.getItem('blockchain_blocks') || '[]');
    if (storedBlocks.length > 0) {
      const allBlocks = [...storedBlocks, ...initialBlocks.map(b => ({...b, isLatest: false}))];
      allBlocks[0].isLatest = true;
      setBlocks(allBlocks);
    }
  }, []);

  const totalBlocks = blocks.length > 0 ? blocks[0].index : 8;
  const latestHash = blocks.length > 0 ? blocks[0].hash : initialBlocks[0].hash;

  return (
    <div className="explorer-container">
      <div className="explorer-header">
        <div className="explorer-title-group">
          <HardDrive size={32} className="explorer-icon" />
          <div>
            <h2 className="explorer-title">Blockchain Explorer</h2>
            <p className="explorer-subtitle">Public transparency portal. Verify the integrity of the ledger and view anonymous vote transactions protected by ZKP and ECC signatures.</p>
          </div>
        </div>
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search hash or block index..." className="search-input" />
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-header">Chain Status</div>
          <div className="stat-value text-green">
            <CheckCircle2 size={20} /> Immutable
            <span className="pulsing-dot"></span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-header">Total Blocks</div>
          <div className="stat-value">{totalBlocks}</div>
        </div>
        <div className="stat-card">
          <div className="stat-header">Latest Hash</div>
          <div className="stat-value hash-value" title={latestHash}>
            {latestHash.substring(0, 31)}...
          </div>
        </div>
      </div>

      <div className="block-list-container">
        {blocks.map((block) => (
          <div key={block.index} className="block-item-wrapper">
            <div className="block-index-node">
              <HardDrive size={20} />
              <span>#{block.index}</span>
            </div>
            <div className="block-vertical-line"></div>
            
            <div className="block-card">
              <div className="block-card-header">
                <span className="block-mined">Mined: {block.mined}</span>
                {block.isLatest && <span className="badge-latest">LATEST</span>}
              </div>
              
              <div className="block-details-grid">
                <div className="detail-item full-width">
                  <span className="detail-label">BLOCK HASH</span>
                  <span className="detail-value">{block.hash}</span>
                </div>
                
                <div className="detail-item full-width">
                  <span className="detail-label">PREVIOUS HASH</span>
                  <span className="detail-value text-muted flex-row">
                    <span className="arrow-icon">↳</span> {block.prevHash}
                  </span>
                </div>

                <div className="detail-item">
                  <span className="detail-label">VOTER IDENTITY (ZKP ANONYMOUS)</span>
                  <span className="detail-value">{block.voterIdentity}</span>
                </div>
                
                <div className="detail-row">
                  <div className="detail-item">
                     <span className="detail-label">ZKP VERIFICATION</span>
                     <span className="detail-value text-green badge-outline-green">{block.zkpVerif}</span>
                  </div>
                  <div className="detail-item">
                     <span className="detail-label">DIGITAL SIG (ECC)</span>
                     <span className="detail-value text-purple badge-outline-purple">{block.digitalSig}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="block-vertical-line continuation-line"></div>
      </div>
    </div>
  );
}

export default Explorer;
