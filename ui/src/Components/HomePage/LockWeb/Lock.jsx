// usePreventShortcuts.js
import { useEffect } from 'react';

const Lock = () => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Prevent Ctrl + U, Ctrl + I, Ctrl + S, Ctrl + Shift + I, F12
      if ((event.ctrlKey && event.key === 'u') || 
          (event.ctrlKey && event.key === 'i') || 
          (event.ctrlKey && event.key === 's') || // <- Added comma and ||
          (event.ctrlKey && event.shiftKey && event.key === 'i') ||
          (event.ctrlKey && event.shiftKey && event.key === 'I') || // Ctrl+Shift+I
          (event.ctrlKey && event.shiftKey && event.key === 'J') || // Ctrl+Shift+J
          (event.ctrlKey && event.key === 'U') || // Ctrl+U
          (event.ctrlKey && event.key === 'F12') || // F12 <- Added ||
          (event.key === 'F12')) {
        event.preventDefault();
        alert('😂😂LOL😂😂');
      }
    };

    const handleContextMenu = (event) => {
      event.preventDefault();
      alert('😂😂LOL😂😂.');
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);
};

export default Lock
