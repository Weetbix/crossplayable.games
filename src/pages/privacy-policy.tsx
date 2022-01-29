import React from 'react'
import styled from 'styled-components'
import SEO from '../components/SEO'

const Content = styled.div`
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;

  > p,
  > ul {
    line-height: 20px;
    text-align: justify;
  }

  h1 {
    text-align: center;
    margin-bottom: 2em;
  }
  h1,
  h3 {
    margin-top: 2em;
  }
  a {
    color: ${(props) => props.theme.colors.primary.light};
  }
`

export default () => {
  return (
    <Content>
      <SEO />
      <h1>Privacy Policy</h1>
      <h3>Human-parsable summary</h3>
      <p>
        This website uses Plausible Analytics (a privacy first, cookie free
        analytics service) and Google Adsense for ads. Adsense uses cookies to
        serve you more relevant ads, and I serve ads to reduce some hosting
        burden.
      </p>
      <h3>General</h3>
      <p>
        John Hannagan built the Crossplayable Games Website as an Open Source
        software. This SERVICE is provided by John Hannagan at no cost and is
        intended for use as is.
      </p>
      <p>
        This page is used to inform visitors regarding my policies with the
        collection, use, and disclosure of Personal Information if anyone
        decided to use my Service. We would like to inform you about the
        management of your personal data in accordance with Art. 13, 14 General
        Data Protection Regulation (GDPR).
      </p>
      <p>
        If you choose to use my Service, then you agree to the collection and
        use of information in relation to this policy. The Personal Information
        that I collect is used for providing and improving the Service. I will
        not use or share your information with anyone except as described in
        this Privacy Policy.
      </p>
      <h3>Information Collection and Use</h3>
      <p>
        For a better experience, while using the Website, I may require you to
        provide us with certain personally identifiable information. The
        information that I request will be retained on your device and is not
        collected by me in any way.
      </p>
      <p>
        Link to privacy policy of third party service providers used by the
        website
      </p>
      <ul>
        <li>
          <a href="https://plausible.io/data-policy">Plausible Analytics</a>.
        </li>
        <li>
          <a href="https://www.google.com/policies/privacy/">
            Google Adsense TODO??
          </a>
        </li>
      </ul>
      <h3>Cookies</h3>
      <p>
        Cookies are files with a small amount of data that are commonly used as
        anonymous unique identifiers. These are sent to your browser from the
        websites that you visit and are stored on your device's internal memory.
      </p>
      <p>
        The Wesbite may use third party code and libraries that use “cookies” to
        collect information and improve their services. You have the option to
        either accept or refuse these cookies and know when a cookie is being
        sent to your device. If you choose to refuse our cookies, you may not be
        able to use some portions of this Service.
      </p>
      <h3>Analytics</h3>
      <p>
        Plausible Analytics is used to guage interest and demand on the website
        and product.
      </p>
      <p>
        Plausible Analytics is a privacy-first web analytics tool. It is built
        to be compliant with the different privacy regulations, such as GDPR and
        CCPA. Plausible doesn’t use cookies and doesn’t collect any personal
        data whatsoever.
      </p>
      <p>
        For more information see the{' '}
        <a href="https://plausible.io/data-policy">Plausible Data Policy</a>.
      </p>
      <h3>Cookies and 3rd Party Advertisements</h3>
      <p>
        Google, as a third-party vendor, uses cookies to serve ads on your site.
        Google’s use of the DART cookie enables it to serve ads to your users
        based on their visit to your sites and other sites on the Internet.
        Users may opt out of the use of the DART cookie by visiting the Google
        ad and content network privacy policy.
      </p>
      <p>
        We allow third-party companies to serve ads and collect specific
        anonymous information when you visit our website. These companies may
        use non-personally identifiable information (e.g., click stream
        information, browser type, time and date, the subject of advertisements
        clicked or scrolled over) during your visits to this and other websites
        to provide advertisements about goods and services likely to be of more
        significant interest to you.
      </p>
      <h3>Google Adsense</h3>
      <p>
        You may opt out of personalised advertisments by visitng{' '}
        <a href="https://www.google.com/settings/ads">Ads Settings</a>.
      </p>
      <p>
        You may opt out of a third party vendor's use of cookies for
        personalised advertising by visiting{' '}
        <a href="http://www.aboutads.info/choices/">www.aboutads.info</a>.
      </p>
      <p>
        These third-party ad servers or ad networks use technology to show the
        advertisements and links that appear on Crossplayable Games send
        directly to your browsers. They automatically receive your IP address
        when this occurs. Other technologies (such as cookies, JavaScript, or
        Web Beacons) may also be used by the third-party ad networks to measure
        the effectiveness of their advertisements and / or to personalize the
        advertising content that you see.
      </p>
      <p>
        Crossplayable Games has no access to or control over these cookies that
        are used by third-party advertisers.
      </p>
      <p>
        You should consult the respective privacy policies of these third-party
        ad servers for more detailed information on their practices as well as
        for instructions about how to opt-out of specific practices.
        Crossplayable Games privacy policy does not apply to, and we cannot
        control the activities of, such other advertisers or websites.
      </p>
      <p>
        If you wish to disable cookies, you may do so through your browser
        options. More detailed information about cookie management with specific
        web browsers can be found at the browsers' respective websites.
      </p>
      <h3>Service Providers</h3>
      <p>
        I may employ third-party companies and individuals due to the following
        reasons:
      </p>
      <ul>
        <li>To facilitate our Service;</li>
        <li>To provide the Service on our behalf;</li>
        <li>To perform Service-related services; or</li>
        <li>To assist us in analyzing how our Service is used.</li>
      </ul>
      <p>
        I want to inform users of this Service that these third parties have
        access to your Personal Information. The reason is to perform the tasks
        assigned to them on our behalf. However, they are obligated not to
        disclose or use the information for any other purpose.
      </p>
      <h3>Security</h3>
      <p>
        I value your trust in providing us your Personal Information, thus we
        are striving to use commercially acceptable means of protecting it. But
        remember that no method of transmission over the internet, or method of
        electronic storage is 100% secure and reliable, and I cannot guarantee
        its absolute security.
      </p>
      <h3>Links to Other Sites</h3>
      <p>
        This Service may contain links to other sites. If you click on a
        third-party link, you will be directed to that site. Note that these
        external sites are not operated by me. Therefore, I strongly advise you
        to review the Privacy Policy of these websites. I have no control over
        and assume no responsibility for the content, privacy policies, or
        practices of any third-party sites or services.
      </p>
      <h3>Children’s Privacy</h3>
      <p>
        These Services do not address anyone under the age of 13. I do not
        knowingly collect personally identifiable information from children
        under 13. In the case I discover that a child under 13 has provided me
        with personal information, I immediately delete this from our servers.
        If you are a parent or guardian and you are aware that your child has
        provided us with personal information, please contact me so that I will
        be able to do necessary actions.
      </p>
      <h3>Changes to This Privacy Policy</h3>
      <p>
        I may update our Privacy Policy from time to time. Thus, you are advised
        to review this page periodically for any changes. I will notify you of
        any changes by posting the new Privacy Policy on this page.
      </p>
      <p>This policy is effective as of 2022-01-29</p>
      <h3>Contact Us</h3>
      <p>
        If you have any questions or suggestions about my Privacy Policy, do not
        hesitate to contact me at crossplayable.games@gmail.com.
      </p>
    </Content>
  )
}
