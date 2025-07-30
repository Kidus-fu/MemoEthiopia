// components/GoogleAd.tsx
import React, { useEffect } from 'react';

const GoogleAd = () => {
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdsbyGoogle error", e);
    }
  }, []);

  return (
    <div className=" p-4 border border-dashed border-gray-400 rounded-xl shadow-sm bg-gray-500">
      <p className="text-sm text-center text-white mb-2">Advertisement (Test)</p>

      <ins className="adsbygoogle block"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-3940256099942544" // Google Test ID
        data-ad-slot="1234567890" // Replace with your slot when ready
        data-ad-format="auto"
        data-full-width-responsive="true"></ins>
    </div>
  );
};

export default GoogleAd;
