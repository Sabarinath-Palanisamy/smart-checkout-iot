/**
 * @file aiEngine.js
 * @description Core Prescriptive AI logic for the Smart Checkout system.
 * This module implements a rule-based expert system that analyzes GS1 2D barcode data 
 * and inventory levels to determine dynamic pricing and safety status.
 * * @param {string} barcodeData - The raw GS1 DataMatrix string (e.g., 01...17YYMMDD).
 *   @param {number} stocksRemaining - Current physical inventory count for the scanned batch.
 *   @param {number} saleRate - The average units sold per day (Sales Velocity).
 * * @returns {Object} analysisResult - Object containing 'status', 'color', 'msg', and optional 'val' (discount).
 */

export const analyzeProduct = (barcodeData, stocksRemaining, saleRate) => {
  // Extract Expiry: (01)GTIN(17)YYMMDD
  const expiryRaw = barcodeData.substring(12, 18);
  const year = 2000 + parseInt(expiryRaw.substring(0, 2));
  const month = parseInt(expiryRaw.substring(2, 4)) - 1;
  const day = parseInt(expiryRaw.substring(4, 6));

  const expiryDate = new Date(year, month, day);
  const today = new Date();
  const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

  // 1. Safety Hard-Stop
  if (expiryDate < today) {
    console.log(expiryDate);
    return { status: "EXPIRED", color: "#ff4d4d", msg: `BLOCK SALE: Product Expired on ${expiryDate.toDateString()}` };
  }

  // 2. Inventory Pressure Logic (The "AI" part)
  const requiredDailySale = stocksRemaining / daysLeft;
  
  if (requiredDailySale > saleRate) {
    const gap = (requiredDailySale - saleRate) / requiredDailySale;
    let discount = Math.min(0.9, gap * 0.5); // Dynamic scaling
    if (daysLeft === 1) discount = Math.max(discount, 0.8); // Floor for last day

    return { 
      status: "DISCOUNT", 
      color: "#ffa500", 
      val: (discount * 100).toFixed(0),
      msg: `Product going to expire on ${expiryDate.toDateString()}. Applying RESCUE DISCOUNT: ${ (discount * 100).toFixed(0) }% applied.` 
    };
  }

  return { status: "VALID", color: "#2ecc71", msg: `Expire date: ${expiryDate.toDateString()}. Added to basket.` };
};