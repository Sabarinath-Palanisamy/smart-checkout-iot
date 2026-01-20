## Smart Checkout Expiry Validation (Sunrise 2027)

This repository contains a prototype for an AIoT-enabled Retail Checkout System. It is designed to handle the global transition from 1D barcodes to GS1 2D DataMatrix barcodes, specifically focusing on the "Sunrise 2027" initiative.
The system moves beyond simple scanning by implementing a Prescriptive AI Engine that calculates dynamic discounts based on real-time inventory and shelf-life data.

## 🚀 Key Features
* GS1 2D DataMatrix Parsing: Decodes raw barcode strings to extract GTIN and Expiration Dates (AI 17).
* Prescriptive AI Logic: An autonomous decision-making engine that calculates discounts based on "Inventory Pressure".
* Safety Compliance: Automatic "Hard-Stop" logic to block the sale of expired products.
* Modular React Architecture: Decoupled logic and UI components for high maintainability.

## 🧠 The AI Implementation: Dynamic Markdown
 Unlike traditional retail systems that use static discounts, this prototype uses Rule-Based AI to determine the optimal price reduction.

## Formula:

The AI calculates Inventory Pressure by comparing the Required Daily Sale against the Average Sale Rate:

$$\text{Required Daily Sale} = \frac{\text{Stocks Remaining}}{\text{Days to Expire}}$$

* If Required Sale > Average Sale Rate: The AI detects a waste risk and applies a dynamic discount scaled to the size of the "Sales Gap".
* Final Day Logic: If only 1 day remains, the AI triggers a "Flash Sale" mode (minimum 80% discount) to ensure zero food waste.
