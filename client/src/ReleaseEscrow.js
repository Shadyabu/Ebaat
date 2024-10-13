import React, { useState } from 'react';

const ReleaseEscrow = () => {
    const [status, setStatus] = useState('');
  
    const handleRelease = async () => {
      try {
        await fetch('/api/release-escrow', {
          method: 'POST',
        });
        setStatus('Funds released!');
      } catch (e) {
        setStatus('Failed to release funds');
      }
    };
  
    return (
      <div>
        <button onClick={handleRelease}>Release Funds</button>
        <p>{status}</p>
      </div>
    );
  };
  
  export default ReleaseEscrow;
