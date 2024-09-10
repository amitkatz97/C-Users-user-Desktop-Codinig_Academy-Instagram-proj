import React, { useState, useEffect } from 'react';

const LoginImg = ({ images, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, [images.length, interval]);

  return (
    <div>
      <img src={images[currentIndex]} alt="Rotating" style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default LoginImg;
