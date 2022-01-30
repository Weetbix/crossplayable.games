import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

export const AdRectangle = () => {
  useEffect(() => {
    try {
      const adsbygoogle = (window as any).adsbygoogle || [];
      adsbygoogle.push({});
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <>
      <Helmet>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2404387537976552"
          crossOrigin="anonymous"
        ></script>
      </Helmet>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-2404387537976552"
        data-ad-slot="2283249533"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </>
  );
};
