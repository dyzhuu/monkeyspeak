import { useState, useEffect } from 'react';

export const useMicrophonePermission = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const permissionStatus = await navigator.permissions.query({
          name: 'microphone' as PermissionName
        });
        setHasPermission(permissionStatus.state === 'granted');

        permissionStatus.onchange = () => {
          setHasPermission(permissionStatus.state === 'granted');
        };
      } catch (error) {
        console.error('Error checking microphone permission:', error);
        setHasPermission(false);
      }
    };

    checkPermission();
  }, []);

  return hasPermission;
};
