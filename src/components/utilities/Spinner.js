import React from 'react';

function Spinner({ loading }) {
  return (
    <>
      {loading && (
        <div className="loader-overlay">
          <div className="loader-spinner"></div>
        </div>
      )}
    </>
  );
}

export default Spinner;