// TransactionDetail.js
import React, { useState, useEffect } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import { Web3 } from 'web3';

const NETWORK = process.env.REACT_APP_ALCHEMY_NETWORK || "ETH_MAINNET";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network[NETWORK], 
};

const alchemy = new Alchemy(settings);

function parseTransaction(tx) {
  return {
    Hash: tx.hash,
    Block_Hash: tx.blockHash,
    Block_Number: tx.blockNumber,
    Transaction_Index: tx.transactionIndex,
    Confimations: tx.confirmations,
    From: tx.from,
    To: tx.to,
    Nonce: tx.nonce,
    gasPrice: tx.gasPrice ? Web3.utils.hexToNumberString(tx.gasPrice._hex) : '0',
    gasLimit: tx.gasLimit ? Web3.utils.hexToNumberString(tx.gasLimit._hex) : '0',
    value: tx.value ? Web3.utils.hexToNumberString(tx.value._hex) : '0'
  };
}

function TransactionDetail({ initialTransactionHash = "" }) {
  const [transactionHash, setTransactionHash] = useState(initialTransactionHash);
  const [transactionDetails, setTransactionDetails] = useState(null);

  useEffect(() => {
    async function fetchTransactionDetails() {
      if (transactionHash) {
        const details = await alchemy.core.getTransaction(transactionHash);
        setTransactionDetails( parseTransaction( details ) );
      }
    }
    fetchTransactionDetails();
   }, [transactionHash]);

   const handleInputChange = (e) => {
    setTransactionHash(e.target.value);
   };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="transactionHashInput" className="form-label">Transaction Hash:</label>
        <input
          type="text"
          id="transactionHashInput"
          className="form-control"
          value={transactionHash}
          onChange={handleInputChange}
          placeholder="Enter transaction hash"
        />
      </div>

      {transactionDetails && (
        <table className="table table-striped">
          <tbody>
            {Object.entries(transactionDetails).map(([key, value]) => (
              <tr key={key}>
                <td className="text-end fw-bold">{key}</td>
                <td>{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionDetail;
