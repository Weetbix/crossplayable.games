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
    Desktop: 'https://www.know-yourself.me/',
    iOS: 'https://apps.apple.com/us/app/me-know-yourself/id1620948275?itsct=apps_box_badge&itscg=30200',
    Android: 'https://play.google.com/store/apps/details?id=me.knowyourself.app.me'
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

    return (
        <Wrapper>
            <a href={LINKS[plaform]} onClick={handleLinkClick}>
                <picture>
                    <source 
                        srcSet={`${mobile2x} 2x, ${mobile1x}`}
                        media="(max-width: 700px)"
                    />
                    <img
                        srcSet={`${horizontal2x} 2x`}
                        src={horizontal1x}
                        alt="Me App banner"
                        loading="lazy"
                        onLoad={() => window.plausible?.('Me App: Viewed', { props: { plaform }})}
                    />
                </picture>
            </a>
        </Wrapper>
    );
};
