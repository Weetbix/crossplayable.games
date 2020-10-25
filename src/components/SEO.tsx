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
  image?: string;
  meta?: Array<{ name: string; content: string }>;
};

const SEO = ({
  title,
  description,
  image,
  meta = [],
  keywords = [],
}: SEOProps) => {
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
            defaultImage: image
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
    defaultImage,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate}>
      <html lang="en" />
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta property="og:image" content={seo.image} />
      <meta name="twitter:image" content={seo.image} />
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
      {
        // Fav Icon Generated with this lovely tool:
        // https://formito.com/tools/favicon
      }
      <link
        rel="icon"
        type="image/svg+xml"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23f8d200%22></rect><text x=%2250%%22 y=%2250%%22 dominant-baseline=%22central%22 text-anchor=%22middle%22 font-size=%2270%22>🎮</text></svg>"
      />
    </Helmet>
  );
};

export default SEO;
