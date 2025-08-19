import React, { useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import io from 'socket.io-client';

const NotificationSystem: React.FC = () => {
  useEffect(() => {
    const socket = io('http://localhost:3001');

    socket.on('notification', (data) => {
      const { type, data: notificationData } = data;
      
      // Play notification sound
      const audio = new Audio('/notification.mp3');
      audio.play().catch(() => {
        // Fallback: use system beep
        console.beep?.();
      });

      switch (type) {
        case 'new_order':
          toast.success(`Yangi buyurtma! ${notificationData.customerName} - ${notificationData.total.toLocaleString()} so'm`, {
            duration: 5000,
            icon: '🛒',
          });
          break;
        case 'new_contact':
          toast.info(`Yangi murojaat: ${notificationData.name} - ${notificationData.subject}`, {
            duration: 5000,
            icon: '📧',
          });
          break;
        default:
          toast(`Yangi bildirishnoma: ${JSON.stringify(notificationData)}`);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#363636',
          color: '#fff',
        },
        success: {
          style: {
            background: '#4CAF50',
          },
        },
        error: {
          style: {
            background: '#f44336',
          },
        },
      }}
    />
  );
};

export default NotificationSystem;