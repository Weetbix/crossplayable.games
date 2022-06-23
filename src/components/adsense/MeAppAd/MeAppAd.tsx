import React, { useEffect, useState } from "react";
import styled from 'styled-components'

import horizontal1x from './img/me-banner-desktop.png'
import horizontal2x from './img/me-banner-desktop@2x.png'
import mobile1x from './img/me-banner-mobile.png'
import mobile2x from './img/me-banner-mobile@2x.png'

const Wrapper = styled.div`
    display: flex;

    picture {
        margin-left: auto;
        margin-right: auto;
    }
`;

const LINKS = {
    DESKTOP: 'https://www.know-yourself.me/',
    IOS: 'https://apps.apple.com/us/app/me-know-yourself/id1620948275?itsct=apps_box_badge&itscg=30200',
    ANDROID: 'https://play.google.com/store/apps/details?id=me.knowyourself.app.me'
}

const getPlatformFromUserAgent = () => {
    if(/iPad|iPhone|iPod/.test(navigator.platform)
        || (navigator.userAgent.includes("Mac") && "ontouchend" in document))
    {
        return "IOS";
    }

    if(/android/i.test(navigator.userAgent)) {
        return "ANDROID";
    }

    return "DESKTOP";
}

export const MeAppAd = () => {

  const [link, setLink] = useState(LINKS.DESKTOP);
  useEffect(() => {
      setLink(LINKS[getPlatformFromUserAgent()]) 
  }, [link]);

  return (
    <Wrapper>
        <a href={link}>
            <picture>
                <source 
                    srcSet={`${mobile2x} 2x, ${mobile1x}`}
                    media="(max-width: 600px)"
                />
                <img
                    srcSet={`${horizontal2x} 2x`}
                    src={horizontal1x}
                    alt="Me App banner"
                />
            </picture>
        </a>
    </Wrapper>
  );
};
