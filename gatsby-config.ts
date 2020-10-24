export const plugins = [
  "gatsby-plugin-graphql-codegen",
  "gatsby-plugin-sharp",
  "gatsby-transformer-sharp",
  "gatsby-plugin-styled-components",
  "gatsby-plugin-react-helmet",
  {
    resolve: `gatsby-plugin-layout`,
    options: {
      component: require.resolve(`./src/components/Page.tsx`),
    },
  },
];
