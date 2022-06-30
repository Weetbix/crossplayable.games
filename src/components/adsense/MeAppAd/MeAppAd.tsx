import React, { useEffect, useState, useRef } from "react";
import styled from 'styled-components'

import horizontal1x from './img/me-banner-desktop.png'
import horizontal2x from './img/me-banner-desktop@2x.png'
import mobile1x from './img/me-banner-mobile.png'
import mobile2x from './img/me-banner-mobile@2x.png'

const LINKS = {
    Desktop: 'https://www.know-yourself.me/',
    iOS: 'https://apps.apple.com/app/apple-store/id1620948275?pt=117812216&ct=cpg&mt=8',
    Android: 'https://play.google.com/store/apps/details?id=me.knowyourself.app.me&referrer=utm_source%3Dcpg%26utm_medium%3Dbanner%26utm_content%3Dbanner-1'
}

const getPlatformFromUserAgent = () => {
    if(/iPad|iPhone|iPod/.test(navigator.platform)
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document))
    {
        return "iOS";
    }

    if(/android/i.test(navigator.userAgent)) {
        return "Android";
    }

    return "Desktop";
}

export const MeAppAd = () => {
    const [plaform, setPlatform] = useState('Desktop');
    useEffect(() => {
        setPlatform(getPlatformFromUserAgent());
    });

    const adRef = useRef();

    const handleLinkClick = (e) => {
        e.preventDefault();

        window.plausible?.(
            'Me App: Clicked',
            {
                props: { plaform },
                callback: () => window.location = LINKS[plaform]
            }
        );
    }

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    window.plausible?.('Me App: Viewed', { props: { plaform }})
                    observer.disconnect();
                }
            },
        );
        if (adRef.current) {
          observer.observe(adRef.current);
        }
        return () => observer.disconnect();
    }, [adRef, plaform]);

    return (
        <a href={LINKS[plaform]} onClick={handleLinkClick}>
            <picture ref={adRef}>
                <source 
                    srcSet={`${mobile2x} 2x, ${mobile1x}`}
                    media="(max-width: 700px)"
                />
                <img
                    srcSet={`${horizontal2x} 2x`}
                    src={horizontal1x}
                    alt="Me App banner"
                    loading="lazy"
                />
            </picture>
        </a>
    );
};
