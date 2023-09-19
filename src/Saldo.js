// Saldo.js
import { Alchemy, Network } from 'alchemy-sdk';
import { Web3 } from 'web3';
import { useState } from 'react';

const NETWORK = process.env.REACT_APP_ALCHEMY_NETWORK || "ETH_MAINNET";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network[NETWORK], 
};

const alchemy = new Alchemy(settings);

function Saldo() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState();

  const fetchBalance = async () => {
    const ethBalance = await alchemy.core.getBalance(address);
    setBalance( Web3.utils.hexToNumberString(ethBalance._hex) );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (address) {
      await fetchBalance();
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="text"
          placeholder="Enter Ethereum address"
          className="form-control"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </form>
      <div className="mb-3">Balance: {balance} Wei</div>
    </div>
  );
}

export default Saldo;
