import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';

import './App.css';

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockDetails, setBlockDetails] = useState({});
  const [inputValue, setInputValue] = useState('');

  const fetchBlockData = async (number) => {
    let blockNum = number || await alchemy.core.getBlockNumber();
    setBlockNumber(blockNum);

    // Get block details
    const blockData = await alchemy.core.getBlock(blockNum);
    setBlockDetails(blockData);
  };

  useEffect(() => {
    fetchBlockData();
  }, []);  // The empty dependency array ensures this effect runs once when the component mounts.

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue) {
      await fetchBlockData(inputValue);
    }
  };

  return (
    <div className="App container mt-5" style={{ maxWidth: '70%', marginLeft: '15%', marginRight: '15%' }}>
      <form onSubmit={handleSubmit} className="mb-3">
        <input
          type="text"
          placeholder="Enter block number"
          className="form-control"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
      <div className="mb-3">Block Number: {blockNumber}</div>
      <table className="table">
        <thead>
          <tr>
            <th style={{ verticalAlign: 'top' }}>Field</th>
            <th style={{ verticalAlign: 'top' }}>Value</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(blockDetails).map(([key, value]) => {
            if (key === 'transactions' && Array.isArray(value)) {
              value = value.join('<br/>\n');
            } else if (typeof value === 'object') {
              value = JSON.stringify(value);
            }

            return (
              <tr key={key}>
                <td>{key}</td>
                <td dangerouslySetInnerHTML={{ __html: value }}></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
