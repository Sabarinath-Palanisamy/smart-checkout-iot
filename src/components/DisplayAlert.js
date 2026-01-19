/**
 * @file DisplayAlert.js
 * @description UI Feedback Component for the Smart Checkout terminal.
 * Responsible for rendering the "Prescriptive" output of the AI logic. 
 * Provides visual cues (Red/Orange/Green) based on product safety and discount status.
 * * @component
 *   @param {Object} result - The analysis object returned from the aiEngine.
 * Contains the status message, theme color, and calculated dynamic discount.
 */

const DisplayAlert = ({ result }) => {
  if (!result) return;

  return (
    <div style={{ 
      padding: '20px', 
      borderRadius: '8px', 
      backgroundColor: result.color, 
      color: 'white',
      marginTop: '20px'
    }}>
      <h2 style={{ margin: 0 }}>{result.status}</h2>
      <p style={{ fontSize: '18px' }}>{result.msg}</p>
      {result.val && <p><strong>Clearance Strategy: </strong> Closing stock gap via dynamic markdown.</p>}
    </div>
  );
};

export default DisplayAlert;