import React, { useEffect, useState } from 'react';
import { yText } from '../y-webrtc-test';

const YWebrtcTest: React.FC = () => {
  const [value, setValue] = useState<string>(yText.toString());

  useEffect(() => {
    const observer = () => {
      setValue(yText.toString());
    };

    yText.observe(observer);

    return () => {
      yText.unobserve(observer);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;

    yText.doc?.transact(() => {
      yText.delete(0, yText.length);
      yText.insert(0, newText);
    });
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Y.js + WebRTC Test</h1>
      <p>
        Synchronized via WebRTC
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
