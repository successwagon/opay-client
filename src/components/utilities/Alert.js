import React from 'react';

const Alert = ({ error, dismissError }) => {
  return (
    <>
      {error && (
        <div className="alert-overlay">
          <div className="alert-box">
            <p className="alert-message">{error}</p>
            <button className="alert-button" onClick={dismissError}>OK</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Alert