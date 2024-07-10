import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { SupportChat } from "@pushprotocol/uiweb";

function WalletChat(props) {
  const [signer, setSigner] = useState(null);

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const walletSigner = provider.getSigner();
        setSigner(walletSigner);
      } else {
        console.error('MetaMask or compatible wallet not detected.');
        // Handle wallet not detected error
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      // Handle error connecting wallet, maybe display a message to the user
    }
  };

  const disconnectWallet = () => {
    setSigner(null);
  };

  const buttonStyle = {
    padding: '10px 20px',
    backgroundColor: '#dd44b9',
    color: '#FFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  };

  useEffect(() => {
    // Auto-connect if already connected when component mounts
    if (window.ethereum && window.ethereum.selectedAddress) {
      connectWallet();
    }
  }, []);

  return (
    <>
      <h2>
        Live Text Editor with Push Support System Integrated
      </h2>
      <label>
        For this demo, You will need MetaMask (or equivalent browser injected
        wallet), you will also need to sign a transaction to see the
        notifications.
      </label>

      <p />
      <button
        style={buttonStyle}
        onClick={signer ? disconnectWallet : connectWallet}
      >
        {signer ? 'Disconnect wallet' : 'Connect Wallet'}
      </button>

      <div style={{ margin: '20px auto' }}>
        {signer && (
          <>
            <SupportChat
              supportAddress="0x4485a0A3d818B3B3175986374c71F8BCCfbCFa2d" //support address, this belongs to you
              
              signer={signer}
              env="staging" // can be "prod" or "staging"
            />

            <h2>
              Signer obtained, you will see a pink Push Chat icon
              on the bottom right, click to interact.
              Along with that the status of the wallet will be shown. 
              Text Editor works on the basis of Imgur Client ID
            </h2>
          </>
        )}
      </div>
    </>
  );
}

export default WalletChat;