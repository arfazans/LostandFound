import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';



const useNotification = (notificationSound) => {
  const [isMounted, setIsMounted] = useState(false);

  const [unreadCount, setUnreadCount] = useState(0);
    const [generalUnread, setGeneralUnread] = useState(0);
  const [resolutionUnread, setResolutionUnread] = useState(0);
  const [newNotificationReceived, setNewNotificationReceived] = useState(false);
  const [lastNotificationCheck, setLastNotificationCheck] = useState(new Date());
  const notificationSoundRef = useRef(null);


const playSound = useCallback(() => {
  if (isMounted && notificationSoundRef.current) {
    notificationSoundRef.current.currentTime = 0;
    notificationSoundRef.current.play().catch(e => {
      console.log("Play error:", e);
      // Fallback for autoplay restrictions
      document.addEventListener('click', () => {
        notificationSoundRef.current.play().catch(e => console.log("Play error after interaction:", e));
      }, { once: true });
    });
  }
}, [isMounted]);






  // Separate handlers for each type


 const handleGeneralNotificationClick = async () => {
  try {
    const user = localStorage.getItem('email');
    await axios.patch("http://localhost:9780/resolving/generalMessageMarkRead", { userEmail: user });
    setGeneralUnread(0);
    setUnreadCount(prev => prev - generalUnread); // Subtract only general count
  } catch (error) {
    console.error(error);
  }
};

const handleResolutionNotificationClick = async () => {
  try {
    const user = localStorage.getItem('email');
    await axios.patch("http://localhost:9780/resolving/resolutionMessageMarkRead", { userEmail: user });
    setResolutionUnread(0);
    setUnreadCount(prev => prev - resolutionUnread); // Subtract only resolution count
  } catch (error) {
    console.error(error);
  }
};






  const notificationData = async () => {
    try {
      // Fetch both types of notifications
 const [{data: resolutionData}, {data: generalData}] = await Promise.all([
      axios.get("http://localhost:9780/resolving/getAllResolvingItems"),
      axios.get("http://localhost:9780/resolving/getAlldiscardedResolution"),
    ]);

    const user = localStorage.getItem('email');

    // Filter general notifications (note the field difference)
    const generalUnreadItems = generalData.filter(item =>
      item.resolvingEmail === user && item.read === false
    );

    // Filter resolution notifications
    const resolutionUnreadItems = resolutionData.filter(item =>
      item.resolverEmail === user && item.read === false
    );

          // Check for new notifications (either type)
      const allNewItems = [...generalUnreadItems, ...resolutionUnreadItems].filter(item =>
        new Date(item.createAt) > lastNotificationCheck
      );

      if (allNewItems.length > 0) {
        setNewNotificationReceived(true);
        playSound();
        setLastNotificationCheck(new Date());
      }

       // Update separate counts
      setGeneralUnread(generalUnreadItems.length);
      setResolutionUnread(resolutionUnreadItems.length);
      // Update total count
      setUnreadCount(generalUnreadItems.length + resolutionUnreadItems.length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };






  useEffect(() => {
    notificationData();
    const intervalId = setInterval(notificationData, 10000);
    return () => clearInterval(intervalId);
  }, [lastNotificationCheck]);

  useEffect(() => {
    if (newNotificationReceived) {
      const timer = setTimeout(() => {
        setNewNotificationReceived(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [newNotificationReceived]);


useEffect(() => {
  setIsMounted(true);
  return () => setIsMounted(false);
}, []);

  useEffect(() => {
    notificationSoundRef.current = new Audio(notificationSound);
  }, [notificationSound]);

  return {
      unreadCount,
    generalUnread,
    resolutionUnread,
    newNotificationReceived,
    handleGeneralNotificationClick,
    handleResolutionNotificationClick,
    notificationSoundRef
  };
};

export default useNotification;