import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin: 16px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AdSquare = () => {
  return (
    <Wrapper>
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2404387537976552"
        crossOrigin="anonymous"
      ></script>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2404387537976552"
        data-ad-slot="7739482544"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
      <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    </Wrapper>
  )
}
