import React, { useEffect, useState } from 'react';
import { yText } from '../y.js/y-webrtc-test';

const YWebrtcTest: React.FC = () => {
  const [value, setValue] = useState<string>(yText.toString());

  useEffect(() => {
    // Listener for changes
    const observer = () => {
      setValue(yText.toString());
    };

    yText.observe(observer);

    // Cleanup
    return () => {
      yText.unobserve(observer);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;

    // Always perform changes inside a transaction
    yText.doc?.transact(() => {
      yText.delete(0, yText.length);
      yText.insert(0, newText);
    });
  };

  // Small frontend for displaying text field
  return (
    <div style={{ padding: '1rem' }}>
      <h1>Y.js + WebRTC Test</h1>
      <p>
        The following field is synchonised via WebRTC.
      </p>
      <textarea
        style={{ width: '100%', height: '200px' }}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default YWebrtcTest;
