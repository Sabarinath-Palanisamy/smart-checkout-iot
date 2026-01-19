/**
 * @file App.js
 * @description Central Controller for the Smart Checkout Application.
 * Manages the global state of the application and facilitates the communication 
 * between the Scanner (Input), the AI Engine (Logic), and the Display (Output).
 * * @states
 * - scanResult: Stores the outcome of the most recent product analysis.
 */

import React, { useState } from 'react';
import Scanner from './components/Scanner';
import DisplayAlert from './components/DisplayAlert';
import { analyzeProduct } from '../src/logic/aiEngine';

function App() {
  const [scanResult, setScanResult] = useState(null);

  // Sample Inventory parameters
  const sampleData = { stock: 15, saleRate: 1.5 };

  const handleBarcode = (barcode) => {
    const analysis = analyzeProduct(barcode, sampleData.stock, sampleData.saleRate);
    setScanResult(analysis);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>Smart Checkout Prototype</h1>
      <Scanner onScan={handleBarcode} />
      <DisplayAlert result={scanResult} />
    </div>
  );
}

export default App;