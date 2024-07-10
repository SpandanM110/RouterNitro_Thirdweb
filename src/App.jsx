import React from 'react';
import CrossChainTransfer from './components/CrossChainTransfer';
import MarketplaceEmbed from './components/MarketplaceEmbed.jsx';

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f0f0' }}>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <div style={{ flex: 1 }}>
          <CrossChainTransfer />
        </div>
        <div style={{ flex: 1 }}>
          <MarketplaceEmbed />
        </div>
      </div>
    </div>
  );
}

export default App;
