import { useEffect, useState } from 'react';
import {  NotificationIconFull } from './SVG.jsx';



const SnackBar = ({ message, show, onClose }) => {
  useEffect(() => {
    console.log("snack bar is render")
    if (show) {
      const timer = setTimeout(() => {
        onClose(); // Automatically hide the snack bar after 3 seconds
      }, 3000);

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [show, onClose, message]);

  return (
    <div className={`snackbar ${show ? 'show' : ''}`}>
      {message} <NotificationIconFull/>
    </div>
  );
};

export default SnackBar;
