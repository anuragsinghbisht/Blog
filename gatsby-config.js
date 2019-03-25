module.exports = {
  siteMetadata: {
    title: 'Personal Blog',
    description: 'By Anurag Singh Bisht',
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        strategy: 'img',
        plugins: [
          {
            resolve: 'gatsby-remark-graph',
            options: {
              language: 'mermaid', // default
              theme: 'default', // could also be dark, forest, or neutral
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
  ],
}
