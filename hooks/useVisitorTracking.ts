import { useEffect } from 'react';

export const useVisitorTracking = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        // Get browser and device information
        const getBrowser = () => {
          const ua = navigator.userAgent;
          if (ua.includes('Firefox')) return 'Firefox';
          if (ua.includes('Chrome')) return 'Chrome';
          if (ua.includes('Safari')) return 'Safari';
          if (ua.includes('Edge')) return 'Edge';
          return 'Unknown';
        };

        const getOS = () => {
          const ua = navigator.userAgent;
          if (ua.includes('Windows')) return 'Windows';
          if (ua.includes('Mac')) return 'MacOS';
          if (ua.includes('Linux')) return 'Linux';
          if (ua.includes('Android')) return 'Android';
          if (ua.includes('iOS')) return 'iOS';
          return 'Unknown';
        };

        const getDeviceType = () => {
          const ua = navigator.userAgent;
          if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
            return 'Tablet';
          }
          if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
            return 'Mobile';
          }
          return 'Desktop';
        };

        // Get location data from IP geolocation API
        let locationData = {};
        try {
          const geoResponse = await fetch('https://ipapi.co/json/');
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            locationData = {
              country: geoData.country_name,
              city: geoData.city,
              region: geoData.region,
              latitude: geoData.latitude,
              longitude: geoData.longitude,
              timezone: geoData.timezone
            };
          }
        } catch (error) {
          console.error('Error fetching geolocation:', error);
        }

        // Prepare tracking data
        const trackingData = {
          pageUrl: window.location.href,
          browser: getBrowser(),
          os: getOS(),
          deviceType: getDeviceType(),
          screenResolution: `${window.screen.width}x${window.screen.height}`,
          language: navigator.language,
          ...locationData
        };

        // Debug environment variables
        console.log('Visitor tracking environment variables:', {
          endpoint: process.env.NEXT_PUBLIC_BREW_MY_AGENT_ENDPOINT,
          apiKey: process.env.NEXT_PUBLIC_BREW_MY_AGENT_API_KEY
        });

        // Send to BrewMyAgent
        const brewMyAgentResponse = await fetch(process.env.NEXT_PUBLIC_BREW_MY_AGENT_ENDPOINT!, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            api_key: process.env.NEXT_PUBLIC_BREW_MY_AGENT_API_KEY!,
            form_name: 'visitor_tracking',
            data: trackingData
          }),
        });

        console.log('Visitor tracking BrewMyAgent response status:', brewMyAgentResponse.status);
        
        if (!brewMyAgentResponse.ok) {
          const errorData = await brewMyAgentResponse.text();
          console.error('Visitor tracking BrewMyAgent error response:', errorData);
        } else {
          const responseData = await brewMyAgentResponse.json();
          console.log('Visitor tracking BrewMyAgent success response:', responseData);
        }

        // Also send to existing API for backward compatibility
        try {
          await fetch('/api/track-visitor', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(trackingData),
          });
        } catch (error) {
          console.error('Error sending to existing API:', error);
          // Continue even if existing API fails
        }
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };

    // Track visitor on mount
    trackVisitor();
  }, []);
};
