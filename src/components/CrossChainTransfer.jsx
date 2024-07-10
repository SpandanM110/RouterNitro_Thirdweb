import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ethers } from 'ethers';

const CrossChainTransfer = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [holskyBalance, setHolskyBalance] = useState(0);
  const [avalancheBalance, setAvalancheBalance] = useState(0);
  const [account, setAccount] = useState('Connect Wallet');
  const [quoteData, setQuoteData] = useState(null); // State to store quote data

  const erc20_abi = [
    // Define your ERC20 ABI here
  ];

  useEffect(() => {
    getAccount();
  }, []);

  useEffect(() => {
    if (account !== 'Connect Wallet') {
      fetchBalances();
    }
  }, [account, from, to]);

  const fetchBalances = async () => {
    try {
      const holskyProvider = new ethers.providers.JsonRpcProvider('https://rpc.holesky.eth');
      const avalancheProvider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');

      const holskyTokenContract = new ethers.Contract(to, erc20_abi, holskyProvider);
      const avalancheTokenContract = new ethers.Contract(from, erc20_abi, avalancheProvider);

      const holskyBal = await holskyTokenContract.balanceOf(account);
      const avalancheBal = await avalancheTokenContract.balanceOf(account);

      setHolskyBalance(ethers.utils.formatUnits(holskyBal, 18));
      setAvalancheBalance(ethers.utils.formatUnits(avalancheBal, 18));
    } catch (error) {
      console.error('Error fetching balances:', error);
    }
  };

  const connectWallet = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
    }
  };

  const getAccount = async () => {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } else {
        alert('Please install MetaMask!');
      }
    } catch (error) {
      console.error('Error getting account:', error);
    }
  };

  const getQuote = async (params) => {
    try {
      const response = await axios.post('https://example-quote-api.com/get-quote', params);
      return response.data;
    } catch (error) {
      console.error('Error getting quote:', error);
      throw new Error('Failed to get quote');
    }
  };

  const getTransaction = async (txParams, quote) => {
    try {
      const response = await axios.post('https://example-transaction-api.com/get-transaction', { txParams, quote });
      return response.data;
    } catch (error) {
      console.error('Error getting transaction:', error);
      throw new Error('Failed to get transaction');
    }
  };

  const checkAndSetAllowance = async (signer, tokenAddress, spender, amount) => {
    try {
      const tokenContract = new ethers.Contract(tokenAddress, erc20_abi, signer);
      const allowance = await tokenContract.allowance(account, spender);
      if (allowance.lt(amount)) {
        const tx = await tokenContract.approve(spender, amount);
        await tx.wait();
      }
    } catch (error) {
      console.error('Error checking and setting allowance:', error);
      throw new Error('Failed to set allowance');
    }
  };

  const handleSubmit = async () => {
    try {
      if (!account || account === 'Connect Wallet') {
        alert('Please connect your wallet first');
        return;
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const quoteParams = {
        fromChainId: 43113, // Avalanche Fuji testnet
        toChainId: 17000, // Holesky testnet
        fromTokenAddress: from,
        toTokenAddress: to,
        amount: ethers.utils.parseUnits(amount.toString(), 18).toString(),
        userAddress: account,
        receiverAddress: account,
      };

      const quote = await getQuote(quoteParams);
      setQuoteData(quote);

      if (quote) {
        console.log('Quote Data: ', quote);

        await checkAndSetAllowance(signer, from, quote.approvalAddress, quote.amount);

        const txParams = {
          fromTokenAddress: from,
          toTokenAddress: to,
          amount: ethers.utils.parseUnits(amount.toString(), 18).toString(),
        };

        const transaction = await getTransaction(txParams, quote);
        console.log('Transaction Data: ', transaction);
      }
    } catch (error) {
      console.error('Error handling submit:', error);
      alert('Failed to initiate transfer. Please try again.');
    }
  };

  const buttonStyles = {
    base: {
      width: '100%',
      padding: '1rem',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      outline: 'none',
      border: 'none',
      fontWeight: 'bold',
    },
    connectWallet: {
      backgroundColor: account === 'Connect Wallet' ? '#3B82F6' : '#34D399',
      color: 'white',
    },
    transfer: {
      backgroundColor: '#3B82F6',
      color: 'white',
    },
    transferHover: {
      backgroundColor: '#2563EB',
    },
  };

  const inputStyles = {
    base: {
      width: '100%',
      padding: '1rem',
      borderRadius: '0.5rem',
      border: '1px solid #E5E7EB',
      marginBottom: '1rem',
      outline: 'none',
    },
  };

  const labelStyles = {
    base: {
      marginBottom: '0.5rem',
      fontWeight: 'bold',
      fontSize: '0.875rem',
      color: '#4B5563',
    },
  };

  return (
    <div style={{
      maxWidth: '32rem',
      margin: '2rem auto',
      marginLeft: '0', // Adjusting the left margin to shift component left
      padding: '1.5rem',
      backgroundColor: '#FFFFFF',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '0.75rem',
    }}>
      <h3 style={{
        textAlign: 'center',
        fontSize: '1.875rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
      }}>AFTT Cross Chain Transfer</h3>
      <div style={{ marginBottom: '1rem' }}>
        <button
          onClick={connectWallet}
          style={{
            ...buttonStyles.base,
            ...buttonStyles.connectWallet,
            ':hover': buttonStyles.transferHover,
          }}
        >
          {account}
        </button>
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <h5 style={{
          fontSize: '1.25rem',
          fontWeight: 'bold',
          marginBottom: '1rem',
        }}>Transfer AFTT from Avalanche to Holsky</h5>
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyles.base}>From Address:</label>
          <input
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Enter from address"
            style={inputStyles.base}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyles.base}>To Address:</label>
          <input
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="Enter to address"
            style={inputStyles.base}
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label style={labelStyles.base}>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            style={inputStyles.base}
          />
        </div>
        <button
          onClick={handleSubmit}
          style={{
            ...buttonStyles.base,
            ...buttonStyles.transfer,
            ':hover': buttonStyles.transferHover,
          }}
        >
          Transfer
        </button>
      </div>
      <div>
        <h4 style={{
          fontSize: '1.125rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
        }}>Balances</h4>
        <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Holsky Balance: {holskyBalance} AFTT</p>
        <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>Avalanche Balance: {avalancheBalance} AFTT</p>
      </div>
    </div>
  );
};

export default CrossChainTransfer;
