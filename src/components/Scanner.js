/**
 * @file Scanner.js
 * @description IoT Input Component for the Smart Checkout prototype.
 * Acts as the data acquisition layer that captures barcode strings from physical 
 * scanners (keyboard emulation) or manual text entry.
 * * @component
 *   @param {Function} onScan - Callback function triggered after a successful data capture.
 * Passes the raw barcode string back to the parent App controller.
 */

import { useState } from 'react';

const Scanner = ({ onScan }) => {
  const [val, setVal] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (val.length >= 18) {
      onScan(val);
      setVal(""); // Clear for next scan
    } else {
      alert("Invalid GS1 2D Barcode length.");
    }
  };

  return (
    <div style={{ marginBottom: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Enter barcode value"
          style={{ width: '300px', padding: '12px', fontSize: '16px' }}
          autoFocus
        />
        <button type="submit" style={{ padding: '12px', marginLeft: '10px' }}>Scan</button>
      </form>
    </div>
  );
};

export default Scanner;