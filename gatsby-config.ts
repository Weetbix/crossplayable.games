export const plugins = [
  "gatsby-plugin-graphql-codegen",
  "gatsby-plugin-sharp",
  "gatsby-transformer-sharp",
  "gatsby-plugin-styled-components",
  {
    resolve: `gatsby-plugin-layout`,
    options: {
      component: require.resolve(`./src/components/Page.tsx`),
    },
  },
  {
    resolve: `gatsby-plugin-plausible`,
    options: {
      domain: `crossplayable.games`,
      // Currently when using a custom domain with self-hosted plausible, the script
      // path will incorrectly point to index.js. Here we force the correct path...
      // https://github.com/pixelplicity/gatsby-plugin-plausible/issues/49
      customDomain: `plausible.cloud.johnhannagan.com/js/plausible.js?original=`,
    },
  },
];
