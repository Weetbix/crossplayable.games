import React from "react";
import { useLocation } from "@reach/router";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import { FavIcon } from "./FavIcon";

const DEFAULT_KEYWORDS = [
  "crossplay",
  "games",
  "gaming",
  "catalog",
  "xbox",
  "playstation",
  "switch",
  "ps4",
  "ps5",
  "windows",
  "linux",
];

type SEOProps = {
  title?: string;
  description?: string;
  keywords?: Array<string>;
  meta?: Array<{ name: string; content: string }>;
};

const SEO = ({ title, description, meta = [], keywords = [] }: SEOProps) => {
  const { pathname } = useLocation();
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            titleTemplate
            defaultDescription: description
            siteUrl: url
            # defaultImage: image
          }
        }
      }
    `
  );

  const {
    defaultTitle,
    titleTemplate,
    defaultDescription,
    siteUrl,
    // defaultImage,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    // image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate}>
      <html lang="en" />
      <meta name="description" content={seo.description} />
      {/* <meta name="image" content={seo.image} /> */}
      {/* {seo.image && <meta property="og:image" content={seo.image} />} */}
      {/* {seo.image && <meta name="twitter:image" content={seo.image} />} */}
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta
        name="keywords"
        content={[...DEFAULT_KEYWORDS, ...keywords].join(", ")}
      />
      {meta.map(({ name, content }) => (
        <meta name={name} content={content} key={name} />
      ))}
      <FavIcon />
    </Helmet>
  );
};

export default SEO;
