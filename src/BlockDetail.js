// BlockDetail.js
import { Alchemy, Network } from 'alchemy-sdk';
import { useState, useEffect } from 'react';

const NETWORK = process.env.REACT_APP_ALCHEMY_NETWORK || "ETH_MAINNET";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network[NETWORK], 
};

const alchemy = new Alchemy(settings);

function BlockDetail() {
  const [blockNumber, setBlockNumber] = useState();
  const [blockDetails, setBlockDetails] = useState({});
  const [inputValue, setInputValue] = useState('');

  const fetchBlockData = async (number) => {
    let blockNum;
    if (typeof number === 'undefined' || number === '') {
        blockNum = await alchemy.core.getBlockNumber();
    } else if (typeof number === 'string' && number.startsWith('0x')) {
        blockNum = number;
    } else {
        blockNum = parseInt(number, 10);
    }

    setBlockNumber(blockNum);
    const blockData = await alchemy.core.getBlock(blockNum);
    setBlockDetails(blockData);
};


  useEffect(() => {
    // Esto hará que el componente obtenga los datos del último bloque tan pronto como se monte.
    fetchBlockData();
  }, []); // Los corchetes vacíos aseguran que este efecto se ejecute solo una vez, cuando el componente se monta.


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputValue) {
      await fetchBlockData(inputValue);
      setInputValue('');
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

export default BlockDetail;
